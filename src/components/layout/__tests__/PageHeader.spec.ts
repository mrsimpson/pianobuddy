import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PageHeader from '../PageHeader.vue'

describe('PageHeader Component', () => {
  it('renders basic page header snapshot', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Test Title' },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders page header with actions snapshot', () => {
    const wrapper = mount(PageHeader, {
      props: { title: 'Test Title' },
      slots: {
        actions: '<button>Action</button>',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders page header with long title snapshot', () => {
    const longTitle = 'A very long title that should be displayed correctly'
    const wrapper = mount(PageHeader, {
      props: { title: longTitle },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
