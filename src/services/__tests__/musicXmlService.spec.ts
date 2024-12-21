import { describe, expect, it } from 'vitest';
import { MusicXmlService } from '../musicXmlService';

describe('MusicXmlService', () => {
  let musicXmlService: MusicXmlService;

  beforeEach(() => {
    musicXmlService = new MusicXmlService();
  });

  const validXml = `<?xml version="1.0" encoding="UTF-8"?>
    <score-partwise version="4.0">
      <part id="P1">
        <measure number="1">
          <note>
            <pitch>
              <step>C</step>
              <octave>4</octave>
            </pitch>
            <duration>4</duration>
            <type>quarter</type>
          </note>
        </measure>
      </part>
    </score-partwise>`;

  const invalidXml = '<invalid>xml</invalid>';

  describe('validateXml', () => {
    it('should validate correct MusicXML', () => {
      const result = musicXmlService.validateXml(validXml);
      expect(result.isValid).toBe(true);
    });

    it('should invalidate incorrect XML', () => {
      const result = musicXmlService.validateXml(invalidXml);
      expect(result.isValid).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should add XML declaration if missing', () => {
      const xmlWithoutDeclaration = validXml.replace(
        '<?xml version="1.0" encoding="UTF-8"?>',
        '',
      );
      const result = musicXmlService.validateXml(xmlWithoutDeclaration);
      expect(result.isValid).toBe(true);
    });
  });

  describe('parseNotes', () => {
    it('should parse notes from valid MusicXML', () => {
      const notes = musicXmlService.parseNotes(validXml);
      expect(notes.length).toBe(1);
      expect(notes[0].pitch).toBe('C');
      expect(notes[0].octave).toBe(4);
    });

    it('should return empty array for invalid XML', () => {
      const notes = musicXmlService.parseNotes(invalidXml);
      expect(notes.length).toBe(0);
    });
  });

  describe('formatXml', () => {
    it('should add XML declaration if missing', () => {
      const xmlWithoutDeclaration = validXml.replace(
        '<?xml version="1.0" encoding="UTF-8"?>',
        '',
      );
      const formattedXml = musicXmlService.formatXml(xmlWithoutDeclaration);
      expect(
        formattedXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>'),
      ).toBe(true);
    });

    it('should not modify XML with existing declaration', () => {
      const formattedXml = musicXmlService.formatXml(validXml);
      expect(formattedXml).toBe(validXml);
    });
  });
});
