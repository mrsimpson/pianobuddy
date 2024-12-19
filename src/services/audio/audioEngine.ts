import { type AudioConfig } from './types';

export class AudioEngine {
  private context: AudioContext;
  private gainNode: GainNode;
  private config: AudioConfig = {
    volume: 0.1,
    attackTime: 0.005,  // Faster attack for piano-like sound
    releaseTime: 0.3,   // Longer release for natural decay
    sustainLevel: 0.8
  };
  
  constructor() {
    this.context = new AudioContext();
    this.gainNode = this.context.createGain();
    this.gainNode.connect(this.context.destination);
    this.gainNode.gain.value = this.config.volume;
  }

  playNote(frequency: number, duration: number): void {
    try {
      const now = this.context.currentTime;
      const noteGain = this.context.createGain();
      const { attackTime, releaseTime, sustainLevel } = this.config;
      
      // Create multiple oscillators for richer sound
      const oscillators = [
        { type: 'triangle', gain: 0.6, detune: 0 },     // Base tone
        { type: 'sine', gain: 0.4, detune: -5 },        // Slight detune for warmth
        { type: 'sine', gain: 0.3, detune: 5 },         // Slight detune opposite
        { type: 'square', gain: 0.1, detune: 0 }        // Harmonic content
      ].map(config => {
        const osc = this.context.createOscillator();
        const oscGain = this.context.createGain();
        
        osc.type = config.type as OscillatorType;
        osc.frequency.setValueAtTime(frequency, now);
        osc.detune.setValueAtTime(config.detune, now);
        
        oscGain.gain.setValueAtTime(config.gain, now);
        
        osc.connect(oscGain);
        oscGain.connect(noteGain);
        
        return osc;
      });

      // Dynamic envelope shaping
      const decayTime = Math.min(0.2, duration * 0.3);
      const actualSustainLevel = sustainLevel * 0.7; // Slightly lower for piano-like decay
      
      // Configure envelope
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(sustainLevel, now + attackTime);
      noteGain.gain.linearRampToValueAtTime(actualSustainLevel, now + attackTime + decayTime);
      noteGain.gain.setValueAtTime(actualSustainLevel, now + duration - releaseTime);
      noteGain.gain.linearRampToValueAtTime(0, now + duration);

      // Connect to main output
      noteGain.connect(this.gainNode);
      
      // Start all oscillators
      oscillators.forEach(osc => {
        osc.start(now);
        osc.stop(now + duration);
      });

      // Cleanup
      const cleanup = () => {
        oscillators.forEach(osc => osc.disconnect());
        noteGain.disconnect();
      };
      
      oscillators[0].onended = cleanup;
    } catch (error) {
      console.error('AudioEngine playNote error:', error);
      throw new Error('Failed to play note');
    }
  }

  setVolume(value: number): void {
    this.config.volume = Math.max(0, Math.min(1, value));
    this.gainNode.gain.value = this.config.volume;
  }

  resume(): void {
    if (this.context.state === 'suspended') {
      this.context.resume().catch(error => {
        console.error('Failed to resume audio context:', error);
      });
    }
  }

  suspend(): void {
    if (this.context.state === 'running') {
      this.context.suspend().catch(error => {
        console.error('Failed to suspend audio context:', error);
      });
    }
  }
}
