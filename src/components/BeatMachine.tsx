import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { AudioEngine } from '../utils/audioUtils';

interface BeatMachineProps {
  audioEngine: AudioEngine;
}

const BeatMachine: React.FC<BeatMachineProps> = ({ audioEngine }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [selectedPattern, setSelectedPattern] = useState(0);
  const [bpm, setBpm] = useState(120);

  const beatPatterns = [
    {
      name: "Basic Rock",
      pattern: [
        [1, 0, 1, 0, 1, 0, 1, 0], // Kick
        [0, 0, 1, 0, 0, 0, 1, 0], // Snare
        [1, 1, 1, 1, 1, 1, 1, 1], // Hi-hat
        [0, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Jazz Swing",
      pattern: [
        [1, 0, 0, 1, 0, 0, 1, 0], // Kick
        [0, 0, 1, 0, 0, 1, 0, 0], // Snare
        [1, 0, 1, 1, 0, 1, 1, 0], // Hi-hat
        [1, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Electronic",
      pattern: [
        [1, 0, 1, 0, 1, 0, 1, 0], // Kick
        [0, 1, 0, 1, 0, 1, 0, 1], // Snare
        [1, 1, 0, 1, 1, 0, 1, 1], // Hi-hat
        [0, 0, 0, 0, 1, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Funk Groove",
      pattern: [
        [1, 0, 0, 1, 0, 1, 0, 0], // Kick
        [0, 0, 1, 0, 0, 0, 1, 0], // Snare
        [1, 1, 1, 0, 1, 1, 1, 0], // Hi-hat
        [0, 0, 0, 0, 0, 0, 0, 1]  // Crash
      ]
    },
    {
      name: "Latin",
      pattern: [
        [1, 0, 1, 0, 0, 1, 0, 1], // Kick
        [0, 1, 0, 0, 1, 0, 1, 0], // Snare
        [1, 1, 1, 1, 1, 1, 1, 1], // Hi-hat
        [0, 0, 0, 1, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Reggae",
      pattern: [
        [0, 0, 1, 0, 0, 0, 1, 0], // Kick
        [0, 0, 0, 0, 1, 0, 0, 0], // Snare
        [0, 1, 0, 1, 0, 1, 0, 1], // Hi-hat
        [0, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    },
    {
      name: "Hip Hop",
      pattern: [
        [1, 0, 0, 0, 1, 0, 0, 0], // Kick
        [0, 0, 1, 0, 0, 0, 1, 0], // Snare
        [1, 0, 1, 1, 0, 1, 1, 0], // Hi-hat
        [0, 0, 0, 0, 0, 0, 0, 1]  // Crash
      ]
    },
    {
      name: "Country",
      pattern: [
        [1, 0, 1, 0, 1, 0, 1, 0], // Kick
        [0, 0, 1, 0, 0, 0, 1, 0], // Snare
        [1, 1, 0, 1, 1, 1, 0, 1], // Hi-hat
        [1, 0, 0, 0, 0, 0, 0, 0]  // Crash
      ]
    }
  ];

  const drumSounds = ['kick', 'snare', 'hihat', 'crash'] as const;
  const drumNames = ['Kick', 'Snare', 'Hi-hat', 'Crash'];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      const beatInterval = (60 / bpm / 2) * 1000; // 8th notes
      interval = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = (prev + 1) % 8;
          
          // Play sounds for current beat
          beatPatterns[selectedPattern].pattern.forEach((track, trackIndex) => {
            if (track[prev]) {
              audioEngine.playDrumSound(drumSounds[trackIndex]);
            }
          });
          
          return nextBeat;
        });
      }, beatInterval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, bpm, selectedPattern, audioEngine]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const stopBeat = () => {
    setIsPlaying(false);
    setCurrentBeat(0);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Beat Machine</h3>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label className="text-white text-sm">BPM:</label>
            <input
              type="range"
              min="80"
              max="180"
              value={bpm}
              onChange={(e) => setBpm(Number(e.target.value))}
              className="w-20"
            />
            <span className="text-white text-sm w-8">{bpm}</span>
          </div>
          <button
            onClick={togglePlay}
            className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={stopBeat}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-colors"
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
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {pattern.name}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {drumNames.map((drumName, trackIndex) => (
          <div key={drumName} className="flex items-center space-x-2">
            <div className="w-16 text-white text-sm font-medium">{drumName}</div>
            <div className="flex space-x-1">
              {Array.from({ length: 8 }, (_, beatIndex) => (
                <div
                  key={beatIndex}
                  className={`w-8 h-8 rounded border-2 transition-all ${
                    beatPatterns[selectedPattern].pattern[trackIndex][beatIndex]
                      ? currentBeat === beatIndex
                        ? 'bg-yellow-400 border-yellow-300'
                        : 'bg-blue-500 border-blue-400'
                      : currentBeat === beatIndex
                      ? 'bg-gray-600 border-gray-400'
                      : 'bg-gray-800 border-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeatMachine;