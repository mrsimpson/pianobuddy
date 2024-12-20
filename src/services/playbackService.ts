import { AudioService } from './audio';
import type { ParsedNote } from '../types/musicxml';

export class PlaybackService {
  private audioService: AudioService;
  private notes: ParsedNote[] = [];
  private currentIndex: number = 0;
  private isPlaying: boolean = false;
  private tempo: number = 120; // beats per minute
  private playbackInterval: number | null = null;
  private onNoteCallback: ((index: number) => void) | null = null;

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
    this.onNoteCallback = callback;
  }

  private getNoteDurationInSeconds(duration: number): number {
    // Convert note duration to seconds based on tempo
    // duration 4 = quarter note, tempo is in quarter notes per minute
    return (duration / 4) * (60 / this.tempo);
  }

  private playCurrentNote(): void {
    if (this.currentIndex >= this.notes.length) {
      this.stop();
      return;
    }

    const note = this.notes[this.currentIndex];
    if (this.onNoteCallback) {
      this.onNoteCallback(this.currentIndex);
    }

    if (!note.isRest) {
      const durationInSeconds = this.getNoteDurationInSeconds(note.duration);
      this.audioService.playNote(note.pitch, note.octave, durationInSeconds);
    }

    const nextNoteDelay = this.getNoteDurationInSeconds(note.duration) * 1000;
    this.playbackInterval = window.setTimeout(() => {
      this.currentIndex++;
      if (this.isPlaying) {
        this.playCurrentNote();
      }
    }, nextNoteDelay);
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

  stop(): void {
    this.pause();
    this.currentIndex = 0;
    if (this.onNoteCallback) {
      this.onNoteCallback(-1); // Indicate no note is playing
    }
  }

  rewind(): void {
    this.stop();
  }
}
