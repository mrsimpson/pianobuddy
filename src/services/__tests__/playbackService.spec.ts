import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PlaybackService } from '../playbackService';
import { AudioService } from '../audio';

describe('PlaybackService', () => {
  let playbackService: PlaybackService;
  let mockAudioService: AudioService;

  const mockNotes = [
    {
      pitch: 'C',
      octave: 4,
      duration: { divisions: 4, type: 'quarter', relativeLength: 1 },
      isRest: false,
    },
    {
      pitch: 'D',
      octave: 4,
      duration: { divisions: 4, type: 'quarter', relativeLength: 1 },
      isRest: false,
    },
    {
      pitch: 'E',
      octave: 4,
      duration: { divisions: 4, type: 'quarter', relativeLength: 1 },
      isRest: false,
    },
  ];

  beforeEach(() => {
    mockAudioService = {
      playNote: vi.fn(),
      resume: vi.fn(),
      suspend: vi.fn(),
      setVolume: vi.fn(),
    } as any;

    vi.spyOn(AudioService.prototype, 'playNote').mockImplementation(
      mockAudioService.playNote,
    );
    vi.spyOn(AudioService.prototype, 'resume').mockImplementation(
      mockAudioService.resume,
    );
    vi.spyOn(AudioService.prototype, 'suspend').mockImplementation(
      mockAudioService.suspend,
    );

    playbackService = new PlaybackService();
    playbackService['audioService'] = mockAudioService;
  });

  it('should set notes correctly', () => {
    playbackService.setNotes(mockNotes);
    expect(playbackService['notes']).toEqual(mockNotes);
  });

  it('should set tempo within valid range', () => {
    playbackService.setTempo(60);
    expect(playbackService['tempo']).toBe(60);

    playbackService.setTempo(0); // Below minimum
    expect(playbackService['tempo']).toBe(30);

    playbackService.setTempo(300); // Above maximum
    expect(playbackService['tempo']).toBe(240);
  });

  it('should play notes sequentially', () => {
    vi.useFakeTimers();

    const noteCallback = vi.fn();
    playbackService.onNote(noteCallback);
    playbackService.setNotes(mockNotes);
    playbackService.play();

    // Simulate time passing
    vi.runAllTimers();

    expect(mockAudioService.playNote).toHaveBeenCalledTimes(3);
    expect(noteCallback).toHaveBeenCalledTimes(4); // 3 notes + final stop
  });

  it('should handle empty notes collection', () => {
    const noteCallback = vi.fn();
    playbackService.onNote(noteCallback);
    playbackService.setNotes([]);
    playbackService.play();

    expect(mockAudioService.playNote).not.toHaveBeenCalled();
    expect(noteCallback).not.toHaveBeenCalled();
  });

  it('should pause and resume playback', () => {
    playbackService.setNotes(mockNotes);
    playbackService.play();
    playbackService.pause();

    expect(mockAudioService.suspend).toHaveBeenCalled();

    playbackService.play();
    expect(mockAudioService.resume).toHaveBeenCalled();
  });

  it('should stop playback', () => {
    const noteCallback = vi.fn();
    playbackService.onNote(noteCallback);
    playbackService.setNotes(mockNotes);
    playbackService.play();
    playbackService.stop();

    expect(noteCallback).toHaveBeenCalledWith(-1);
  });
});
