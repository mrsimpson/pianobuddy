import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ImportDialog from '../ImportDialog.vue'
import { createI18n } from 'vue-i18n'

describe('ImportDialog Component', () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en: {
        import: {
          title: 'Import MusicXML File',
          dropzone: {
            text: 'Drag and drop your MusicXML file here',
            or: 'or',
            button: 'Choose File',
          },
        },
      },
    },
  })

  it('renders open dialog snapshot', () => {
    const wrapper = mount(ImportDialog, {
      props: {
        isOpen: true,
      },
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders closed dialog snapshot', () => {
    const wrapper = mount(ImportDialog, {
      props: {
        isOpen: false,
      },
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
