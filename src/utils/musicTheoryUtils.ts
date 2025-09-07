// Music theory utilities and data
export interface KeyInfo {
  major: string;
  minor: string;
  notes: string[];
  chords: {
    major: string[];
    minor: string[];
  };
}

export const keyInfo: { [key: string]: KeyInfo } = {
  'C': {
    major: 'C Major',
    minor: 'A Minor',
    notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
    chords: {
      major: ['C', 'F', 'G'],
      minor: ['Dm', 'Em', 'Am']
    }
  },
  'G': {
    major: 'G Major',
    minor: 'E Minor',
    notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'],
    chords: {
      major: ['G', 'C', 'D'],
      minor: ['Am', 'Bm', 'Em']
    }
  },
  'D': {
    major: 'D Major',
    minor: 'B Minor',
    notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'],
    chords: {
      major: ['D', 'G', 'A'],
      minor: ['Bm', 'C#m', 'F#m']
    }
  },
  'A': {
    major: 'A Major',
    minor: 'F# Minor',
    notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'],
    chords: {
      major: ['A', 'D', 'E'],
      minor: ['Bm', 'C#m', 'F#m']
    }
  },
  'E': {
    major: 'E Major',
    minor: 'C# Minor',
    notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'],
    chords: {
      major: ['E', 'A', 'B'],
      minor: ['C#m', 'F#m', 'G#m']
    }
  },
  'B': {
    major: 'B Major',
    minor: 'G# Minor',
    notes: ['B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#'],
    chords: {
      major: ['B', 'E', 'F#'],
      minor: ['C#m', 'D#m', 'G#m']
    }
  },
  'F#': {
    major: 'F# Major',
    minor: 'D# Minor',
    notes: ['F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#'],
    chords: {
      major: ['F#', 'B', 'C#'],
      minor: ['D#m', 'G#m', 'A#m']
    }
  },
  'C#': {
    major: 'C# Major',
    minor: 'A# Minor',
    notes: ['C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#'],
    chords: {
      major: ['C#', 'F#', 'G#'],
      minor: ['D#m', 'F#m', 'A#m']
    }
  },
  'G#': {
    major: 'G# Major',
    minor: 'F Minor',
    notes: ['G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##'],
    chords: {
      major: ['G#', 'C#', 'D#'],
      minor: ['A#m', 'C#m', 'Fm']
    }
  },
  'D#': {
    major: 'D# Major',
    minor: 'C Minor',
    notes: ['D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##'],
    chords: {
      major: ['D#', 'G#', 'A#'],
      minor: ['Fm', 'Gm', 'Cm']
    }
  },
  'A#': {
    major: 'A# Major',
    minor: 'G Minor',
    notes: ['A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G##'],
    chords: {
      major: ['A#', 'D#', 'E#'],
      minor: ['Cm', 'Dm', 'Gm']
    }
  },
  'F': {
    major: 'F Major',
    minor: 'D Minor',
    notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'],
    chords: {
      major: ['F', 'Bb', 'C'],
      minor: ['Dm', 'Gm', 'Am']
    }
  },
  'Am': {
    major: 'C Major',
    minor: 'A Minor',
    notes: ['A', 'B', 'C', 'D', 'E', 'F', 'G'],
    chords: {
      major: ['C', 'F', 'G'],
      minor: ['Am', 'Dm', 'Em']
    }
  },
  'Em': {
    major: 'G Major',
    minor: 'E Minor',
    notes: ['E', 'F#', 'G', 'A', 'B', 'C', 'D'],
    chords: {
      major: ['G', 'C', 'D'],
      minor: ['Em', 'Am', 'Bm']
    }
  },
  'Bm': {
    major: 'D Major',
    minor: 'B Minor',
    notes: ['B', 'C#', 'D', 'E', 'F#', 'G', 'A'],
    chords: {
      major: ['D', 'G', 'A'],
      minor: ['Bm', 'Em', 'F#m']
    }
  },
  'F#m': {
    major: 'A Major',
    minor: 'F# Minor',
    notes: ['F#', 'G#', 'A', 'B', 'C#', 'D', 'E'],
    chords: {
      major: ['A', 'D', 'E'],
      minor: ['F#m', 'Bm', 'C#m']
    }
  },
  'C#m': {
    major: 'E Major',
    minor: 'C# Minor',
    notes: ['C#', 'D#', 'E', 'F#', 'G#', 'A', 'B'],
    chords: {
      major: ['E', 'A', 'B'],
      minor: ['C#m', 'F#m', 'G#m']
    }
  },
  'G#m': {
    major: 'B Major',
    minor: 'G# Minor',
    notes: ['G#', 'A#', 'B', 'C#', 'D#', 'E', 'F#'],
    chords: {
      major: ['B', 'E', 'F#'],
      minor: ['G#m', 'C#m', 'D#m']
    }
  },
  'D#m': {
    major: 'F# Major',
    minor: 'D# Minor',
    notes: ['D#', 'E#', 'F#', 'G#', 'A#', 'B', 'C#'],
    chords: {
      major: ['F#', 'B', 'C#'],
      minor: ['D#m', 'G#m', 'A#m']
    }
  },
  'A#m': {
    major: 'C# Major',
    minor: 'A# Minor',
    notes: ['A#', 'B#', 'C#', 'D#', 'E#', 'F#', 'G#'],
    chords: {
      major: ['C#', 'F#', 'G#'],
      minor: ['A#m', 'D#m', 'F#m']
    }
  },
  'Fm': {
    major: 'Ab Major',
    minor: 'F Minor',
    notes: ['F', 'G', 'Ab', 'Bb', 'C', 'Db', 'Eb'],
    chords: {
      major: ['Ab', 'Db', 'Eb'],
      minor: ['Fm', 'Bbm', 'Cm']
    }
  },
  'Cm': {
    major: 'Eb Major',
    minor: 'C Minor',
    notes: ['C', 'D', 'Eb', 'F', 'G', 'Ab', 'Bb'],
    chords: {
      major: ['Eb', 'Ab', 'Bb'],
      minor: ['Cm', 'Fm', 'Gm']
    }
  },
  'Gm': {
    major: 'Bb Major',
    minor: 'G Minor',
    notes: ['G', 'A', 'Bb', 'C', 'D', 'Eb', 'F'],
    chords: {
      major: ['Bb', 'Eb', 'F'],
      minor: ['Gm', 'Cm', 'Dm']
    }
  },
  'Dm': {
    major: 'F Major',
    minor: 'D Minor',
    notes: ['D', 'E', 'F', 'G', 'A', 'Bb', 'C'],
    chords: {
      major: ['F', 'Bb', 'C'],
      minor: ['Dm', 'Gm', 'Am']
    }
  }
};

// Normalize note names for comparison (handle enharmonic equivalents)
export const normalizeNote = (note: string): string => {
  const enharmonicMap: { [key: string]: string } = {
    'Db': 'C#',
    'Eb': 'D#',
    'Gb': 'F#',
    'Ab': 'G#',
    'Bb': 'A#',
    'E#': 'F',
    'B#': 'C',
    'F##': 'G',
    'C##': 'D',
    'G##': 'A',
    'D##': 'E',
    'A##': 'B'
  };
  
  return enharmonicMap[note] || note;
};

// Check if a note is diatonic to the selected key
export const isNoteDiatonic = (note: string, selectedKey: string): boolean => {
  if (!selectedKey || !keyInfo[selectedKey] || !note) return true;
  
  const selectedKeyNotes = keyInfo[selectedKey].notes.map(normalizeNote);
  const normalizedNote = normalizeNote(note);
  
  return selectedKeyNotes.includes(normalizedNote);
};