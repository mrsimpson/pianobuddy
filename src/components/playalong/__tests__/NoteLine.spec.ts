import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import NoteLine from '@/components/playalong/NoteLine.vue'

describe('NoteLine Component', () => {
  it('renders note line snapshot', () => {
    const wrapper = mount(NoteLine, {
      slots: {
        notes: '<div>Note 1</div><div>Note 2</div>',
        lyrics: '<div>Lyric 1</div><div>Lyric 2</div>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders empty note line snapshot', () => {
    const wrapper = mount(NoteLine)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
