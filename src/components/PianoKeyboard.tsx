import React from 'react';
import { KeyInfo, normalizeNote } from '../utils/musicTheoryUtils';

interface PianoKeyboardProps {
  onKeyPress: (note: string, octave: number) => void;
  onChordPress: (chord: Array<{note: string, octave: number}>) => void;
  octaveShift: number;
  chordMode: boolean;
  selectedKey: string;
  keyInfo: { [key: string]: KeyInfo };
  highlightedChord?: string | null;
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ onKeyPress, onChordPress, octaveShift, chordMode, selectedKey, keyInfo, highlightedChord }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];
  
  // Chord definitions for chord mode
  const chords: { [key: string]: Array<{note: string, octave: number}> } = {
    'C': [{note: 'C', octave: 4}, {note: 'E', octave: 4}, {note: 'G', octave: 4}],
    'D': [{note: 'D', octave: 4}, {note: 'F#', octave: 4}, {note: 'A', octave: 4}],
    'E': [{note: 'E', octave: 4}, {note: 'G#', octave: 4}, {note: 'B', octave: 4}],
    'F': [{note: 'F', octave: 4}, {note: 'A', octave: 4}, {note: 'C', octave: 5}],
    'G': [{note: 'G', octave: 4}, {note: 'B', octave: 4}, {note: 'D', octave: 5}],
    'A': [{note: 'A', octave: 4}, {note: 'C#', octave: 5}, {note: 'E', octave: 5}],
    'B': [{note: 'B', octave: 4}, {note: 'D#', octave: 5}, {note: 'F#', octave: 5}],
    'C#': [{note: 'C#', octave: 4}, {note: 'F', octave: 4}, {note: 'G#', octave: 4}],
    'D#': [{note: 'D#', octave: 4}, {note: 'G', octave: 4}, {note: 'A#', octave: 4}],
    'F#': [{note: 'F#', octave: 4}, {note: 'A#', octave: 4}, {note: 'C#', octave: 5}],
    'G#': [{note: 'G#', octave: 4}, {note: 'C', octave: 5}, {note: 'D#', octave: 5}],
    'A#': [{note: 'A#', octave: 4}, {note: 'D', octave: 5}, {note: 'F', octave: 5}],
  };

  // Minor chord definitions
  const minorChords: { [key: string]: Array<{note: string, octave: number}> } = {
    'C': [{note: 'C', octave: 4}, {note: 'Eb', octave: 4}, {note: 'G', octave: 4}],
    'D': [{note: 'D', octave: 4}, {note: 'F', octave: 4}, {note: 'A', octave: 4}],
    'E': [{note: 'E', octave: 4}, {note: 'G', octave: 4}, {note: 'B', octave: 4}],
    'F': [{note: 'F', octave: 4}, {note: 'Ab', octave: 4}, {note: 'C', octave: 5}],
    'G': [{note: 'G', octave: 4}, {note: 'Bb', octave: 4}, {note: 'D', octave: 5}],
    'A': [{note: 'A', octave: 4}, {note: 'C', octave: 5}, {note: 'E', octave: 5}],
    'B': [{note: 'B', octave: 4}, {note: 'D', octave: 5}, {note: 'F#', octave: 5}],
    'C#': [{note: 'C#', octave: 4}, {note: 'E', octave: 4}, {note: 'G#', octave: 4}],
    'D#': [{note: 'D#', octave: 4}, {note: 'F#', octave: 4}, {note: 'A#', octave: 4}],
    'F#': [{note: 'F#', octave: 4}, {note: 'A', octave: 4}, {note: 'C#', octave: 5}],
    'G#': [{note: 'G#', octave: 4}, {note: 'B', octave: 4}, {note: 'D#', octave: 5}],
    'A#': [{note: 'A#', octave: 4}, {note: 'C#', octave: 5}, {note: 'F', octave: 5}],
  };

  // Generate 49 keys starting from C2
  const generateKeys = () => {
    const keys: Array<{ note: string; octave: number; isBlack: boolean; position: number }> = [];
    let keyPosition = 0;
    
    // Always use 25 keys (C3 to C5)
    const totalKeys = 25;
    const startOctave = 3;
    const endOctave = 5;
    
    for (let octave = startOctave; octave <= endOctave; octave++) {
      for (let i = 0; i < whiteKeys.length; i++) {
        // Add white key
        keys.push({
          note: whiteKeys[i],
          octave: octave + octaveShift,
          isBlack: false,
          position: keyPosition
        });
        keyPosition++;
        
        // Add black key if it exists
        if (blackKeys[i] && keys.length < 61) {
          keys.push({
            note: blackKeys[i],
            octave: octave + octaveShift,
            isBlack: true,
            position: keyPosition - 0.5
          });
        }
      }
      
      const whiteKeyCount = keys.filter(k => !k.isBlack).length;
      const targetWhiteKeys = 15; // 15 white keys for 25 total
      if (whiteKeyCount >= targetWhiteKeys) break;
    }
    
    return keys.slice(0, totalKeys);
  };

  const keys = generateKeys();
  const isMobile = window.innerWidth < 768;
  const whiteKeyWidth = isMobile ? 32 : 40;
  const blackKeyWidth = isMobile ? 20 : 24;
  const keyboardHeight = isMobile ? 180 : 220;
  const whiteKeyHeight = isMobile ? 160 : 200;
  const blackKeyHeight = isMobile ? 100 : 130;

  // Check if a note should be highlighted based on selected key
  const isNoteHighlighted = (note: string) => {
    if (!selectedKey || !keyInfo[selectedKey]) return false;

    const selectedKeyNotes = keyInfo[selectedKey].notes.map(normalizeNote);
    const normalizedNote = normalizeNote(note);

    return selectedKeyNotes.includes(normalizedNote);
  };

  // Check if note is part of the highlighted chord from AI
  const isPartOfHighlightedChord = (note: string): boolean => {
    if (!highlightedChord) return false;

    const chordNote = highlightedChord.replace('m', '');
    const isMinor = highlightedChord.includes('m');

    if (isMinor && minorChords[chordNote]) {
      return minorChords[chordNote].some(n => normalizeNote(n.note) === normalizeNote(note));
    }

    if (chords[chordNote]) {
      return chords[chordNote].some(n => normalizeNote(n.note) === normalizeNote(note));
    }

    return false;
  };

  const handleKeyClick = (key: { note: string; octave: number }) => {
    if (chordMode) {
      // Determine if we should play major or minor chord based on selected key and note
      let chordToPlay = chords[key.note];
      
      // If we have a selected key from circle of fifths, use music theory to determine chord type
      if (selectedKey && keyInfo[selectedKey]) {
        const selectedKeyNotes = keyInfo[selectedKey].notes;
        const noteIndex = selectedKeyNotes.indexOf(key.note);
        
        // Basic chord progression logic: I, ii, iii, IV, V, vi, vii°
        if (noteIndex !== -1) {
          const chordTypes = ['major', 'minor', 'minor', 'major', 'major', 'minor', 'diminished'];
          const chordType = chordTypes[noteIndex];
          
          if (chordType === 'minor' && minorChords[key.note]) {
            chordToPlay = minorChords[key.note];
          }
        }
      }
      
      if (chordToPlay) {
        // Adjust chord octave based on octaveShift
        const adjustedChord = chordToPlay.map(note => ({
          ...note,
          octave: note.octave + octaveShift
        }));
        onChordPress(adjustedChord);
      }
    } else {
      onKeyPress(key.note, key.octave);
    }
  };

  return (
    <div className="relative bg-modal-bg p-3 md:p-6 rounded-2xl shadow-2xl shadow-shadow-dark">
      <div className="flex flex-col md:flex-row items-center md:justify-between mb-4">
        <h3 className="text-text-primary text-base md:text-lg font-semibold md:block hidden">{keys.length}-Key Piano</h3>
        <h3 className="text-text-primary text-base font-semibold md:hidden block text-center">{keys.length}-Key Piano</h3>
        <div className="text-xs md:text-sm text-text-primary/70 md:text-right text-center md:flex-1 flex-none mt-2 md:mt-0">
          Mode: <span className="text-accent-yellow font-semibold">{chordMode ? 'Chord' : 'Single Note'}</span>
          {selectedKey && (
            <span className="ml-2 md:ml-4">
              Key: <span className="text-primary-bg-mid font-semibold">{selectedKey}</span>
            </span>
          )}
        </div>
      </div>
      <div 
        className="relative mx-auto overflow-x-auto"
        style={{ 
          width: isMobile ? '100%' : `${Math.ceil(keys.length * 0.6) * whiteKeyWidth}px`, 
          height: `${keyboardHeight}px`,
          maxWidth: isMobile ? '100vw' : 'none'
        }}
      >
        <div 
          className="relative"
          style={{ 
            width: `${Math.ceil(keys.length * 0.6) * whiteKeyWidth}px`, 
            height: `${keyboardHeight}px`,
            minWidth: isMobile ? `${Math.ceil(keys.length * 0.6) * whiteKeyWidth}px` : 'auto'
          }}
        >
        {/* White keys */}
        {keys.filter(key => !key.isBlack).map((key, index) => {
          const isHighlighted = isNoteHighlighted(key.note);
          const isChordHighlighted = isPartOfHighlightedChord(key.note);
          return (
            <button
              key={`${key.note}-${key.octave}-white`}
              className={`absolute border border-gray-300 rounded-b-lg shadow-lg transition-all duration-75 transform hover:scale-y-105 active:scale-y-95 ${
                isChordHighlighted
                  ? 'bg-gradient-to-b from-accent-yellow to-accent-orange hover:from-accent-yellow/80 hover:to-accent-orange/80 active:from-accent-orange active:to-accent-orange/90 ring-4 ring-accent-yellow/50'
                  : isHighlighted
                  ? 'bg-gradient-to-b from-highlight-green-light to-highlight-green-dark hover:from-highlight-green-light/80 hover:to-highlight-green-dark/80 active:from-highlight-green-dark active:to-highlight-green-dark/90'
                  : chordMode && (chords[key.note] || minorChords[key.note])
                  ? 'bg-gradient-to-b from-chord-highlight-light to-chord-highlight-dark hover:from-chord-highlight-light/80 hover:to-chord-highlight-dark/80 active:from-chord-highlight-dark active:to-chord-highlight-dark/90'
                  : 'bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 active:from-gray-200 active:to-gray-300'
              }`}
              style={{
                left: `${index * whiteKeyWidth}px`,
                width: `${whiteKeyWidth - 2}px`,
                height: `${whiteKeyHeight}px`,
                zIndex: 1
              }}
              onMouseDown={() => handleKeyClick(key)}
              onTouchStart={() => handleKeyClick(key)}
            >
              <div className={`absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-xs font-medium ${
                isHighlighted ? 'text-gray-800' : 'text-gray-600'
              }`}>
                {key.note}{key.octave}
              </div>
            </button>
          );
        })}
        
        {/* Black keys */}
        {keys.filter(key => key.isBlack).map((key) => {
          const whiteKeyIndex = keys.filter(k => !k.isBlack && k.position < key.position).length;
          const isHighlighted = isNoteHighlighted(key.note);
          const isChordHighlighted = isPartOfHighlightedChord(key.note);
          return (
            <button
              key={`${key.note}-${key.octave}-black`}
              className={`absolute rounded-b-lg shadow-xl transition-all duration-75 transform hover:scale-y-105 active:scale-y-95 ${
                isChordHighlighted
                  ? 'bg-gradient-to-b from-accent-orange to-accent-yellow hover:from-accent-orange/80 hover:to-accent-yellow/80 active:from-accent-yellow active:to-accent-yellow/90 ring-4 ring-accent-orange/50'
                  : isHighlighted
                  ? 'bg-gradient-to-b from-highlight-green-dark to-highlight-green-dark/80 hover:from-highlight-green-dark/80 hover:to-highlight-green-dark/60 active:from-highlight-green-dark active:to-highlight-green-dark'
                  : chordMode && (chords[key.note] || minorChords[key.note])
                  ? 'bg-gradient-to-b from-chord-highlight-dark to-chord-highlight-dark/80 hover:from-chord-highlight-dark/80 hover:to-chord-highlight-dark/60 active:from-chord-highlight-dark active:to-chord-highlight-dark'
                  : 'bg-gradient-to-b from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 active:from-black active:to-gray-800'
              }`}
              style={{
                left: `${whiteKeyIndex * whiteKeyWidth - blackKeyWidth / 2}px`,
                width: `${blackKeyWidth}px`,
                height: `${blackKeyHeight}px`,
                zIndex: 2
              }}
              onMouseDown={() => handleKeyClick(key)}
              onTouchStart={() => handleKeyClick(key)}
            >
              <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
                {key.note}{key.octave}
              </div>
            </button>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default PianoKeyboard;