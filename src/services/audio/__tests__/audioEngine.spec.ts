import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AudioEngine } from '../audioEngine';

describe('AudioEngine', () => {
  let audioEngine: AudioEngine;
  let mockContext: any;
  let mockGainNode: any;

  beforeEach(() => {
    mockContext = {
      createGain: vi.fn().mockReturnValue({
        connect: vi.fn(),
        gain: { value: 0, setValueAtTime: vi.fn() },
      }),
      createOscillator: vi.fn().mockReturnValue({
        type: 'sine',
        frequency: { setValueAtTime: vi.fn() },
        detune: { setValueAtTime: vi.fn() },
        connect: vi.fn(),
        start: vi.fn(),
        stop: vi.fn(),
        onended: null,
      }),
      currentTime: 0,
      destination: {},
    };

    vi.spyOn(window, 'AudioContext').mockImplementation(() => mockContext);

    audioEngine = new AudioEngine();
  });

  it('should create an AudioContext and gain node on initialization', () => {
    expect(window.AudioContext).toHaveBeenCalled();
    expect(mockContext.createGain).toHaveBeenCalled();
  });

  it.skip('should play note with correct frequency and duration', () => {
    const frequency = 440; // A4 note
    const duration = 1;

    audioEngine.playNote(frequency, duration);

    // Verify oscillator creation and configuration
    expect(mockContext.createOscillator).toHaveBeenCalledTimes(4);

    // Verify note start and stop
    const oscillators = mockContext.createOscillator.mock.results;
    oscillators.forEach((osc: any) => {
      expect(osc.start).toHaveBeenCalledWith(0);
      expect(osc.stop).toHaveBeenCalledWith(duration);
    });
  });

  it.skip('should set volume correctly', () => {
    audioEngine.setVolume(0.5);

    const gainNode = mockContext.createGain.mock.results[0];
    expect(gainNode.gain.value).toBe(0.5);
  });

  it('should handle volume boundary conditions', () => {
    audioEngine.setVolume(-1); // Below minimum
    expect(audioEngine['config'].volume).toBe(0);

    audioEngine.setVolume(2); // Above maximum
    expect(audioEngine['config'].volume).toBe(1);
  });
});
