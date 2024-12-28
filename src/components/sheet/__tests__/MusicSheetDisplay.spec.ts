import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import MusicSheetDisplay from '@/components/sheet/MusicSheetDisplay.vue'

// Mock OpenSheetMusicDisplay
vi.mock('opensheetmusicdisplay', () => ({
  OpenSheetMusicDisplay: class {
    load = vi.fn()
    render = vi.fn()
    clear = vi.fn()

    constructor() {}
  },
}))

describe('MusicSheetDisplay Component', () => {
  const sampleXmlContent = `
    <?xml version="1.0" encoding="UTF-8"?>
    <score-partwise>
      <part-list>
        <score-part id="P1">
          <part-name>Music</part-name>
        </score-part>
      </part-list>
      <part id="P1">
        <measure>
          <note>
            <pitch>
              <step>C</step>
              <octave>4</octave>
            </pitch>
          </note>
        </measure>
      </part>
    </score-partwise>
  `

  it('renders music sheet display snapshot', () => {
    const wrapper = mount(MusicSheetDisplay, {
      props: {
        xmlContent: sampleXmlContent,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders error state snapshot', async () => {
    const wrapper = mount(MusicSheetDisplay, {
      props: {
        xmlContent: 'Invalid XML',
      },
    })

    await wrapper.vm.renderScore()
    expect(wrapper.html()).toMatchSnapshot()
  })
})
