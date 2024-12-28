import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MusicNote from '@/components/sheet/MusicNote.vue'

describe('MusicNote Component', () => {
  it('renders music note snapshot', () => {
    const wrapper = mount(MusicNote, {
      props: {
        pitch: 'C',
        octave: 4,
        index: 0,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders music note with different pitch snapshot', () => {
    const wrapper = mount(MusicNote, {
      props: {
        pitch: 'G',
        octave: 5,
        index: 1,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
