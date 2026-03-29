import React, { useState, useEffect, useRef } from 'react';
import { Music, Disc, Piano, Zap, Settings } from 'lucide-react';
import PianoKeyboard from './components/PianoKeyboard';
import BeatMachine from './components/BeatMachine';
import SamplePads from './components/SamplePads';
import CustomBeatMachine from './components/CustomBeatMachine';
import CircleOfFifths from './components/CircleOfFifths';
import Controls from './components/Controls';
import ChordInfo from './components/ChordInfo';
import AISongComposer from './components/AISongComposer';
import { AudioEngine } from './utils/audioUtils';
import { keyInfo, isNoteDiatonic } from './utils/musicTheoryUtils';

interface ChordProgression {
  chords: string[];
  timeSignature: string;
  tempo: number;
  mood: string;
}

function App() {
  const [octaveShift, setOctaveShift] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [chordMode, setChordMode] = useState(false);
  const [selectedKey, setSelectedKey] = useState('C');
  const [isCircleSpinning, setIsCircleSpinning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<'preset' | 'custom' | 'sampler'>('preset');
  const [lastPressedNote, setLastPressedNote] = useState<string>('');
  const [contentReady, setContentReady] = useState(false);
  const [isPlayingProgression, setIsPlayingProgression] = useState(false);
  const [currentProgressionIndex, setCurrentProgressionIndex] = useState(0);
  const [activeProgression, setActiveProgression] = useState<ChordProgression | null>(null);
  const [highlightedChord, setHighlightedChord] = useState<string | null>(null);

  const audioEngineRef = useRef<AudioEngine | null>(null);
  const progressionIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    audioEngineRef.current = new AudioEngine();
    
    // Hide welcome after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
      // Add slight delay for content animation
      setTimeout(() => {
        setContentReady(true);
      }, 200);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (note: string, octave: number) => {
    if (audioEngineRef.current && !isMuted) {
      audioEngineRef.current.playNote(note, octave);
      setLastPressedNote(note);
    }
  };

  const handleChordPress = (chord: Array<{note: string, octave: number}>) => {
    if (audioEngineRef.current && !isMuted) {
      audioEngineRef.current.playChord(chord);
      // Set the root note of the chord as the last pressed note
      if (chord.length > 0) {
        setLastPressedNote(chord[0].note);
      }
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleKeySelect = (key: string) => {
    setSelectedKey(key);
  };

  const toggleCircleSpin = () => {
    setIsCircleSpinning(!isCircleSpinning);
  };

  const toggleChordMode = () => {
    setChordMode(!chordMode);
  };

  const getChordNotes = (chordName: string): Array<{note: string, octave: number}> => {
    const baseOctave = 4 + octaveShift;
    const chordNote = chordName.replace('m', '');
    const isMinor = chordName.includes('m');

    const majorChords: { [key: string]: Array<{note: string, octave: number}> } = {
      'C': [{note: 'C', octave: baseOctave}, {note: 'E', octave: baseOctave}, {note: 'G', octave: baseOctave}],
      'C#': [{note: 'C#', octave: baseOctave}, {note: 'F', octave: baseOctave}, {note: 'G#', octave: baseOctave}],
      'D': [{note: 'D', octave: baseOctave}, {note: 'F#', octave: baseOctave}, {note: 'A', octave: baseOctave}],
      'D#': [{note: 'D#', octave: baseOctave}, {note: 'G', octave: baseOctave}, {note: 'A#', octave: baseOctave}],
      'E': [{note: 'E', octave: baseOctave}, {note: 'G#', octave: baseOctave}, {note: 'B', octave: baseOctave}],
      'F': [{note: 'F', octave: baseOctave}, {note: 'A', octave: baseOctave}, {note: 'C', octave: baseOctave + 1}],
      'F#': [{note: 'F#', octave: baseOctave}, {note: 'A#', octave: baseOctave}, {note: 'C#', octave: baseOctave + 1}],
      'G': [{note: 'G', octave: baseOctave}, {note: 'B', octave: baseOctave}, {note: 'D', octave: baseOctave + 1}],
      'G#': [{note: 'G#', octave: baseOctave}, {note: 'C', octave: baseOctave + 1}, {note: 'D#', octave: baseOctave + 1}],
      'A': [{note: 'A', octave: baseOctave}, {note: 'C#', octave: baseOctave + 1}, {note: 'E', octave: baseOctave + 1}],
      'A#': [{note: 'A#', octave: baseOctave}, {note: 'D', octave: baseOctave + 1}, {note: 'F', octave: baseOctave + 1}],
      'B': [{note: 'B', octave: baseOctave}, {note: 'D#', octave: baseOctave + 1}, {note: 'F#', octave: baseOctave + 1}],
    };

    const minorChords: { [key: string]: Array<{note: string, octave: number}> } = {
      'C': [{note: 'C', octave: baseOctave}, {note: 'D#', octave: baseOctave}, {note: 'G', octave: baseOctave}],
      'C#': [{note: 'C#', octave: baseOctave}, {note: 'E', octave: baseOctave}, {note: 'G#', octave: baseOctave}],
      'D': [{note: 'D', octave: baseOctave}, {note: 'F', octave: baseOctave}, {note: 'A', octave: baseOctave}],
      'D#': [{note: 'D#', octave: baseOctave}, {note: 'F#', octave: baseOctave}, {note: 'A#', octave: baseOctave}],
      'E': [{note: 'E', octave: baseOctave}, {note: 'G', octave: baseOctave}, {note: 'B', octave: baseOctave}],
      'F': [{note: 'F', octave: baseOctave}, {note: 'G#', octave: baseOctave}, {note: 'C', octave: baseOctave + 1}],
      'F#': [{note: 'F#', octave: baseOctave}, {note: 'A', octave: baseOctave}, {note: 'C#', octave: baseOctave + 1}],
      'G': [{note: 'G', octave: baseOctave}, {note: 'A#', octave: baseOctave}, {note: 'D', octave: baseOctave + 1}],
      'G#': [{note: 'G#', octave: baseOctave}, {note: 'B', octave: baseOctave}, {note: 'D#', octave: baseOctave + 1}],
      'A': [{note: 'A', octave: baseOctave}, {note: 'C', octave: baseOctave + 1}, {note: 'E', octave: baseOctave + 1}],
      'A#': [{note: 'A#', octave: baseOctave}, {note: 'C#', octave: baseOctave + 1}, {note: 'F', octave: baseOctave + 1}],
      'B': [{note: 'B', octave: baseOctave}, {note: 'D', octave: baseOctave + 1}, {note: 'F#', octave: baseOctave + 1}],
    };

    if (isMinor && minorChords[chordNote]) {
      return minorChords[chordNote];
    }

    return majorChords[chordNote] || [];
  };

  const handlePlayProgression = (progression: ChordProgression) => {
    if (progressionIntervalRef.current) {
      clearInterval(progressionIntervalRef.current);
    }

    setActiveProgression(progression);
    setIsPlayingProgression(true);
    setCurrentProgressionIndex(0);

    const beatsPerMeasure = parseInt(progression.timeSignature.split('/')[0]);
    const chordDuration = (60000 / progression.tempo) * beatsPerMeasure;

    let index = 0;

    const playChord = () => {
      if (index >= progression.chords.length) {
        index = 0;
      }

      const chordName = progression.chords[index];
      const chordNotes = getChordNotes(chordName);

      if (audioEngineRef.current && !isMuted && chordNotes.length > 0) {
        audioEngineRef.current.playChord(chordNotes);
        setHighlightedChord(chordName);
        setLastPressedNote(chordNotes[0].note);
      }

      setCurrentProgressionIndex(index);
      index++;
    };

    playChord();
    progressionIntervalRef.current = setInterval(playChord, chordDuration);
  };

  const handleStopProgression = () => {
    if (progressionIntervalRef.current) {
      clearInterval(progressionIntervalRef.current);
      progressionIntervalRef.current = null;
    }
    setIsPlayingProgression(false);
    setHighlightedChord(null);
    setActiveProgression(null);
  };

  useEffect(() => {
    return () => {
      if (progressionIntervalRef.current) {
        clearInterval(progressionIntervalRef.current);
      }
    };
  }, []);

  // Check if the last pressed note is diatonic to the selected key
  const isNonDiatonic = lastPressedNote && selectedKey && !isNoteDiatonic(lastPressedNote, selectedKey);
  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-bg-start via-primary-bg-mid to-primary-bg-end flex items-center justify-center font-roboto">
        <div className="text-center animate-pulse">
          <Piano className="w-24 h-24 text-text-primary mx-auto mb-4 animate-bounce" />
          <h1 className="text-6xl font-bold text-text-primary mb-4 bg-gradient-to-r from-accent-yellow to-accent-orange bg-clip-text text-transparent">
          </h1>
          <h1 className="text-6xl font-bold text-text-primary mb-4 bg-gradient-to-r from-text-primary to-white bg-clip-text text-transparent">
            MATILDA for Music Theory!
          </h1>
          <p className="text-xl text-text-primary/80">Loading your musical experience...</p>
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="w-3 h-3 bg-accent-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-primary-bg-mid rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-accent-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-primary-bg-start via-primary-bg-mid to-primary-bg-end font-roboto text-text-primary ${
      contentReady ? 'animate-fadeInScale' : 'opacity-0'
    }`}>
      {/* Header */}
      <header className="bg-modal-bg backdrop-blur-lg border-b border-white/10 p-4 shadow-lg shadow-shadow-dark">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Piano className="w-8 h-8 text-primary-bg-mid" />
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary bg-gradient-to-r from-primary-bg-mid to-accent-yellow bg-clip-text text-transparent">
            </h1>
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary bg-gradient-to-r from-primary-bg-mid to-text-primary bg-clip-text text-transparent">
              MATILDA Music Theory
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Controls */}
        <Controls
          octaveShift={octaveShift}
          onOctaveChange={setOctaveShift}
          volume={volume}
          onVolumeChange={handleVolumeChange}
          isMuted={isMuted}
          onToggleMute={handleToggleMute}
          chordMode={chordMode}
          onToggleChordMode={toggleChordMode}
        />

        {/* Main Piano */}
        <div className="flex flex-col items-center space-y-4 overflow-x-auto">
          <h2 className="text-2xl font-bold text-text-primary flex items-center space-x-2">
            <Piano className="w-6 h-6" />
            <span className="hidden md:inline">25-Key Piano</span>
            <span className="md:hidden">Piano</span>
          </h2>
          <PianoKeyboard
            onKeyPress={handleKeyPress}
            onChordPress={handleChordPress}
            octaveShift={octaveShift}
            chordMode={chordMode}
            selectedKey={selectedKey}
            keyInfo={keyInfo}
            highlightedChord={highlightedChord}
          />
        </div>

        {/* AI Song Composer */}
        <AISongComposer
          onPlayProgression={handlePlayProgression}
          onStopProgression={handleStopProgression}
          isPlaying={isPlayingProgression}
        />

        {/* Circle of Fifths and Key Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-2xl font-bold text-text-primary flex items-center space-x-2">
              <Music className="w-6 h-6" />
              <span>Interactive Circle of Fifths</span>
            </h2>
            <CircleOfFifths
              onKeySelect={handleKeySelect}
              isSpinning={isCircleSpinning}
              onToggleSpin={toggleCircleSpin}
              selectedKey={selectedKey}
              keyInfo={keyInfo}
            />
          </div>

          {/* Key Information */}
          <div className="space-y-4 lg:col-span-1">
            <h2 className="text-2xl font-bold text-text-primary">Current Musical Key</h2>
            <div className="bg-modal-bg-light backdrop-blur-lg p-6 rounded-2xl border border-white/10 shadow-lg shadow-shadow-dark">
              <div className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-accent-yellow to-accent-orange bg-clip-text text-transparent mb-4">
                  {selectedKey}
                </div>
                <p className="text-text-primary/80">
                  Piano is set to octave {4 + octaveShift} • Volume: {isMuted ? 'Muted' : `${volume}%`} • Mode: {chordMode ? 'Chord' : 'Single Note'}
                </p>
              </div>
            </div>
            
            {/* Non-diatonic note warning */}
            {isNonDiatonic && (
              <div className="bg-red-600/20 border border-red-500 p-4 rounded-2xl shadow-lg shadow-shadow-dark">
                <div className="text-center">
                  <div className="text-red-400 font-bold text-lg mb-2">
                    ⚠️ Non-Diatonic Note
                  </div>
                  <p className="text-red-300 text-sm">
                    <span className="font-semibold">{lastPressedNote}</span> is not in the {selectedKey} scale
                  </p>
                </div>
              </div>
            )}
            
            {/* Chord Information - moved here */}
            <div className="space-y-4">
              <ChordInfo selectedKey={selectedKey} lastPressedNote={lastPressedNote} />
            </div>
          </div>
        </div>

        {/* Beat Machines and Sampler Tabs */}
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 flex-wrap gap-2">
            <button
              onClick={() => setActiveTab('preset')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                activeTab === 'preset'
                  ? 'bg-button-primary text-black shadow-lg shadow-shadow-dark'
                  : 'text-text-primary/70 hover:text-text-primary'
              } shadow-lg shadow-shadow-dark`}
            >
              <Disc className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
              Preset Beats
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                activeTab === 'custom'
                  ? 'bg-button-primary text-black shadow-lg shadow-shadow-dark'
                  : 'text-text-primary/70 hover:text-text-primary'
              } shadow-lg shadow-shadow-dark`}
            >
              <Settings className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
              Custom Sequencer
            </button>
            <button
              onClick={() => setActiveTab('sampler')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-lg font-medium transition-all text-sm md:text-base ${
                activeTab === 'sampler'
                  ? 'bg-button-primary text-black shadow-lg shadow-shadow-dark'
                  : 'text-text-primary/70 hover:text-text-primary'
              } shadow-lg shadow-shadow-dark`}
            >
              <Zap className="w-4 h-4 md:w-5 md:h-5 inline mr-1 md:mr-2" />
              Sample Pads
            </button>
          </div>

          <div className="flex justify-center">
            {/* Beat Machine / Sampler Area */}
            <div className="space-y-4 w-full max-w-4xl">
              {activeTab === 'preset' && (
                <>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary flex items-center justify-center space-x-2">
                    <Disc className="w-6 h-6" />
                    <span>Beat Machine</span>
                  </h2>
                  {audioEngineRef.current && (
                    <BeatMachine audioEngine={audioEngineRef.current} />
                  )}
                </>
              )}
              
              {activeTab === 'custom' && (
                <>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary flex items-center justify-center space-x-2">
                    <Settings className="w-6 h-6" />
                    <span>Custom Beat Sequencer</span>
                  </h2>
                  {audioEngineRef.current && (
                    <CustomBeatMachine audioEngine={audioEngineRef.current} />
                  )}
                </>
              )}
              
              {activeTab === 'sampler' && (
                <>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary flex items-center justify-center space-x-2">
                    <Zap className="w-6 h-6" />
                    <span>8-Pad Sampler</span>
                  </h2>
                  {audioEngineRef.current && (
                    <SamplePads audioEngine={audioEngineRef.current} />
                  )}
                </>
              )}
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}

export default App;