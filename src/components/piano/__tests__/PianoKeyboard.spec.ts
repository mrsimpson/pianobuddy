import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PianoKeyboard from '@/components/piano/PianoKeyboard.vue'

describe('PianoKeyboard Component', () => {
  it('renders default piano keyboard snapshot', () => {
    const wrapper = mount(PianoKeyboard)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders keyboard with correct number of keys', () => {
    const wrapper = mount(PianoKeyboard)
    const whiteKeys = wrapper.findAll('.white-key')
    const blackKeys = wrapper.findAll('.black-key')

    expect(whiteKeys.length).toBe(14) // 7 white keys * 2 octaves
    expect(blackKeys.length).toBe(10) // 5 black keys * 2 octaves
    expect(wrapper.html()).toMatchSnapshot()
  })
})
