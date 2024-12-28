import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { createI18n } from 'vue-i18n'
import CollectionCard from '@/components/collections/CollectionCard.vue'

describe('CollectionCard Component', () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en: {
        collections: {
          addToLibrary: 'Add to Library',
          added: 'Added',
        },
      },
    },
  })

  const mockCollection = {
    metadata: {
      id: 'test-collection',
      name: 'Test Collection',
      description: 'A test collection description',
    },
    songs: [
      {
        id: 'song1',
        name: 'Song 1',
        composer: 'Composer 1',
        arranger: 'Arranger 1',
        filename: 'song1.xml',
      },
      {
        id: 'song2',
        name: 'Song 2',
        filename: 'song2.xml',
      },
    ],
  }

  it('renders collection card snapshot', () => {
    const wrapper = mount(CollectionCard, {
      props: {
        collection: mockCollection,
        importedSongIds: new Set(),
      },
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders collection card with imported songs snapshot', () => {
    const wrapper = mount(CollectionCard, {
      props: {
        collection: mockCollection,
        importedSongIds: new Set(['song1']),
      },
      global: {
        plugins: [i18n],
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
