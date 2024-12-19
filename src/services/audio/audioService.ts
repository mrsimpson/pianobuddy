import { AudioEngine } from './audioEngine';
import { NoteMapper } from './noteMapper';

export class AudioService {
  private audioEngine: AudioEngine;
  private isInitialized: boolean = false;
  
  constructor() {
    this.audioEngine = new AudioEngine();
  }

  private async initialize(): Promise<void> {
    if (!this.isInitialized) {
      try {
        await this.resume();
        this.isInitialized = true;
      } catch (error) {
        console.error('Failed to initialize AudioService:', error);
        throw new Error('Audio initialization failed');
      }
    }
  }

  async playNote(note: string, octave: number, duration: number): Promise<void> {
    try {
      await this.initialize();
      const frequency = NoteMapper.getFrequency(note, octave);
      this.audioEngine.playNote(frequency, duration);
    } catch (error) {
      console.error('AudioService playNote error:', error);
      // Don't throw here - we want to continue playback even if one note fails
    }
  }

  setVolume(value: number): void {
    this.audioEngine.setVolume(value);
  }

  async resume(): Promise<void> {
    try {
      await this.audioEngine.resume();
    } catch (error) {
      console.error('Failed to resume audio:', error);
      throw new Error('Failed to resume audio playback');
    }
  }

  suspend(): void {
    this.audioEngine.suspend();
  }
}
