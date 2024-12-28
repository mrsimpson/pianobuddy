import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PianoKey from '@/components/piano/PianoKey.vue'

describe('PianoKey Component', () => {
  const baseProps = {
    name: 'C4',
    isBlack: false,
    pitch: 'C',
    octave: 4,
  }

  it('renders white key snapshot', () => {
    const wrapper = mount(PianoKey, { props: baseProps })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders black key snapshot', () => {
    const wrapper = mount(PianoKey, {
      props: { ...baseProps, isBlack: true },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
