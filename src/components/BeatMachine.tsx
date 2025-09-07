import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Circle, Disc, Zap } from 'lucide-react';
import { AudioEngine } from '../utils/audioUtils';

interface BeatMachineProps {
  audioEngine: AudioEngine;
  customSamples?: {
    kick?: AudioBuffer;
    snare?: AudioBuffer;
    hihat?: AudioBuffer;
    crash?: AudioBuffer;
  };
}

const BeatMachine: React.FC<BeatMachineProps> = ({ audioEngine, customSamples }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [uploadedSamples, setUploadedSamples] = useState<{[key: string]: AudioBuffer}>({});

  const beatPatterns = [
    {
      name: "Rock",
      pattern: [
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Kick
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Hi-hat
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Jazz",
      pattern: [
        [1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0], // Kick
        [0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0], // Snare
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0], // Hi-hat
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "EDM",
      pattern: [
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Kick
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Snare
        [1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1], // Hi-hat
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Funk",
      pattern: [
        [1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0], // Kick
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // Snare
        [1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0], // Hi-hat
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Latin",
      pattern: [
        [1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1], // Kick
        [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 0], // Snare
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], // Hi-hat
        [0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Ragga",
      pattern: [
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // Kick
        [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0], // Snare
        [0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1], // Hi-hat
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Hip Hop",
      pattern: [
        [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0], // Kick
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // Snare
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 0], // Hi-hat
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Folk",
      pattern: [
        [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0], // Kick
        [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0], // Snare
        [1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1], // Hi-hat
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    }
  ];

  const drumSounds = ['kick', 'snare', 'hihat', 'crash'] as const;
  const drumNames = ['Kick', 'Snare', 'Hi-hat', 'Crash'];
  const drumIcons = [Circle, Square, Disc, Zap];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      const beatInterval = (60 / bpm / 4) * 1000; // 16th notes
      interval = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = (prev + 1) % 16;
          
          // Play sounds for current beat
          beatPatterns[selectedPattern].pattern.forEach((track, trackIndex) => {
            if (track[prev]) {
              const drumType = drumSounds[trackIndex];
              if (uploadedSamples[drumType]) {
                playCustomSample(uploadedSamples[drumType]);
              } else {
                audioEngine.playDrumSound(drumType);
              }
            }
          });
          
          return nextBeat;
        });
      }, beatInterval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, bpm, selectedPattern, audioEngine]);

  const playCustomSample = (buffer: AudioBuffer) => {
    const source = audioEngine['audioContext'].createBufferSource();
    const gainNode = audioEngine['audioContext'].createGain();
    
    source.buffer = buffer;
    gainNode.gain.value = 0.7;
    
    source.connect(gainNode);
    gainNode.connect(audioEngine['masterGainNode']);
    
    source.start();
  };

  const handleSampleUpload = async (drumType: string, file: File) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioEngine['audioContext'].decodeAudioData(arrayBuffer);
      setUploadedSamples(prev => ({ ...prev, [drumType]: audioBuffer }));
    } catch (error) {
      console.error('Error loading sample:', error);
      alert('Failed to load audio sample');
    }
  };

  const removeSample = (drumType: string) => {
    setUploadedSamples(prev => {
      const newSamples = { ...prev };
      delete newSamples[drumType];
      return newSamples;
    });
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stopBeat = () => {
    setIsPlaying(false);
    setCurrentBeat(0);
  };

  return (
    <div className="bg-modal-bg p-6 rounded-2xl shadow-2xl shadow-shadow-dark border border-gray-700 flex flex-col items-center">
      <div className="flex items-center justify-center mb-6">
        <div className="flex flex-col items-center space-y-4 md:flex-row md:space-x-4 md:space-y-0">
          <div className="flex items-center space-x-2">
            <label className="text-text-primary text-sm">BPM:</label>
            <input
              type="range"
              min="80"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-text-primary text-sm w-8">{bpm}</span>
          </div>
          <button
            onClick={togglePlay}
            className="bg-button-primary hover:bg-button-primary/80 text-black p-2 rounded-lg transition-colors shadow-md shadow-shadow-dark"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={stopBeat}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors shadow-md shadow-shadow-dark"
          >
            <Square size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        {beatPatterns.map((pattern, index) => (
          <button
            key={index}
            onClick={() => setSelectedPattern(index)}
            className={`p-3 rounded-lg text-sm font-medium transition-all ${
              selectedPattern === index
                ? 'bg-primary-bg-mid text-text-primary shadow-lg shadow-shadow-dark'
                : 'text-text-primary/70 hover:text-text-primary'
            } shadow-md shadow-shadow-dark`}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      {/* Sample Upload Section */}
      <div className="mb-6 p-4 bg-modal-bg-light rounded-lg shadow-md shadow-shadow-dark">
        <h4 className="text-text-primary font-medium mb-3">Custom Drum Samples</h4>
        <div className="grid grid-cols-4 gap-3">
          {drumNames.map((drumName, index) => {
            const drumType = drumSounds[index];
            const hasCustomSample = uploadedSamples[drumType];
            
            return (
              <div key={drumType} className="text-center">
                <div className="text-text-primary text-sm mb-2">{drumName}</div>
                <div className="flex flex-col space-y-2">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleSampleUpload(drumType, file);
                    }}
                    className="hidden"
                    id={`sample-${drumType}`}
                  />
                  <label
                    htmlFor={`sample-${drumType}`}
                    className={`px-3 py-2 rounded text-xs cursor-pointer transition-colors ${
                      hasCustomSample
                        ? 'bg-primary-bg-mid hover:bg-primary-bg-mid/80 text-text-primary'
                        : 'bg-button-primary hover:bg-button-primary/80 text-black'
                    } shadow-md shadow-shadow-dark`}
                  >
                    {hasCustomSample ? 'Custom' : 'Upload'}
                  </label>
                  {hasCustomSample && (
                    <button
                      onClick={() => removeSample(drumType)}
                      className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-xs transition-colors shadow-md shadow-shadow-dark"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full">
        <div className="space-y-3 overflow-x-auto md:flex md:flex-col md:items-center">
          {drumNames.map((drumName, trackIndex) => {
            const IconComponent = drumIcons[trackIndex];
            return (
              <div key={drumName} className="flex items-center space-x-1">
                <div className="w-10 flex items-center justify-center text-text-primary text-sm font-medium flex-shrink-0">
                  <IconComponent size={20} />
                </div>
                <div className="flex space-x-1 flex-nowrap min-w-0">
                  {Array.from({ length: 16 }, (_, beatIndex) => (
                    <div
                      key={beatIndex}
                      className={`w-6 h-6 rounded border-2 transition-all flex-shrink-0 ${
                        beatPatterns[selectedPattern].pattern[trackIndex][beatIndex]
                          ? currentBeat === beatIndex
                            ? 'bg-accent-yellow border-accent-yellow/80'
                            : 'bg-primary-bg-mid border-primary-bg-mid/80'
                          : currentBeat === beatIndex
                          ? 'bg-gray-600 border-gray-400'
                          : 'bg-gray-800 border-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BeatMachine;