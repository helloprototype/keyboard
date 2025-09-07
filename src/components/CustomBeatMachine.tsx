import React, { useState, useEffect } from 'react';
import { Play, Pause, Square, Save, Plus, Trash2 } from 'lucide-react';
import { AudioEngine } from '../utils/audioUtils';

interface CustomBeatMachineProps {
  audioEngine: AudioEngine;
}

interface BeatPattern {
  id: string;
  name: string;
  pattern: number[][];
}

const CustomBeatMachine: React.FC<CustomBeatMachineProps> = ({ audioEngine }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [bpm, setBpm] = useState(120);
  const [customPatterns, setCustomPatterns] = useState<BeatPattern[]>([]);
  const [selectedPattern, setSelectedPattern] = useState<BeatPattern | null>(null);
  const [editingPattern, setEditingPattern] = useState<number[][]>([
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Kick
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Snare
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // Hi-hat
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]  // Crash
  ]);
  const [patternName, setPatternName] = useState('');

  const drumSounds = ['kick', 'snare', 'hihat', 'crash'] as const;
  const drumNames = ['Kick', 'Snare', 'Hi-hat', 'Crash'];

  // Load patterns from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('customBeatPatterns');
    if (saved) {
      try {
        const patterns = JSON.parse(saved);
        setCustomPatterns(patterns);
      } catch (error) {
        console.error('Failed to load saved patterns:', error);
      }
    }
  }, []);

  // Save patterns to localStorage
  const savePatterns = (patterns: BeatPattern[]) => {
    localStorage.setItem('customBeatPatterns', JSON.stringify(patterns));
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying && selectedPattern) {
      const beatInterval = (60 / bpm / 4) * 1000; // 16th notes
      interval = setInterval(() => {
        setCurrentBeat((prev) => {
          const nextBeat = (prev + 1) % 16;
          
          // Play sounds for current beat
          selectedPattern.pattern.forEach((track, trackIndex) => {
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

  const toggleStep = (trackIndex: number, stepIndex: number) => {
    setEditingPattern(prev => {
      const newPattern = [...prev];
      newPattern[trackIndex] = [...newPattern[trackIndex]];
      newPattern[trackIndex][stepIndex] = newPattern[trackIndex][stepIndex] ? 0 : 1;
      return newPattern;
    });
  };

  const savePattern = () => {
    if (!patternName.trim()) {
      alert('Please enter a pattern name');
      return;
    }

    const newPattern: BeatPattern = {
      id: Date.now().toString(),
      name: patternName.trim(),
      pattern: editingPattern.map(track => [...track])
    };

    const updatedPatterns = [...customPatterns, newPattern];
    setCustomPatterns(updatedPatterns);
    savePatterns(updatedPatterns);
    setPatternName('');
    alert('Pattern saved successfully!');
  };

  const loadPattern = (pattern: BeatPattern) => {
    setSelectedPattern(pattern);
    setEditingPattern(pattern.pattern.map(track => [...track]));
    setIsPlaying(false);
    setCurrentBeat(0);
  };

  const deletePattern = (patternId: string) => {
    if (confirm('Are you sure you want to delete this pattern?')) {
      const updatedPatterns = customPatterns.filter(p => p.id !== patternId);
      setCustomPatterns(updatedPatterns);
      savePatterns(updatedPatterns);
      
      if (selectedPattern?.id === patternId) {
        setSelectedPattern(null);
      }
    }
  };

  const clearPattern = () => {
    setEditingPattern([
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]);
    setSelectedPattern(null);
  };

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">Custom Beat Sequencer</h3>
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
            disabled={!selectedPattern}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
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

      {/* Pattern Editor */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-white text-lg font-semibold">Pattern Editor</h4>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={patternName}
              onChange={(e) => setPatternName(e.target.value)}
              placeholder="Pattern name..."
              className="bg-gray-800 text-white px-3 py-1 rounded text-sm"
            />
            <button
              onClick={savePattern}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition-colors"
            >
              <Save size={16} />
            </button>
            <button
              onClick={clearPattern}
              className="bg-gray-600 hover:bg-gray-700 text-white p-2 rounded transition-colors"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {/* Beat numbers */}
          <div className="flex items-center space-x-1 ml-20">
            {Array.from({ length: 16 }, (_, i) => (
              <div
                key={i}
                className={`w-6 h-6 flex items-center justify-center text-xs rounded ${
                  currentBeat === i ? 'bg-yellow-500 text-black' : 'bg-gray-700 text-gray-300'
                }`}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Drum tracks */}
          {drumNames.map((drumName, trackIndex) => (
            <div key={drumName} className="flex items-center space-x-1">
              <div className="w-16 text-white text-sm font-medium">{drumName}</div>
              <div className="flex space-x-1">
                {Array.from({ length: 16 }, (_, stepIndex) => (
                  <button
                    key={stepIndex}
                    onClick={() => toggleStep(trackIndex, stepIndex)}
                    className={`w-6 h-6 rounded border transition-all ${
                      editingPattern[trackIndex][stepIndex]
                        ? currentBeat === stepIndex && selectedPattern
                          ? 'bg-yellow-400 border-yellow-300'
                          : 'bg-blue-500 border-blue-400'
                        : currentBeat === stepIndex && selectedPattern
                        ? 'bg-gray-600 border-gray-400'
                        : 'bg-gray-800 border-gray-600 hover:bg-gray-700'
                    }`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Saved Patterns */}
      <div>
        <h4 className="text-white text-lg font-semibold mb-4">Saved Patterns</h4>
        {customPatterns.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            No saved patterns. Create your first pattern above!
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {customPatterns.map((pattern) => (
              <div
                key={pattern.id}
                className={`p-3 rounded-lg border transition-all cursor-pointer ${
                  selectedPattern?.id === pattern.id
                    ? 'bg-blue-600 border-blue-400 text-white'
                    : 'bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
                onClick={() => loadPattern(pattern)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium truncate">{pattern.name}</span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePattern(pattern.id);
                    }}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomBeatMachine;