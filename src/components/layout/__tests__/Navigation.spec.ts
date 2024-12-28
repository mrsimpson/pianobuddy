import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { createI18n } from 'vue-i18n'
import Navigation from '@/components/layout/TheNavigation.vue'

describe('Navigation Component', () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      { path: '/library', component: { template: 'Library' } },
      { path: '/collections', component: { template: 'Collections' } },
      { path: '/config', component: { template: 'Config' } },
    ],
  })

  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en: {
        navigation: {
          library: 'Library',
          collections: 'Collections',
          configuration: 'Configuration',
        },
      },
    },
  })

  it('renders desktop navigation snapshot', () => {
    // Mock window width to simulate desktop
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(1200)

    const wrapper = mount(Navigation, {
      global: {
        plugins: [router, i18n],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders mobile navigation snapshot', () => {
    // Mock window width to simulate mobile
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(600)

    const wrapper = mount(Navigation, {
      global: {
        plugins: [router, i18n],
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it.skip('renders mobile navigation with open menu snapshot', async () => {
    // Mock window width to simulate mobile
    vi.spyOn(window, 'innerWidth', 'get').mockReturnValue(600)

    const wrapper = mount(Navigation, {
      global: {
        plugins: [router, i18n],
      },
    })

    const burgerMenu = wrapper.find('.burger-menu')
    if (!burgerMenu.exists()) {
      throw new Error('Burger menu not found')
    }
    await burgerMenu.trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
