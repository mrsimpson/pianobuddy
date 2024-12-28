import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { ParsedNote } from '@/types/musicxml.ts'
import NoteWithLyric from '@/components/playalong/NoteWithLyric.vue'

describe('NoteWithLyric Component', () => {
  const mockNote: ParsedNote = {
    pitch: 'C',
    duration: {
      divisions: 4,
      type: 'quarter',
      relativeLength: 1,
    },
    octave: 4,
    lyric: 'Hello',
  }

  it('renders note with lyric snapshot', () => {
    const wrapper = mount(NoteWithLyric, {
      props: {
        note: mockNote,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders current note snapshot', () => {
    const wrapper = mount(NoteWithLyric, {
      props: {
        note: mockNote,
        isCurrentNote: true,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders note without lyric snapshot', () => {
    const noteWithoutLyric = { ...mockNote, lyric: undefined }
    const wrapper = mount(NoteWithLyric, {
      props: {
        note: noteWithoutLyric,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
