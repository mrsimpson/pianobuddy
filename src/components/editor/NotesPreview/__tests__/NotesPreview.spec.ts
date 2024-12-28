import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { ParsedNote } from '@/types/musicxml.ts'
import NotesPreview from '@/components/editor/NotesPreview.vue'

describe('NotesPreview Component', () => {
  const mockNotes: ParsedNote[] = [
    {
      pitch: 'C',
      duration: {
        divisions: 4,
        type: 'quarter',
        relativeLength: 1,
      },
      octave: 4,
    },
    {
      pitch: 'D',
      duration: {
        divisions: 4,
        type: 'quarter',
        relativeLength: 1,
      },
      octave: 4,
    },
  ]

  it('renders notes preview snapshot', () => {
    const wrapper = mount(NotesPreview, {
      props: {
        notes: mockNotes,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders empty notes preview snapshot', () => {
    const wrapper = mount(NotesPreview, {
      props: {
        notes: [],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
