import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import MusicStaff from '@/components/sheet/MusicStaff.vue'

describe('MusicStaff Component', () => {
  it('renders music staff snapshot', () => {
    const wrapper = mount(MusicStaff, {
      slots: {
        default: '<div class="test-note">Test Note</div>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders empty music staff snapshot', () => {
    const wrapper = mount(MusicStaff)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
