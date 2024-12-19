import { parseXml } from '../utils/xmlParser';
import { ParsedNote, ValidationResult } from '../types/musicxml';
import { MusicXmlValidator } from './validators/musicXmlValidator';
import { PartParser } from './parsers/partParser';

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
    } catch (error) {
      return { isValid: false, error: 'Invalid XML format' };
    }
  }

  parseNotes(xmlContent: string): ParsedNote[] {
    try {
      // Ensure XML declaration is present
      if (!xmlContent.trim().startsWith('<?xml')) {
        xmlContent = '<?xml version="1.0" encoding="UTF-8"?>\n' + xmlContent;
      }

      const doc = parseXml(xmlContent);
      const part = PartParser.parseFirstPart(doc);
      
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
