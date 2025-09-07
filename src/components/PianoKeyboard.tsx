import React from 'react';

interface PianoKeyboardProps {
  onKeyPress: (note: string, octave: number) => void;
  onChordPress: (chord: Array<{note: string, octave: number}>) => void;
  octaveShift: number;
  chordMode: boolean;
}

const PianoKeyboard: React.FC<PianoKeyboardProps> = ({ onKeyPress, onChordPress, octaveShift, chordMode }) => {
  const whiteKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
  const blackKeys = ['C#', 'D#', null, 'F#', 'G#', 'A#', null];
  
  // Chord definitions
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

  // Generate 49 keys starting from C2
  const generateKeys = () => {
    const keys: Array<{ note: string; octave: number; isBlack: boolean; position: number }> = [];
    let keyPosition = 0;
    
    // Start from C2 and go to C6 (49 keys total)
    for (let octave = 2; octave <= 5; octave++) {
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
      
      if (keys.filter(k => !k.isBlack).length >= 29) break; // 29 white keys for 49 total
    }
    
    return keys.slice(0, 49);
  };

  const keys = generateKeys();
  const whiteKeyWidth = 40;
  const blackKeyWidth = 24;

  const handleKeyClick = (key: { note: string; octave: number }) => {
    if (chordMode) {
      const chordNotes = chords[key.note];
      if (chordNotes) {
        // Adjust chord octave based on octaveShift
        const adjustedChord = chordNotes.map(note => ({
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
    <div className="relative bg-gradient-to-b from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-white text-lg font-semibold">49-Key Piano</h3>
        <div className="text-sm text-gray-300">
          Mode: <span className="text-yellow-300 font-semibold">{chordMode ? 'Chord' : 'Single Note'}</span>
        </div>
      </div>
      <div className="relative" style={{ width: `${Math.ceil(49 * 0.6) * whiteKeyWidth}px`, height: '220px' }}>
        {/* White keys */}
        {keys.filter(key => !key.isBlack).map((key, index) => (
          <button
            key={`${key.note}-${key.octave}-white`}
            className={`absolute border border-gray-300 rounded-b-lg shadow-lg transition-all duration-75 transform hover:scale-y-105 active:scale-y-95 ${
              chordMode && chords[key.note] 
                ? 'bg-gradient-to-b from-blue-100 to-blue-200 hover:from-blue-50 hover:to-blue-150 active:from-blue-200 active:to-blue-300'
                : 'bg-gradient-to-b from-white to-gray-100 hover:from-gray-50 hover:to-gray-200 active:from-gray-200 active:to-gray-300'
            }`}
            style={{
              left: `${index * whiteKeyWidth}px`,
              width: `${whiteKeyWidth - 2}px`,
              height: '200px',
              zIndex: 1
            }}
            onMouseDown={() => handleKeyClick(key)}
            onTouchStart={() => handleKeyClick(key)}
          >
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 font-medium">
              {key.note}{key.octave}
            </div>
          </button>
        ))}
        
        {/* Black keys */}
        {keys.filter(key => key.isBlack).map((key) => {
          const whiteKeyIndex = keys.filter(k => !k.isBlack && k.position < key.position).length;
          return (
            <button
              key={`${key.note}-${key.octave}-black`}
              className={`absolute rounded-b-lg shadow-xl transition-all duration-75 transform hover:scale-y-105 active:scale-y-95 ${
                chordMode && chords[key.note]
                  ? 'bg-gradient-to-b from-blue-800 to-blue-900 hover:from-blue-700 hover:to-blue-800 active:from-blue-900 active:to-blue-800'
                  : 'bg-gradient-to-b from-gray-800 to-black hover:from-gray-700 hover:to-gray-900 active:from-black active:to-gray-800'
              }`}
              style={{
                left: `${whiteKeyIndex * whiteKeyWidth - blackKeyWidth / 2}px`,
                width: `${blackKeyWidth}px`,
                height: '130px',
                zIndex: 2
              }}
              onMouseDown={() => handleKeyClick(key)}
              onTouchStart={() => handleKeyClick(key)}
            >
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-white font-medium">
                {key.note}{key.octave}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default PianoKeyboard;