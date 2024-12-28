import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import PartSelector from '../PartSelector.vue'
import type { PartInfo } from '@/types/musicxml.ts'

describe('PartSelector Component', () => {
  const mockParts: PartInfo[] = [
    { id: 'part1', name: 'Part 1' },
    { id: 'part2', name: 'Part 2' },
  ]

  it('renders part selector snapshot', () => {
    const wrapper = mount(PartSelector, {
      props: {
        modelValue: 'part1',
        parts: mockParts,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders part selector with different selected part snapshot', () => {
    const wrapper = mount(PartSelector, {
      props: {
        modelValue: 'part2',
        parts: mockParts,
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
