import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import NotesVisualization from '../NotesVisualization.vue';
import type { ParsedNote } from '../../../types/musicxml.ts';

describe('NotesVisualization Component', () => {
  const mockNotes: ParsedNote[] = [
    {
      pitch: 'C',
      duration: {
        divisions: 4,
        type: 'quarter',
        relativeLength: 1,
      },
      octave: 4,
      lyric: 'Hello',
    },
    {
      pitch: 'D',
      duration: {
        divisions: 4,
        type: 'quarter',
        relativeLength: 1,
      },
      octave: 4,
      lyric: 'World',
    },
  ];

  it('renders notes visualization snapshot', () => {
    const wrapper = mount(NotesVisualization, {
      props: {
        notes: mockNotes,
        currentNoteIndex: 0,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders notes visualization with current note snapshot', () => {
    const wrapper = mount(NotesVisualization, {
      props: {
        notes: mockNotes,
        currentNoteIndex: 1,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders empty notes visualization snapshot', () => {
    const wrapper = mount(NotesVisualization, {
      props: {
        notes: [],
        currentNoteIndex: -1,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
