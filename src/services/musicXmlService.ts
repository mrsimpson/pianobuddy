import { parseXml } from '../utils/xmlParser';
import { type ParsedNote, type ValidationResult } from '../types/musicxml';
import { MusicXmlValidator } from './validators/musicXmlValidator';
import { PartParser } from './parsers/partParser';
import JSZip from 'jszip';

export class MusicXmlService {
  validateXml(xmlContent: string): ValidationResult {
    try {
      // Ensure XML declaration is present
      if (!xmlContent.trim().startsWith('<?xml')) {
        xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlContent;
      }

      const doc = parseXml(xmlContent);

      // Validate basic structure
      const structureValidation = MusicXmlValidator.validateStructure(doc);
      if (!structureValidation.isValid) {
        return structureValidation;
      }

      return { isValid: true };
    } catch {
      return { isValid: false, error: 'Invalid XML format' };
    }
  }

  async unzipMxlFile(file: File): Promise<string> {
    try {
      const zip = await JSZip.loadAsync(file);

      // Check for mimetype file (optional but recommended)
      const mimetypeFile = zip.file('mimetype');
      if (mimetypeFile) {
        const mimetype = await mimetypeFile.async('string');
        if (mimetype.trim() !== 'application/vnd.recordare.musicxml') {
          console.warn('Unexpected mimetype in MXL file');
        }
      }

      // Look for META-INF/container.xml
      const containerFile = zip.file('META-INF/container.xml');
      if (!containerFile) {
        throw new Error('No container.xml found in MXL archive');
      }

      // Parse container.xml to find the root MusicXML file
      const containerXml = await containerFile.async('string');
      const containerDoc = parseXml(containerXml);

      // Find the first rootfile with MusicXML media type
      const rootfileEl =
        containerDoc.querySelector(
          'rootfile[media-type="application/vnd.recordare.musicxml+xml"]',
        ) ||
        containerDoc.querySelector('rootfile:not([media-type])') ||
        containerDoc.querySelector('rootfile');

      if (!rootfileEl) {
        throw new Error('No valid rootfile found in container.xml');
      }

      const rootfilePath = rootfileEl.getAttribute('full-path');
      if (!rootfilePath) {
        throw new Error('No full-path attribute in rootfile');
      }

      // Find and extract the XML file
      const xmlFile = zip.file(rootfilePath);
      if (!xmlFile) {
        throw new Error(`Specified MusicXML file not found: ${rootfilePath}`);
      }

      const xmlContent = await xmlFile.async('string');
      return xmlContent;
    } catch (error) {
      console.error('Error unzipping MXL file:', error);
      throw new Error('Failed to process MXL file');
    }
  }

  parseNotes(xmlContent: string): ParsedNote[] {
    try {
      // Ensure XML declaration is present
      if (!xmlContent.trim().startsWith('<?xml')) {
        xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlContent;
      }

      const doc = parseXml(xmlContent);
      const part = PartParser.parseAllParts(doc)[0];

      if (!part) {
        throw new Error('No valid part found in the MusicXML');
      }

      return part.notes;
    } catch (error) {
      console.error('Error parsing MusicXML:', error);
      return [];
    }
  }

  formatXml(xmlContent: string): string {
    if (!xmlContent.trim().startsWith('<?xml')) {
      xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlContent;
    }
    return xmlContent;
  }
}
