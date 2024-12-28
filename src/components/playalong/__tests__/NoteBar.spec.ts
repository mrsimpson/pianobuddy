import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { ParsedNote } from '@/types/musicxml.ts'
import NoteBar from '@/components/playalong/NoteBar.vue'

describe('NoteBar Component', () => {
  const mockNote: ParsedNote = {
    pitch: 'C',
    duration: {
      divisions: 4,
      type: 'quarter',
      relativeLength: 1,
    },
    octave: 4,
    isRest: false,
  }

  const mockRestNote: ParsedNote = {
    pitch: 'rest',
    duration: {
      divisions: 4,
      type: 'quarter',
      relativeLength: 1,
    },
    octave: 4,
    isRest: true,
  }

  it('renders note bar snapshot', () => {
    const wrapper = mount(NoteBar, {
      props: {
        note: mockNote,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders rest note bar snapshot', () => {
    const wrapper = mount(NoteBar, {
      props: {
        note: mockRestNote,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
