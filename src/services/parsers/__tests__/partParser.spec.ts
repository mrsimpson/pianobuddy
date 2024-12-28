import { beforeEach, describe, expect, it } from 'vitest'
import { PartParser } from '../partParser'
import { parseXml } from '../../../utils/xmlParser'

describe('PartParser', () => {
  let mockXmlDoc: Document

  beforeEach(() => {
    const mockXml = `<?xml version="1.0" encoding="UTF-8"?>
      <score-partwise>
        <part id="P1">
          <measure>
            <attributes>
              <divisions>4</divisions>
            </attributes>
            <note>
              <pitch>
                <step>C</step>
                <octave>4</octave>
              </pitch>
              <staff>1</staff>
            </note>
            <note>
              <pitch>
                <step>D</step>
                <octave>4</octave>
              </pitch>
              <staff>2</staff>
            </note>
          </measure>
        </part>
        <score-part id="P1">
          <part-name>Piano</part-name>
        </score-part>
      </score-partwise>`

    mockXmlDoc = parseXml(mockXml)
  })

  describe('parseAllParts', () => {
    it.skip('should parse parts with multiple staffs', () => {
      const parts = PartParser.parseAllParts(mockXmlDoc)

      expect(parts.length).toBe(2)

      // Check first part (staff 1)
      expect(parts[0].id).toBe('P1_staff1')
      expect(parts[0].name).toBe('Piano')
      expect(parts[0].notes[0].pitch).toBe('C')

      // Check second part (staff 2)
      expect(parts[1].id).toBe('P1_staff2')
      expect(parts[1].name).toBe('Piano')
      expect(parts[1].notes[0].pitch).toBe('D')
    })

    it('should handle document without parts', () => {
      const emptyDoc = parseXml(
        '<?xml version="1.0" encoding="UTF-8"?><score-partwise></score-partwise>',
      )

      const parts = PartParser.parseAllParts(emptyDoc)

      expect(parts.length).toBe(0)
    })

    it('should use default names when part details are missing', () => {
      const simpleXml = `<?xml version="1.0" encoding="UTF-8"?>
        <score-partwise>
          <part id="P1">
            <measure>
              <note>
                <pitch>
                  <step>C</step>
                  <octave>4</octave>
                </pitch>
              </note>
            </measure>
        </part>
      </score-partwise>`

      const doc = parseXml(simpleXml)
      const parts = PartParser.parseAllParts(doc)

      expect(parts[0].name).toBe('Part 1')
      expect(parts[0].id).toBe('P1_staff1')
    })
  })
})
