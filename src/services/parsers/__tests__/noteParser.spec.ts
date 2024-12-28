import { beforeEach, describe, expect, it } from 'vitest'
import { NoteParser } from '../noteParser'

describe('NoteParser', () => {
  let mockNoteElement: Element
  let mockRestElement: Element

  beforeEach(() => {
    // Create a mock note element with pitch
    mockNoteElement = document.createElement('note')
    const pitchEl = document.createElement('pitch')
    const stepEl = document.createElement('step')
    stepEl.textContent = 'C'
    const octaveEl = document.createElement('octave')
    octaveEl.textContent = '4'
    const alterEl = document.createElement('alter')
    alterEl.textContent = '1'
    const durationEl = document.createElement('duration')
    durationEl.textContent = '4'
    const typeEl = document.createElement('type')
    typeEl.textContent = 'quarter'
    const lyricEl = document.createElement('lyric')
    const textEl = document.createElement('text')
    textEl.textContent = 'Test Lyric'

    pitchEl.appendChild(stepEl)
    pitchEl.appendChild(octaveEl)
    pitchEl.appendChild(alterEl)
    mockNoteElement.appendChild(pitchEl)
    mockNoteElement.appendChild(durationEl)
    mockNoteElement.appendChild(typeEl)
    lyricEl.appendChild(textEl)
    mockNoteElement.appendChild(lyricEl)

    // Create a mock rest element
    mockRestElement = document.createElement('note')
    const restEl = document.createElement('rest')
    const restDurationEl = document.createElement('duration')
    restDurationEl.textContent = '2'
    mockRestElement.appendChild(restEl)
    mockRestElement.appendChild(restDurationEl)
    mockRestElement.appendChild(typeEl)
  })

  describe('parseNote', () => {
    it('should parse a regular note correctly', () => {
      const parsedNote = NoteParser.parseNote(mockNoteElement)

      expect(parsedNote).toEqual({
        pitch: 'C#',
        duration: {
          divisions: 4,
          type: 'quarter',
          relativeLength: 1,
        },
        octave: 4,
        isRest: false,
        lyric: 'Test Lyric',
        alter: 1,
      })
    })

    it('should parse a rest note correctly', () => {
      const parsedNote = NoteParser.parseNote(mockRestElement)

      expect(parsedNote).toEqual({
        pitch: 'rest',
        duration: {
          divisions: 2,
          type: 'quarter',
          relativeLength: 1,
        },
        octave: 4,
        isRest: true,
      })
    })

    it('should handle notes without lyric', () => {
      const noteWithoutLyric = document.createElement('note')
      const pitchEl = document.createElement('pitch')
      const stepEl = document.createElement('step')
      stepEl.textContent = 'D'
      const octaveEl = document.createElement('octave')
      octaveEl.textContent = '5'

      pitchEl.appendChild(stepEl)
      pitchEl.appendChild(octaveEl)
      noteWithoutLyric.appendChild(pitchEl)

      const parsedNote = NoteParser.parseNote(noteWithoutLyric)

      expect(parsedNote?.lyric).toBe('')
    })

    it('should return null for note without pitch', () => {
      const invalidNote = document.createElement('note')

      const parsedNote = NoteParser.parseNote(invalidNote)

      expect(parsedNote).toBeNull()
    })
  })

  describe('parseNoteElements', () => {
    it('should parse multiple note elements', () => {
      const notes = [mockNoteElement, mockRestElement]

      const parsedNotes = NoteParser.parseNoteElements(notes)

      expect(parsedNotes.length).toBe(2)
      expect(parsedNotes[0].pitch).toBe('C#')
      expect(parsedNotes[1].isRest).toBe(true)
    })

    it('should filter out invalid notes', () => {
      const invalidNote = document.createElement('note')
      const notes = [mockNoteElement, invalidNote, mockRestElement]

      const parsedNotes = NoteParser.parseNoteElements(notes)

      expect(parsedNotes.length).toBe(2)
    })
  })
})
