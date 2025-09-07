// Audio utility functions for generating realistic piano tones
export class AudioEngine {
  private audioContext: AudioContext;
  private masterGainNode: GainNode;
  private sampleBuffers: Map<number, AudioBuffer> = new Map();

  constructor() {
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGainNode = this.audioContext.createGain();
    this.masterGainNode.connect(this.audioContext.destination);
    this.masterGainNode.gain.value = 0.3;
  }

  // Convert note to frequency using A4 = 440Hz
  private noteToFrequency(note: string, octave: number): number {
    const noteFrequencies: { [key: string]: number } = {
      'C': -9, 'C#': -8, 'D': -7, 'D#': -6, 'E': -5, 'F': -4,
      'F#': -3, 'G': -2, 'G#': -1, 'A': 0, 'A#': 1, 'B': 2
    };
    
    const semitoneOffset = noteFrequencies[note];
    const octaveOffset = (octave - 4) * 12;
    const totalSemitones = semitoneOffset + octaveOffset;
    
    return 440 * Math.pow(2, totalSemitones / 12);
  }

  // Play a piano note with realistic ADSR envelope
  async playNote(note: string, octave: number, duration: number = 2): Promise<void> {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    const frequency = this.noteToFrequency(note, octave);
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Create a more realistic piano sound with multiple harmonics
    oscillator.type = 'triangle';
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    // ADSR envelope for realistic piano sound
    const now = this.audioContext.currentTime;
    const attackTime = 0.05;
    const decayTime = 0.3;
    const sustainLevel = 0.3;
    const releaseTime = 1.2;
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.8, now + attackTime);
    gainNode.gain.exponentialRampToValueAtTime(sustainLevel, now + attackTime + decayTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGainNode);
    
    oscillator.start(now);
    oscillator.stop(now + duration);
  }

  // Play drum beat
  playDrumSound(type: 'kick' | 'snare' | 'hihat' | 'crash'): void {
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const now = this.audioContext.currentTime;

    switch (type) {
      case 'kick':
        oscillator.frequency.setValueAtTime(60, now);
        oscillator.frequency.exponentialRampToValueAtTime(30, now + 0.1);
        gainNode.gain.setValueAtTime(1, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
        break;
      case 'snare':
        oscillator.type = 'noise' as any;
        gainNode.gain.setValueAtTime(0.5, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        break;
      case 'hihat':
        oscillator.frequency.setValueAtTime(8000, now);
        oscillator.type = 'square';
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        break;
      case 'crash':
        oscillator.frequency.setValueAtTime(5000, now);
        oscillator.type = 'sawtooth';
        gainNode.gain.setValueAtTime(0.6, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 2);
        break;
    }

    oscillator.connect(gainNode);
    gainNode.connect(this.masterGainNode);
    oscillator.start(now);
    oscillator.stop(now + 2);
  }

  // Load sample from file
  async loadSample(file: File, padIndex: number): Promise<void> {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(arrayBuffer);
      this.sampleBuffers.set(padIndex, audioBuffer);
    } catch (error) {
      console.error('Error loading sample:', error);
      throw new Error('Failed to load audio sample');
    }
  }

  // Play loaded sample
  playSample(padIndex: number): void {
    const buffer = this.sampleBuffers.get(padIndex);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    const gainNode = this.audioContext.createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = 0.7;
    
    source.connect(gainNode);
    gainNode.connect(this.masterGainNode);
    
    source.start();
  }

  // Check if sample is loaded
  hasSample(padIndex: number): boolean {
    return this.sampleBuffers.has(padIndex);
  }

  // Remove sample
  removeSample(padIndex: number): void {
    this.sampleBuffers.delete(padIndex);
  }

  // Play chord (multiple notes simultaneously)
  async playChord(notes: Array<{note: string, octave: number}>, duration: number = 2): Promise<void> {
    if (this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }

    notes.forEach(({note, octave}) => {
      this.playNote(note, octave, duration);
    });
  }
}