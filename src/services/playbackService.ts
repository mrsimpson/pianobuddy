import { AudioService } from './audio';
import type { ParsedNote } from '../types/musicxml';
import { getNoteDurationInSeconds } from '../utils/durationUtils.ts';

export class PlaybackService {
  private audioService: AudioService;
  private notes: ParsedNote[] = [];
  private currentIndex: number = 0;
  private isPlaying: boolean = false;
  private tempo: number = 120; // beats per minute
  private playbackInterval: number | null = null;
  private onNoteCallback: ((index: number) => void)[] = [];

  constructor() {
    this.audioService = new AudioService();
  }

  setNotes(notes: ParsedNote[]): void {
    this.notes = notes;
    this.currentIndex = 0;
  }

  setTempo(bpm: number): void {
    this.tempo = Math.max(30, Math.min(240, bpm));
    if (this.isPlaying) {
      this.pause();
      this.play();
    }
  }

  onNote(callback: (index: number) => void): void {
    if (!this.onNoteCallback) {
      this.onNoteCallback = [];
    }
    this.onNoteCallback.push(callback);
  }

  private _getNoteDurationInSeconds(duration: number): number {
    // Convert note duration to seconds based on tempo
    // duration 4 = quarter note, tempo is in quarter notes per minute
    return getNoteDurationInSeconds(duration, this.tempo);
  }

  stop(): void {
    this.pause();
    this.currentIndex = 0;
    if (this.onNoteCallback) {
      this.onNoteCallback.forEach((cb) => cb(-1)); // Indicate no note is playing
    }
  }

  play(): void {
    if (!this.isPlaying && this.notes.length > 0) {
      this.isPlaying = true;
      this.audioService.resume();
      this.playCurrentNote();
    }
  }

  pause(): void {
    this.isPlaying = false;
    if (this.playbackInterval !== null) {
      clearTimeout(this.playbackInterval);
      this.playbackInterval = null;
    }
    this.audioService.suspend();
  }

  private playCurrentNote(): void {
    if (this.currentIndex >= this.notes.length) {
      this.stop();
      return;
    }

    const note = this.notes[this.currentIndex];
    if (this.onNoteCallback) {
      this.onNoteCallback.forEach((cb) => cb(this.currentIndex));
    }

    if (!note.isRest) {
      const durationInSeconds = this._getNoteDurationInSeconds(
        note.duration.divisions,
      );
      this.audioService.playNote(note.pitch, note.octave, durationInSeconds);
    }

    const nextNoteDelay =
      this._getNoteDurationInSeconds(note.duration.divisions) * 1000;
    this.playbackInterval = window.setTimeout(() => {
      this.currentIndex++;
      if (this.isPlaying) {
        this.playCurrentNote();
      }
      if (this.currentIndex === this.notes.length) {
        this.stop();
      }
    }, nextNoteDelay);
  }

  rewind(): void {
    this.stop();
  }
}
