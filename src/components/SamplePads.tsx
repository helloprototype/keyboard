import React, { useState, useRef } from 'react';
import { Upload, X, Play, Volume2 } from 'lucide-react';
import { AudioEngine } from '../utils/audioUtils';

interface SamplePadsProps {
  audioEngine: AudioEngine;
}

const SamplePads: React.FC<SamplePadsProps> = ({ audioEngine }) => {
  const [sampleNames, setSampleNames] = useState<{ [key: number]: string }>({});
  const [isLoading, setIsLoading] = useState<{ [key: number]: boolean }>({});
  const fileInputRefs = useRef<{ [key: number]: HTMLInputElement | null }>({});

  // Keyboard mapping for pads (Q, W, E, R, T, Y, U, I)
  const keyboardMap = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I'];

  React.useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();
      const padIndex = keyboardMap.indexOf(key);
      if (padIndex !== -1 && audioEngine.hasSample(padIndex)) {
        audioEngine.playSample(padIndex);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [audioEngine]);

  const handleFileUpload = async (padIndex: number, file: File) => {
    if (!file.type.startsWith('audio/')) {
      alert('Please select an audio file');
      return;
    }

    setIsLoading(prev => ({ ...prev, [padIndex]: true }));
    
    try {
      await audioEngine.loadSample(file, padIndex);
      setSampleNames(prev => ({ ...prev, [padIndex]: file.name }));
    } catch (error) {
      alert('Failed to load audio sample');
    } finally {
      setIsLoading(prev => ({ ...prev, [padIndex]: false }));
    }
  };

  const handlePadClick = (padIndex: number) => {
    if (audioEngine.hasSample(padIndex)) {
      audioEngine.playSample(padIndex);
    } else {
      fileInputRefs.current[padIndex]?.click();
    }
  };

  const removeSample = (padIndex: number) => {
    audioEngine.removeSample(padIndex);
    setSampleNames(prev => {
      const newNames = { ...prev };
      delete newNames[padIndex];
      return newNames;
    });
  };

  const colors = [
    'from-red-500 to-red-600',
    'from-orange-500 to-orange-600',
    'from-yellow-500 to-yellow-600',
    'from-green-500 to-green-600',
    'from-blue-500 to-blue-600',
    'from-indigo-500 to-indigo-600',
    'from-purple-500 to-purple-600',
    'from-pink-500 to-pink-600'
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black p-6 rounded-2xl shadow-2xl border border-gray-700">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">8-Pad Sampler</h3>
        <div className="text-sm text-gray-400">
          Use keyboard keys: {keyboardMap.join(', ')}
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 8 }, (_, index) => (
          <div key={index} className="relative">
            <input
              ref={el => fileInputRefs.current[index] = el}
              type="file"
              accept="audio/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(index, file);
              }}
            />
            
            <button
              onClick={() => handlePadClick(index)}
              disabled={isLoading[index]}
              className={`w-full h-24 rounded-xl bg-gradient-to-br ${colors[index]} 
                hover:scale-105 active:scale-95 transition-all duration-150 
                shadow-lg hover:shadow-xl relative overflow-hidden
                ${isLoading[index] ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                ${audioEngine.hasSample(index) ? 'ring-2 ring-white/30' : ''}
              `}
            >
              {isLoading[index] ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : audioEngine.hasSample(index) ? (
                <div className="flex flex-col items-center justify-center h-full p-2">
                  <Play className="w-6 h-6 text-white mb-1" />
                  <div className="text-xs text-white font-medium text-center truncate w-full">
                    {sampleNames[index]?.replace(/\.[^/.]+$/, "")}
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full">
                  <Upload className="w-6 h-6 text-white mb-1" />
                  <div className="text-xs text-white">Upload</div>
                </div>
              )}
              
              {/* Keyboard key indicator */}
              <div className="absolute top-1 left-1 bg-black/50 text-white text-xs px-1 py-0.5 rounded">
                {keyboardMap[index]}
              </div>
              
              {/* Remove button */}
              {audioEngine.hasSample(index) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSample(index);
                  }}
                  className="absolute top-1 right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                >
                  <X size={12} />
                </button>
              )}
            </button>
            
            <div className="text-center mt-2">
              <div className="text-white text-sm font-medium">Pad {index + 1}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gray-800/50 rounded-lg">
        <h4 className="text-white font-medium mb-2">Instructions:</h4>
        <ul className="text-gray-300 text-sm space-y-1">
          <li>• Click empty pads to upload audio samples</li>
          <li>• Click loaded pads or use keyboard keys (Q-I) to play samples</li>
          <li>• Supports WAV, MP3, and other audio formats</li>
          <li>• Use the X button to remove samples</li>
        </ul>
      </div>
    </div>
  );
};

export default SamplePads;