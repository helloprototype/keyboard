import React from 'react';
import { Volume2, VolumeX, ChevronUp, ChevronDown } from 'lucide-react';

interface ControlsProps {
  octaveShift: number;
  onOctaveChange: (shift: number) => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
  isMuted: boolean;
  onToggleMute: () => void;
  chordMode: boolean;
  onToggleChordMode: () => void;
}

const Controls: React.FC<ControlsProps> = ({
  octaveShift,
  onOctaveChange,
  volume,
  onVolumeChange,
  isMuted,
  onToggleMute,
  chordMode,
  onToggleChordMode
}) => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-6 rounded-2xl shadow-lg">
      <div className="flex items-center justify-between space-x-6">
        {/* Octave Controls */}
        <div className="flex flex-col items-center space-y-2">
          <h4 className="text-white text-sm font-medium">Octave Shift</h4>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onOctaveChange(octaveShift - 1)}
              disabled={octaveShift <= -2}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <ChevronDown size={16} />
            </button>
            <div className="bg-gray-900 text-white px-4 py-2 rounded-lg min-w-[3rem] text-center font-mono">
              {octaveShift > 0 ? `+${octaveShift}` : octaveShift}
            </div>
            <button
              onClick={() => onOctaveChange(octaveShift + 1)}
              disabled={octaveShift >= 2}
              className="p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>

        {/* Chord Mode Toggle */}
        <div className="flex flex-col items-center space-y-2">
          <h4 className="text-white text-sm font-medium">Play Mode</h4>
          <button
            onClick={onToggleChordMode}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              chordMode
                ? 'bg-purple-600 hover:bg-purple-700 text-white'
                : 'bg-gray-600 hover:bg-gray-500 text-white'
            }`}
          >
            {chordMode ? 'Chords' : 'Single'}
          </button>
        </div>

        {/* Volume Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1">
          <h4 className="text-white text-sm font-medium">Master Volume</h4>
          <div className="flex items-center space-x-4 w-full max-w-xs">
            <button
              onClick={onToggleMute}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={(e) => onVolumeChange(Number(e.target.value))}
              className="flex-1 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="text-white text-sm min-w-[3rem] text-right">
              {isMuted ? '0' : volume}%
            </div>
          </div>
        </div>

        {/* Current Key Display */}
        <div className="flex flex-col items-center space-y-2">
          <h4 className="text-white text-sm font-medium">Base Octave</h4>
          <div className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-mono">
            C{4 + octaveShift}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;