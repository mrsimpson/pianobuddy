import { describe, expect, it } from 'vitest';
import { usePianoKey } from '../usePianoKey';

describe('usePianoKey', () => {
  const testCases = [
    // White key
    {
      props: { name: 'C', isBlack: false, color: '#FF0000' },
      expectedStyle: { backgroundColor: '#FF0000' },
    },
    // Black key (no color)
    {
      props: { name: 'C#', isBlack: true },
      expectedStyle: {},
    },
  ];

  it.each(testCases)(
    'should generate correct key style',
    ({ props, expectedStyle }) => {
      const { getKeyStyle } = usePianoKey(props);

      // Resolve computed value
      const style = getKeyStyle.value;

      expect(style).toEqual(expectedStyle);
    },
  );
});
