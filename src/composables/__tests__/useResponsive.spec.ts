import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { MOBILE_BREAKPOINT, useResponsive } from '../useResponsive'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

describe('useResponsive', () => {
  let originalInnerWidth: number

  beforeEach(() => {
    // Store original inner width
    originalInnerWidth = window.innerWidth
  })

  afterEach(() => {
    // Restore original inner width
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth })
  })

  const testCases = [
    { width: 600, expectedMobile: true },
    { width: 799, expectedMobile: true },
    { width: 800, expectedMobile: false },
    { width: 1200, expectedMobile: false },
  ]

  it.each(testCases)('should detect mobile state for width $width', ({ width, expectedMobile }) => {
    // Set window inner width
    Object.defineProperty(window, 'innerWidth', { value: width })

    const TestComponent = defineComponent({
      setup() {
        const { isMobile } = useResponsive()
        return { isMobile }
      },
      template: '<div>{{ isMobile }}</div>',
    })

    const wrapper = mount(TestComponent)

    expect(wrapper.vm.isMobile).toBe(expectedMobile)
  })

  it('should update mobile state on window resize', () => {
    const TestComponent = defineComponent({
      setup() {
        const { isMobile } = useResponsive()
        return { isMobile }
      },
      template: '<div>{{ isMobile }}</div>',
    })

    const wrapper = mount(TestComponent)

    // Trigger resize event
    Object.defineProperty(window, 'innerWidth', { value: 600 })
    window.dispatchEvent(new Event('resize'))

    expect(wrapper.vm.isMobile).toBe(true)
  })

  it('should have correct mobile breakpoint', () => {
    expect(MOBILE_BREAKPOINT).toBe(800)
  })
})
