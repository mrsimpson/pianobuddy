export class AudioService {
  private audioContext: AudioContext;
  private gainNode: GainNode;

  constructor() {
    this.audioContext = new AudioContext();
    this.gainNode = this.audioContext.createGain();
    this.gainNode.connect(this.audioContext.destination);
    this.gainNode.gain.value = 0.1; // Lower volume to avoid being too loud
  }

  private noteToFrequency(note: string): number {
    const noteFrequencies: { [key: string]: number } = {
      'C': 261.63,  // Middle C
      'C#': 277.18,
      'D': 293.66,
      'D#': 311.13,
      'E': 329.63,
      'F': 349.23,
      'F#': 369.99,
      'G': 392.00,
      'G#': 415.30,
      'A': 440.00,
      'A#': 466.16,
      'H': 493.88
    };
    return noteFrequencies[note] || 440;
  }

  public playNote(note: string, duration: number = 0.5): void {
    const oscillator = this.audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = this.noteToFrequency(note);
    
    oscillator.connect(this.gainNode);
    oscillator.start();
    oscillator.stop(this.audioContext.currentTime + duration);
  }
}