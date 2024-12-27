/* eslint-disable vue/one-component-per-file */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useMusicSheetSize } from '../useMusicSheetSize';
import { mount } from '@vue/test-utils';
import { defineComponent } from 'vue';

describe.skip('useMusicSheetSize', () => {
  let mockElement: HTMLElement;
  let originalInnerWidth: number;

  beforeEach(() => {
    // Store original inner width
    originalInnerWidth = window.innerWidth;

    // Create mock container element
    mockElement = document.createElement('div');
    mockElement.getBoundingClientRect = vi.fn().mockReturnValue({
      width: 1000,
    });
    mockElement.offsetWidth = 1000;

    // Mock parent element
    const parentElement = document.createElement('div');
    parentElement.offsetWidth = 1200;
    mockElement.parentElement = parentElement;

    // Reset window inner width
    Object.defineProperty(window, 'innerWidth', { value: 1200 });
  });

  afterEach(() => {
    // Restore original inner width
    Object.defineProperty(window, 'innerWidth', { value: originalInnerWidth });
  });

  it('should calculate scale factor correctly for desktop', () => {
    const TestComponent = defineComponent({
      setup() {
        const { containerRef, getScaleFactor } = useMusicSheetSize();
        containerRef.value = mockElement;
        return { scaleFactor: getScaleFactor() };
      },
      template: '<div ref="containerRef"></div>',
    });

    const wrapper = mount(TestComponent);

    expect(wrapper.vm.scaleFactor).toBe(1);
  });

  it('should calculate scale factor for smaller screens', () => {
    // Simulate mobile screen
    Object.defineProperty(window, 'innerWidth', { value: 600 });

    const TestComponent = defineComponent({
      setup() {
        const { containerRef, getScaleFactor } = useMusicSheetSize();
        containerRef.value = mockElement;
        return { scaleFactor: getScaleFactor() };
      },
      template: '<div ref="containerRef"></div>',
    });

    const wrapper = mount(TestComponent);

    // Scale factor should be less than 1
    expect(wrapper.vm.scaleFactor).toBeLessThan(1);
  });

  it('should update container width on resize', () => {
    const TestComponent = defineComponent({
      setup() {
        const { containerRef, containerWidth, updateWidth } =
          useMusicSheetSize();
        containerRef.value = mockElement;
        updateWidth();
        return { containerWidth };
      },
      template: '<div ref="containerRef"></div>',
    });

    const wrapper = mount(TestComponent);

    expect(wrapper.vm.containerWidth).toBe(1000);
  });
});
