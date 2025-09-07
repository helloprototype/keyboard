import React, { useState } from 'react';
import { RotateCw } from 'lucide-react';

interface CircleOfFifthsProps {
  onKeySelect: (key: string) => void;
  isSpinning: boolean;
  onToggleSpin: () => void;
}

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({ onKeySelect, isSpinning, onToggleSpin }) => {
  const [selectedKey, setSelectedKey] = useState('C');
  
  const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
  const minorKeys = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m', 'Fm', 'Cm', 'Gm', 'Dm'];
  
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ];

  const handleKeyClick = (key: string, index: number) => {
    setSelectedKey(key);
    onKeySelect(key);
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-indigo-900 p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-2xl font-bold text-white">Circle of Fifths</h3>
        <button
          onClick={onToggleSpin}
          className={`p-2 rounded-lg transition-all ${
            isSpinning 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <RotateCw size={20} className={isSpinning ? 'animate-spin' : ''} />
        </button>
      </div>
      
      <div className="relative w-80 h-80 mx-auto">
        <svg
          viewBox="0 0 300 300"
          className={`w-full h-full ${isSpinning ? 'animate-spin' : ''}`}
          style={{ animationDuration: '10s' }}
        >
          {/* Outer circle (Major keys) */}
          {majorKeys.map((key, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = 150 + 110 * Math.cos(angle);
            const y = 150 + 110 * Math.sin(angle);
            
            return (
              <g key={`major-${key}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  fill={colors[index]}
                  stroke={selectedKey === key ? '#fff' : '#333'}
                  strokeWidth={selectedKey === key ? '3' : '1'}
                  className="cursor-pointer transition-all hover:stroke-white hover:stroke-2"
                  onClick={() => handleKeyClick(key, index)}
                />
                <text
                  x={x}
                  y={y + 5}
                  textAnchor="middle"
                  className="fill-white text-sm font-bold pointer-events-none"
                >
                  {key}
                </text>
              </g>
            );
          })}
          
          {/* Inner circle (Minor keys) */}
          {minorKeys.map((key, index) => {
            const angle = (index * 30 - 90) * (Math.PI / 180);
            const x = 150 + 65 * Math.cos(angle);
            const y = 150 + 65 * Math.sin(angle);
            
            return (
              <g key={`minor-${key}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="15"
                  fill={colors[index]}
                  fillOpacity="0.7"
                  stroke={selectedKey === key ? '#fff' : '#333'}
                  strokeWidth={selectedKey === key ? '2' : '1'}
                  className="cursor-pointer transition-all hover:stroke-white hover:stroke-2"
                  onClick={() => handleKeyClick(key, index)}
                />
                <text
                  x={x}
                  y={y + 3}
                  textAnchor="middle"
                  className="fill-white text-xs font-bold pointer-events-none"
                >
                  {key}
                </text>
              </g>
            );
          })}
          
          {/* Center circle */}
          <circle
            cx="150"
            cy="150"
            r="25"
            fill="url(#gradient)"
            stroke="#fff"
            strokeWidth="2"
          />
          <text
            x="150"
            y="155"
            textAnchor="middle"
            className="fill-white text-lg font-bold"
          >
            {selectedKey}
          </text>
          
          <defs>
            <radialGradient id="gradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#667eea" />
              <stop offset="100%" stopColor="#764ba2" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-white text-sm mb-2">Selected Key: <span className="font-bold text-yellow-300">{selectedKey}</span></p>
        <div className="flex justify-center space-x-4 text-xs text-gray-300">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Major Keys (Outer)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-300"></div>
            <span>Minor Keys (Inner)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleOfFifths;