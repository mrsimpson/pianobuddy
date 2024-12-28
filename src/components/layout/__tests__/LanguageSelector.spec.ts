import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import LanguageSelector from '@/components/layout/LanguageSelector.vue'

describe('LanguageSelector Component', () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en: {},
      de: {},
    },
  })

  it('renders language selector snapshot', () => {
    const wrapper = mount(LanguageSelector, {
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders language selector with dropdown open snapshot', async () => {
    const wrapper = mount(LanguageSelector, {
      global: {
        plugins: [i18n],
      },
    })

    const languageButton = wrapper.find('.selected-language')
    await languageButton.trigger('click')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
