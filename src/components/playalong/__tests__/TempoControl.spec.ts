import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import { createI18n } from 'vue-i18n';
import TempoControl from '../TempoControl.vue';

describe('TempoControl Component', () => {
  const i18n = createI18n({
    legacy: false,
    locale: 'en',
    messages: {
      en: {
        playback: {
          tempo: 'Tempo',
          bpm: 'BPM',
          presets: {
            label: 'Preset',
            slow: 'Slow (40 BPM)',
            medium: 'Medium (80 BPM)',
            fast: 'Fast (120 BPM)',
          },
        },
      },
    },
  });

  it('renders tempo control snapshot', () => {
    const wrapper = mount(TempoControl, {
      props: {
        tempo: 60,
        onTempoChange: () => {},
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('renders tempo control with different tempo snapshot', () => {
    const wrapper = mount(TempoControl, {
      props: {
        tempo: 120,
        onTempoChange: () => {},
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });
});
