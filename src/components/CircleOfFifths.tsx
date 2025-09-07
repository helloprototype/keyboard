import React, { useState } from 'react';
import { RotateCw, X } from 'lucide-react';
import { KeyInfo, normalizeNote } from '../utils/musicTheoryUtils';

interface CircleOfFifthsProps {
  onKeySelect: (key: string) => void;
  isSpinning: boolean;
  onToggleSpin: () => void;
  selectedKey: string;
  keyInfo: { [key: string]: KeyInfo };
}

const CircleOfFifths: React.FC<CircleOfFifthsProps> = ({ onKeySelect, isSpinning, onToggleSpin, selectedKey, keyInfo }) => {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  
  const majorKeys = ['C', 'G', 'D', 'A', 'E', 'B', 'F#', 'C#', 'G#', 'D#', 'A#', 'F'];
  const minorKeys = ['Am', 'Em', 'Bm', 'F#m', 'C#m', 'G#m', 'D#m', 'A#m', 'Fm', 'Cm', 'Gm', 'Dm'];
  
  const colors = [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD',
    '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8C471', '#82E0AA'
  ];

  const handleKeyClick = (key: string) => {
    onKeySelect(key);
  };

  const handleMouseEnter = (key: string, event: React.MouseEvent) => {
    setHoveredKey(key);
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    setModalPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setHoveredKey(null);
  };

  const getSelectedKeyNotes = () => {
    const info = keyInfo[selectedKey];
    return info ? info.notes : [];
  };

  return (
    <div className="bg-modal-bg p-6 rounded-2xl shadow-2xl shadow-shadow-dark">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onToggleSpin}
          className={`p-2 rounded-lg transition-all ${
            isSpinning 
              ? 'bg-red-600 hover:bg-red-700 text-white' 
              : 'bg-button-primary hover:bg-button-primary/80 text-black'
          } shadow-md shadow-shadow-dark`}
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
            const isSelected = selectedKey === key;
            const isHighlighted = selectedKey && keyInfo[selectedKey]?.notes.includes(key.replace('#', '#'));
            
            return (
              <g key={`major-${key}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="20"
                  fill={isSelected ? '#FFD700' : isHighlighted ? '#FFA500' : colors[index]}
                  stroke={isSelected ? '#C0D9DB' : isHighlighted ? '#CCE0E2' : '#333'}
                  strokeWidth={isSelected || isHighlighted ? '3' : '1'}
                  className="cursor-pointer transition-all hover:stroke-button-primary hover:stroke-2"
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={(e) => handleMouseEnter(key, e)}
                  onMouseLeave={handleMouseLeave}
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
            const baseKey = key.replace('m', '');
            const isSelected = selectedKey === key;
            const isHighlighted = selectedKey && keyInfo[selectedKey]?.notes.includes(baseKey.replace('#', '#'));
            
            return (
              <g key={`minor-${key}`}>
                <circle
                  cx={x}
                  cy={y}
                  r="15"
                  fill={isSelected ? '#FFD700' : isHighlighted ? '#FFA500' : colors[index]}
                  fillOpacity={isSelected || isHighlighted ? "1" : "0.7"}
                  stroke={isSelected ? '#C0D9DB' : isHighlighted ? '#CCE0E2' : '#333'}
                  strokeWidth={isSelected || isHighlighted ? '2' : '1'}
                  className="cursor-pointer transition-all hover:stroke-button-primary hover:stroke-2"
                  onClick={() => handleKeyClick(key)}
                  onMouseEnter={(e) => handleMouseEnter(key, e)}
                  onMouseLeave={handleMouseLeave}
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
            stroke="#C0D9DB"
            strokeWidth="2"
          />
          <text
            x="150"
            y="155"
            textAnchor="middle"
            className="fill-text-primary text-lg font-bold"
          >
            {selectedKey}
          </text>
          
          <defs>
            <radialGradient id="gradient" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#628F92" />
              <stop offset="100%" stopColor="#000000" />
            </radialGradient>
          </defs>
        </svg>
      </div>
      
      {/* Hover Modal */}
      {hoveredKey && keyInfo[hoveredKey] && (
        <div
          className="fixed z-50 bg-modal-bg border border-gray-600 rounded-lg p-4 shadow-xl shadow-shadow-dark max-w-xs"
          style={{
            left: modalPosition.x - 150,
            top: modalPosition.y - 200,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-text-primary">
            <h4 className="font-bold text-lg mb-2 text-accent-yellow">{keyInfo[hoveredKey].major}</h4>
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-semibold text-primary-bg-mid">Scale Notes:</span>
                <div className="text-text-primary/70">{keyInfo[hoveredKey].notes.join(' - ')}</div>
              </div>
              <div>
                <span className="font-semibold text-highlight-green-light">Major Chords:</span>
                <div className="text-text-primary/70">{keyInfo[hoveredKey].chords.major.join(', ')}</div>
              </div>
              <div>
                <span className="font-semibold text-chord-highlight-light">Minor Chords:</span>
                <div className="text-text-primary/70">{keyInfo[hoveredKey].chords.minor.join(', ')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="mt-4 text-center">
        <p className="text-text-primary text-sm mb-2">Selected Key: <span className="font-bold text-accent-yellow">{selectedKey}</span></p>
        {selectedKey && keyInfo[selectedKey] && (
          <div className="bg-modal-bg-light rounded-lg p-3 mt-3 shadow-md shadow-shadow-dark">
            <div className="text-xs text-text-primary/70 space-y-1">
              <div><span className="text-primary-bg-mid font-semibold">Scale:</span> {keyInfo[selectedKey].notes.join(' - ')}</div>
              <div><span className="text-highlight-green-light font-semibold">Major Chords:</span> {keyInfo[selectedKey].chords.major.join(', ')}</div>
              <div><span className="text-chord-highlight-light font-semibold">Minor Chords:</span> {keyInfo[selectedKey].chords.minor.join(', ')}</div>
            </div>
          </div>
        )}
        <div className="flex justify-center space-x-4 text-xs text-text-primary/70 mt-2">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-primary-bg-mid"></div>
            <span>Major Keys (Outer)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-chord-highlight-light"></div>
            <span>Minor Keys (Inner)</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-accent-yellow"></div>
            <span>Selected</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-accent-orange"></div>
            <span>Related</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CircleOfFifths;