import { describe, expect, it } from 'vitest'
import { MusicXmlValidator } from '../musicXmlValidator'
import { parseXml } from '../../../utils/xmlParser'

describe('MusicXmlValidator', () => {
  describe('validateStructure', () => {
    it('should validate correct MusicXML structure', () => {
      const validXml = `<?xml version="1.0" encoding="UTF-8"?>
        <score-partwise version="4.0">
          <part id="P1"></part>
        </score-partwise>`

      const doc = parseXml(validXml)
      const result = MusicXmlValidator.validateStructure(doc)

      expect(result.isValid).toBe(true)
    })

    it('should invalidate XML without score-partwise', () => {
      const invalidXml = `<?xml version="1.0" encoding="UTF-8"?>
        <invalid-root></invalid-root>`

      const doc = parseXml(invalidXml)
      const result = MusicXmlValidator.validateStructure(doc)

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('Not a valid MusicXML file')
    })
  })

  describe('validateVoices', () => {
    it('should validate part with at least one voice', () => {
      const xmlWithVoices = `<?xml version="1.0" encoding="UTF-8"?>
        <part>
          <note>
            <voice>1</voice>
          </note>
        </part>`

      const doc = parseXml(xmlWithVoices)
      const partElement = doc.querySelector('part')!
      const result = MusicXmlValidator.validateVoices(partElement)

      expect(result.isValid).toBe(true)
    })

    it('should invalidate part without voices', () => {
      const xmlWithoutVoices = `<?xml version="1.0" encoding="UTF-8"?>
        <part>
          <note></note>
        </part>`

      const doc = parseXml(xmlWithoutVoices)
      const partElement = doc.querySelector('part')!
      const result = MusicXmlValidator.validateVoices(partElement)

      expect(result.isValid).toBe(false)
      expect(result.error).toBe('This sheet does not contain a single voice')
    })
  })
})
