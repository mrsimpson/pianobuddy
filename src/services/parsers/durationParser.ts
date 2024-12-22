import { type DurationInfo } from '../../types/musicxml';
import { getNoteTypeLength } from '../../utils/noteTypeMapping';

export class DurationParser {
  static #divisionsPerQuarter = 1;

  static setDivisionsPerQuarter(divisions: number) {
    this.#divisionsPerQuarter = divisions;
  }

  static getDivisionsPerQuarter() {
    return DurationParser.#divisionsPerQuarter;
  }

  static parseDuration(noteElement: Element): DurationInfo {
    const duration = parseInt(
      noteElement.querySelector('duration')?.textContent || '1',
    );
    const type = noteElement.querySelector('type')?.textContent || 'quarter';

    // Get relative length from note type
    const relativeLength = getNoteTypeLength(type);

    return {
      divisions: duration,
      type,
      relativeLength,
    };
  }

  static parseAttributes(measureElement: Element) {
    const divisions = measureElement.querySelector(
      'attributes divisions',
    )?.textContent;
    if (divisions) {
      this.setDivisionsPerQuarter(parseInt(divisions));
    }
  }
}
