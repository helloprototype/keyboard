import React, { useState, useEffect, useRef } from 'react';
import { Music, Disc, Piano, Zap, Settings } from 'lucide-react';
import PianoKeyboard from './components/PianoKeyboard';
import BeatMachine from './components/BeatMachine';
import SamplePads from './components/SamplePads';
import CustomBeatMachine from './components/CustomBeatMachine';
import CircleOfFifths from './components/CircleOfFifths';
import Controls from './components/Controls';
import { AudioEngine } from './utils/audioUtils';

function App() {
  const [octaveShift, setOctaveShift] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isMuted, setIsMuted] = useState(false);
  const [chordMode, setChordMode] = useState(false);
  const [selectedKey, setSelectedKey] = useState('C');
  const [isCircleSpinning, setIsCircleSpinning] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState<'preset' | 'custom' | 'sampler'>('preset');
  
  const audioEngineRef = useRef<AudioEngine | null>(null);

  useEffect(() => {
    audioEngineRef.current = new AudioEngine();
    
    // Hide welcome after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleKeyPress = (note: string, octave: number) => {
    if (audioEngineRef.current && !isMuted) {
      audioEngineRef.current.playNote(note, octave);
    }
  };

  const handleChordPress = (chord: Array<{note: string, octave: number}>) => {
    if (audioEngineRef.current && !isMuted) {
      audioEngineRef.current.playChord(chord);
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

  if (showWelcome) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center animate-pulse">
          <Piano className="w-24 h-24 text-white mx-auto mb-4 animate-bounce" />
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Piano Master
          </h1>
          <p className="text-xl text-purple-200">Loading your musical experience...</p>
          <div className="flex items-center justify-center mt-8 space-x-4">
            <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
            <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Piano className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Piano Master Studio
            </h1>
          </div>
          <div className="flex items-center space-x-2 text-purple-200">
            <Music className="w-5 h-5" />
            <span className="text-sm">Professional Music Creation Suite</span>
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
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Piano className="w-6 h-6" />
            <span>49-Key Professional Piano</span>
          </h2>
          <PianoKeyboard 
            onKeyPress={handleKeyPress} 
            onChordPress={handleChordPress}
            octaveShift={octaveShift} 
            chordMode={chordMode}
          />
        </div>

        {/* Beat Machines and Sampler Tabs */}
        <div className="space-y-6">
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={() => setActiveTab('preset')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'preset'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Disc className="w-5 h-5 inline mr-2" />
              Preset Beats
            </button>
            <button
              onClick={() => setActiveTab('custom')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'custom'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Settings className="w-5 h-5 inline mr-2" />
              Custom Sequencer
            </button>
            <button
              onClick={() => setActiveTab('sampler')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'sampler'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Zap className="w-5 h-5 inline mr-2" />
              Sample Pads
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Beat Machine / Sampler Area */}
            <div className="space-y-4">
              {activeTab === 'preset' && (
                <>
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <Disc className="w-6 h-6" />
                    <span>8-Pattern Beat Machine</span>
                  </h2>
                  {audioEngineRef.current && (
                    <BeatMachine audioEngine={audioEngineRef.current} />
                  )}
                </>
              )}
              
              {activeTab === 'custom' && (
                <>
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
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
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <Zap className="w-6 h-6" />
                    <span>8-Pad Sampler</span>
                  </h2>
                  {audioEngineRef.current && (
                    <SamplePads audioEngine={audioEngineRef.current} />
                  )}
                </>
              )}
            </div>

            {/* Circle of Fifths */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                <Music className="w-6 h-6" />
                <span>Interactive Circle of Fifths</span>
              </h2>
              <CircleOfFifths
                onKeySelect={handleKeySelect}
                isSpinning={isCircleSpinning}
                onToggleSpin={toggleCircleSpin}
              />
            </div>
          </div>
        </div>

        {/* Key Information */}
        <div className="bg-gradient-to-r from-purple-800/50 to-pink-800/50 backdrop-blur-lg p-6 rounded-2xl border border-white/10">
          <div className="text-center">
            <h3 className="text-xl font-bold text-white mb-2">Current Musical Key</h3>
            <div className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              {selectedKey}
            </div>
            <p className="text-purple-200 mt-2">
              Piano is set to octave {4 + octaveShift} • Volume: {isMuted ? 'Muted' : `${volume}%`} • Mode: {chordMode ? 'Chord' : 'Single Note'}
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black/30 backdrop-blur-lg border-t border-white/10 p-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-purple-200">
            Professional piano with 49 keys, chord support, custom beat sequencer, sample pads, and interactive music theory tools
          </p>
          <div className="flex justify-center items-center space-x-4 mt-2 text-sm text-purple-300">
            <span>🎹 Real-time audio synthesis</span>
            <span>🥁 Dynamic beat patterns</span>
            <span>🎵 Chord playing mode</span>
            <span>🔊 Custom sample pads</span>
            <span>🎵 Music theory visualization</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;