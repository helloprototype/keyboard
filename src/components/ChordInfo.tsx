import React from 'react';
import { Music2, Hash } from 'lucide-react';

interface ChordInfoProps {
  selectedKey: string;
  lastPressedNote?: string;
}

interface ChordData {
  name: string;
  roman: string;
  notes: string[];
  function: string;
  color: string;
}

// Generic chord data for all chromatic notes
const genericChordData: { [key: string]: ChordData[] } = {
  'C': [
    { name: 'C', roman: '', notes: ['C', 'E', 'G'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Cm', roman: '', notes: ['C', 'Eb', 'G'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'C7', roman: '', notes: ['C', 'E', 'G', 'Bb'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'C#': [
    { name: 'C#', roman: '', notes: ['C#', 'E#', 'G#'], function: 'Major', color: 'bg-blue-600' },
    { name: 'C#m', roman: '', notes: ['C#', 'E', 'G#'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'C#7', roman: '', notes: ['C#', 'E#', 'G#', 'B'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'Db': [
    { name: 'Db', roman: '', notes: ['Db', 'F', 'Ab'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Dbm', roman: '', notes: ['Db', 'E', 'Ab'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'Db7', roman: '', notes: ['Db', 'F', 'Ab', 'B'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'D': [
    { name: 'D', roman: '', notes: ['D', 'F#', 'A'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Dm', roman: '', notes: ['D', 'F', 'A'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'D7', roman: '', notes: ['D', 'F#', 'A', 'C'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'D#': [
    { name: 'D#', roman: '', notes: ['D#', 'F##', 'A#'], function: 'Major', color: 'bg-blue-600' },
    { name: 'D#m', roman: '', notes: ['D#', 'F#', 'A#'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'D#7', roman: '', notes: ['D#', 'F##', 'A#', 'C#'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'Eb': [
    { name: 'Eb', roman: '', notes: ['Eb', 'G', 'Bb'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Ebm', roman: '', notes: ['Eb', 'Gb', 'Bb'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'Eb7', roman: '', notes: ['Eb', 'G', 'Bb', 'Db'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'E': [
    { name: 'E', roman: '', notes: ['E', 'G#', 'B'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Em', roman: '', notes: ['E', 'G', 'B'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'E7', roman: '', notes: ['E', 'G#', 'B', 'D'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'F': [
    { name: 'F', roman: '', notes: ['F', 'A', 'C'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Fm', roman: '', notes: ['F', 'Ab', 'C'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'F7', roman: '', notes: ['F', 'A', 'C', 'Eb'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'F#': [
    { name: 'F#', roman: '', notes: ['F#', 'A#', 'C#'], function: 'Major', color: 'bg-blue-600' },
    { name: 'F#m', roman: '', notes: ['F#', 'A', 'C#'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'F#7', roman: '', notes: ['F#', 'A#', 'C#', 'E'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'Gb': [
    { name: 'Gb', roman: '', notes: ['Gb', 'Bb', 'Db'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Gbm', roman: '', notes: ['Gb', 'A', 'Db'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'Gb7', roman: '', notes: ['Gb', 'Bb', 'Db', 'E'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'G': [
    { name: 'G', roman: '', notes: ['G', 'B', 'D'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Gm', roman: '', notes: ['G', 'Bb', 'D'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'G7', roman: '', notes: ['G', 'B', 'D', 'F'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'G#': [
    { name: 'G#', roman: '', notes: ['G#', 'B#', 'D#'], function: 'Major', color: 'bg-blue-600' },
    { name: 'G#m', roman: '', notes: ['G#', 'B', 'D#'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'G#7', roman: '', notes: ['G#', 'B#', 'D#', 'F#'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'Ab': [
    { name: 'Ab', roman: '', notes: ['Ab', 'C', 'Eb'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Abm', roman: '', notes: ['Ab', 'B', 'Eb'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'Ab7', roman: '', notes: ['Ab', 'C', 'Eb', 'Gb'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'A': [
    { name: 'A', roman: '', notes: ['A', 'C#', 'E'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Am', roman: '', notes: ['A', 'C', 'E'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'A7', roman: '', notes: ['A', 'C#', 'E', 'G'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'A#': [
    { name: 'A#', roman: '', notes: ['A#', 'C##', 'E#'], function: 'Major', color: 'bg-blue-600' },
    { name: 'A#m', roman: '', notes: ['A#', 'C#', 'E#'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'A#7', roman: '', notes: ['A#', 'C##', 'E#', 'G#'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'Bb': [
    { name: 'Bb', roman: '', notes: ['Bb', 'D', 'F'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Bbm', roman: '', notes: ['Bb', 'Db', 'F'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'Bb7', roman: '', notes: ['Bb', 'D', 'F', 'Ab'], function: 'Dominant 7th', color: 'bg-red-600' }
  ],
  'B': [
    { name: 'B', roman: '', notes: ['B', 'D#', 'F#'], function: 'Major', color: 'bg-blue-600' },
    { name: 'Bm', roman: '', notes: ['B', 'D', 'F#'], function: 'Minor', color: 'bg-purple-600' },
    { name: 'B7', roman: '', notes: ['B', 'D#', 'F#', 'A'], function: 'Dominant 7th', color: 'bg-red-600' }
  ]
};

const ChordInfo: React.FC<ChordInfoProps> = ({ selectedKey, lastPressedNote }) => {
  // Comprehensive chord data for all major and minor keys
  const getChordData = (key: string, note?: string): ChordData[] => {
    const chordDatabase: { [key: string]: { [note: string]: ChordData[] } } = {
      // MAJOR KEYS
      'C': {
        'C': [
          { name: 'C', roman: 'I', notes: ['C', 'E', 'G'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Cmaj7', roman: 'Imaj7', notes: ['C', 'E', 'G', 'B'], function: 'Tonic', color: 'bg-green-500' },
          { name: 'C6', roman: 'I6', notes: ['C', 'E', 'G', 'A'], function: 'Tonic', color: 'bg-green-400' }
        ],
        'D': [
          { name: 'Dm', roman: 'ii', notes: ['D', 'F', 'A'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Dm7', roman: 'ii7', notes: ['D', 'F', 'A', 'C'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'E': [
          { name: 'Em', roman: 'iii', notes: ['E', 'G', 'B'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Em7', roman: 'iii7', notes: ['E', 'G', 'B', 'D'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'F': [
          { name: 'F', roman: 'IV', notes: ['F', 'A', 'C'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Fmaj7', roman: 'IVmaj7', notes: ['F', 'A', 'C', 'E'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'G': [
          { name: 'G', roman: 'V', notes: ['G', 'B', 'D'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'G7', roman: 'V7', notes: ['G', 'B', 'D', 'F'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'A': [
          { name: 'Am', roman: 'vi', notes: ['A', 'C', 'E'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'Am7', roman: 'vi7', notes: ['A', 'C', 'E', 'G'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'B': [
          { name: 'Bm7♭5', roman: 'viiø7', notes: ['B', 'D', 'F', 'A'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'Bdim', roman: 'vii°', notes: ['B', 'D', 'F'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'G': {
        'G': [
          { name: 'G', roman: 'I', notes: ['G', 'B', 'D'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Gmaj7', roman: 'Imaj7', notes: ['G', 'B', 'D', 'F#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'A': [
          { name: 'Am', roman: 'ii', notes: ['A', 'C', 'E'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Am7', roman: 'ii7', notes: ['A', 'C', 'E', 'G'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'B': [
          { name: 'Bm', roman: 'iii', notes: ['B', 'D', 'F#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Bm7', roman: 'iii7', notes: ['B', 'D', 'F#', 'A'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'C': [
          { name: 'C', roman: 'IV', notes: ['C', 'E', 'G'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Cmaj7', roman: 'IVmaj7', notes: ['C', 'E', 'G', 'B'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'D': [
          { name: 'D', roman: 'V', notes: ['D', 'F#', 'A'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'D7', roman: 'V7', notes: ['D', 'F#', 'A', 'C'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'E': [
          { name: 'Em', roman: 'vi', notes: ['E', 'G', 'B'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'Em7', roman: 'vi7', notes: ['E', 'G', 'B', 'D'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'F#': [
          { name: 'F#m7♭5', roman: 'viiø7', notes: ['F#', 'A', 'C', 'E'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'F#dim', roman: 'vii°', notes: ['F#', 'A', 'C'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'D': {
        'D': [
          { name: 'D', roman: 'I', notes: ['D', 'F#', 'A'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Dmaj7', roman: 'Imaj7', notes: ['D', 'F#', 'A', 'C#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'E': [
          { name: 'Em', roman: 'ii', notes: ['E', 'G', 'B'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Em7', roman: 'ii7', notes: ['E', 'G', 'B', 'D'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'F#': [
          { name: 'F#m', roman: 'iii', notes: ['F#', 'A', 'C#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'F#m7', roman: 'iii7', notes: ['F#', 'A', 'C#', 'E'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'G': [
          { name: 'G', roman: 'IV', notes: ['G', 'B', 'D'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Gmaj7', roman: 'IVmaj7', notes: ['G', 'B', 'D', 'F#'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'A': [
          { name: 'A', roman: 'V', notes: ['A', 'C#', 'E'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'A7', roman: 'V7', notes: ['A', 'C#', 'E', 'G'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'B': [
          { name: 'Bm', roman: 'vi', notes: ['B', 'D', 'F#'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'Bm7', roman: 'vi7', notes: ['B', 'D', 'F#', 'A'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'C#': [
          { name: 'C#m7♭5', roman: 'viiø7', notes: ['C#', 'E', 'G', 'B'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'C#dim', roman: 'vii°', notes: ['C#', 'E', 'G'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'A': {
        'A': [
          { name: 'A', roman: 'I', notes: ['A', 'C#', 'E'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Amaj7', roman: 'Imaj7', notes: ['A', 'C#', 'E', 'G#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'B': [
          { name: 'Bm', roman: 'ii', notes: ['B', 'D', 'F#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Bm7', roman: 'ii7', notes: ['B', 'D', 'F#', 'A'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'C#': [
          { name: 'C#m', roman: 'iii', notes: ['C#', 'E', 'G#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'C#m7', roman: 'iii7', notes: ['C#', 'E', 'G#', 'B'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'D': [
          { name: 'D', roman: 'IV', notes: ['D', 'F#', 'A'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Dmaj7', roman: 'IVmaj7', notes: ['D', 'F#', 'A', 'C#'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'E': [
          { name: 'E', roman: 'V', notes: ['E', 'G#', 'B'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'E7', roman: 'V7', notes: ['E', 'G#', 'B', 'D'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'F#': [
          { name: 'F#m', roman: 'vi', notes: ['F#', 'A', 'C#'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'F#m7', roman: 'vi7', notes: ['F#', 'A', 'C#', 'E'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'G#': [
          { name: 'G#m7♭5', roman: 'viiø7', notes: ['G#', 'B', 'D', 'F#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'G#dim', roman: 'vii°', notes: ['G#', 'B', 'D'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'E': {
        'E': [
          { name: 'E', roman: 'I', notes: ['E', 'G#', 'B'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Emaj7', roman: 'Imaj7', notes: ['E', 'G#', 'B', 'D#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'F#': [
          { name: 'F#m', roman: 'ii', notes: ['F#', 'A', 'C#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'F#m7', roman: 'ii7', notes: ['F#', 'A', 'C#', 'E'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'G#': [
          { name: 'G#m', roman: 'iii', notes: ['G#', 'B', 'D#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'G#m7', roman: 'iii7', notes: ['G#', 'B', 'D#', 'F#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'A': [
          { name: 'A', roman: 'IV', notes: ['A', 'C#', 'E'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Amaj7', roman: 'IVmaj7', notes: ['A', 'C#', 'E', 'G#'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'B': [
          { name: 'B', roman: 'V', notes: ['B', 'D#', 'F#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'B7', roman: 'V7', notes: ['B', 'D#', 'F#', 'A'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'C#': [
          { name: 'C#m', roman: 'vi', notes: ['C#', 'E', 'G#'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'C#m7', roman: 'vi7', notes: ['C#', 'E', 'G#', 'B'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'D#': [
          { name: 'D#m7♭5', roman: 'viiø7', notes: ['D#', 'F#', 'A', 'C#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'D#dim', roman: 'vii°', notes: ['D#', 'F#', 'A'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'B': {
        'B': [
          { name: 'B', roman: 'I', notes: ['B', 'D#', 'F#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Bmaj7', roman: 'Imaj7', notes: ['B', 'D#', 'F#', 'A#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'C#': [
          { name: 'C#m', roman: 'ii', notes: ['C#', 'E', 'G#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'C#m7', roman: 'ii7', notes: ['C#', 'E', 'G#', 'B'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'D#': [
          { name: 'D#m', roman: 'iii', notes: ['D#', 'F#', 'A#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'D#m7', roman: 'iii7', notes: ['D#', 'F#', 'A#', 'C#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'E': [
          { name: 'E', roman: 'IV', notes: ['E', 'G#', 'B'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Emaj7', roman: 'IVmaj7', notes: ['E', 'G#', 'B', 'D#'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'F#': [
          { name: 'F#', roman: 'V', notes: ['F#', 'A#', 'C#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'F#7', roman: 'V7', notes: ['F#', 'A#', 'C#', 'E'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'G#': [
          { name: 'G#m', roman: 'vi', notes: ['G#', 'B', 'D#'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'G#m7', roman: 'vi7', notes: ['G#', 'B', 'D#', 'F#'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'A#': [
          { name: 'A#m7♭5', roman: 'viiø7', notes: ['A#', 'C#', 'E', 'G#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'A#dim', roman: 'vii°', notes: ['A#', 'C#', 'E'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'F#': {
        'F#': [
          { name: 'F#', roman: 'I', notes: ['F#', 'A#', 'C#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'F#maj7', roman: 'Imaj7', notes: ['F#', 'A#', 'C#', 'E#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'G#': [
          { name: 'G#m', roman: 'ii', notes: ['G#', 'B', 'D#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'G#m7', roman: 'ii7', notes: ['G#', 'B', 'D#', 'F#'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'A#': [
          { name: 'A#m', roman: 'iii', notes: ['A#', 'C#', 'E#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'A#m7', roman: 'iii7', notes: ['A#', 'C#', 'E#', 'G#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'B': [
          { name: 'B', roman: 'IV', notes: ['B', 'D#', 'F#'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Bmaj7', roman: 'IVmaj7', notes: ['B', 'D#', 'F#', 'A#'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'C#': [
          { name: 'C#', roman: 'V', notes: ['C#', 'E#', 'G#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'C#7', roman: 'V7', notes: ['C#', 'E#', 'G#', 'B'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'D#': [
          { name: 'D#m', roman: 'vi', notes: ['D#', 'F#', 'A#'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'D#m7', roman: 'vi7', notes: ['D#', 'F#', 'A#', 'C#'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'E#': [
          { name: 'E#m7♭5', roman: 'viiø7', notes: ['E#', 'G#', 'B', 'D#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'E#dim', roman: 'vii°', notes: ['E#', 'G#', 'B'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'C#': {
        'C#': [
          { name: 'C#', roman: 'I', notes: ['C#', 'E#', 'G#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'C#maj7', roman: 'Imaj7', notes: ['C#', 'E#', 'G#', 'B#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'D#': [
          { name: 'D#m', roman: 'ii', notes: ['D#', 'F#', 'A#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'D#m7', roman: 'ii7', notes: ['D#', 'F#', 'A#', 'C#'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'E#': [
          { name: 'E#m', roman: 'iii', notes: ['E#', 'G#', 'B#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'E#m7', roman: 'iii7', notes: ['E#', 'G#', 'B#', 'D#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'F#': [
          { name: 'F#', roman: 'IV', notes: ['F#', 'A#', 'C#'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'F#maj7', roman: 'IVmaj7', notes: ['F#', 'A#', 'C#', 'E#'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'G#': [
          { name: 'G#', roman: 'V', notes: ['G#', 'B#', 'D#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'G#7', roman: 'V7', notes: ['G#', 'B#', 'D#', 'F#'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'A#': [
          { name: 'A#m', roman: 'vi', notes: ['A#', 'C#', 'E#'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'A#m7', roman: 'vi7', notes: ['A#', 'C#', 'E#', 'G#'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'B#': [
          { name: 'B#m7♭5', roman: 'viiø7', notes: ['B#', 'D#', 'F#', 'A#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'B#dim', roman: 'vii°', notes: ['B#', 'D#', 'F#'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'F': {
        'F': [
          { name: 'F', roman: 'I', notes: ['F', 'A', 'C'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Fmaj7', roman: 'Imaj7', notes: ['F', 'A', 'C', 'E'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'G': [
          { name: 'Gm', roman: 'ii', notes: ['G', 'Bb', 'D'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Gm7', roman: 'ii7', notes: ['G', 'Bb', 'D', 'F'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'A': [
          { name: 'Am', roman: 'iii', notes: ['A', 'C', 'E'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Am7', roman: 'iii7', notes: ['A', 'C', 'E', 'G'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'Bb': [
          { name: 'Bb', roman: 'IV', notes: ['Bb', 'D', 'F'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Bbmaj7', roman: 'IVmaj7', notes: ['Bb', 'D', 'F', 'A'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'C': [
          { name: 'C', roman: 'V', notes: ['C', 'E', 'G'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'C7', roman: 'V7', notes: ['C', 'E', 'G', 'Bb'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'D': [
          { name: 'Dm', roman: 'vi', notes: ['D', 'F', 'A'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'Dm7', roman: 'vi7', notes: ['D', 'F', 'A', 'C'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'E': [
          { name: 'Em7♭5', roman: 'viiø7', notes: ['E', 'G', 'Bb', 'D'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'Edim', roman: 'vii°', notes: ['E', 'G', 'Bb'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Bb': {
        'Bb': [
          { name: 'Bb', roman: 'I', notes: ['Bb', 'D', 'F'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Bbmaj7', roman: 'Imaj7', notes: ['Bb', 'D', 'F', 'A'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'C': [
          { name: 'Cm', roman: 'ii', notes: ['C', 'Eb', 'G'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Cm7', roman: 'ii7', notes: ['C', 'Eb', 'G', 'Bb'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'D': [
          { name: 'Dm', roman: 'iii', notes: ['D', 'F', 'A'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Dm7', roman: 'iii7', notes: ['D', 'F', 'A', 'C'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'Eb': [
          { name: 'Eb', roman: 'IV', notes: ['Eb', 'G', 'Bb'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Ebmaj7', roman: 'IVmaj7', notes: ['Eb', 'G', 'Bb', 'D'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'F': [
          { name: 'F', roman: 'V', notes: ['F', 'A', 'C'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'F7', roman: 'V7', notes: ['F', 'A', 'C', 'Eb'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'G': [
          { name: 'Gm', roman: 'vi', notes: ['G', 'Bb', 'D'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'Gm7', roman: 'vi7', notes: ['G', 'Bb', 'D', 'F'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'A': [
          { name: 'Am7♭5', roman: 'viiø7', notes: ['A', 'C', 'Eb', 'G'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'Adim', roman: 'vii°', notes: ['A', 'C', 'Eb'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Eb': {
        'Eb': [
          { name: 'Eb', roman: 'I', notes: ['Eb', 'G', 'Bb'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Ebmaj7', roman: 'Imaj7', notes: ['Eb', 'G', 'Bb', 'D'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'F': [
          { name: 'Fm', roman: 'ii', notes: ['F', 'Ab', 'C'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Fm7', roman: 'ii7', notes: ['F', 'Ab', 'C', 'Eb'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'G': [
          { name: 'Gm', roman: 'iii', notes: ['G', 'Bb', 'D'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Gm7', roman: 'iii7', notes: ['G', 'Bb', 'D', 'F'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'Ab': [
          { name: 'Ab', roman: 'IV', notes: ['Ab', 'C', 'Eb'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Abmaj7', roman: 'IVmaj7', notes: ['Ab', 'C', 'Eb', 'G'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'Bb': [
          { name: 'Bb', roman: 'V', notes: ['Bb', 'D', 'F'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'Bb7', roman: 'V7', notes: ['Bb', 'D', 'F', 'Ab'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'C': [
          { name: 'Cm', roman: 'vi', notes: ['C', 'Eb', 'G'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'Cm7', roman: 'vi7', notes: ['C', 'Eb', 'G', 'Bb'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'D': [
          { name: 'Dm7♭5', roman: 'viiø7', notes: ['D', 'F', 'Ab', 'C'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'Ddim', roman: 'vii°', notes: ['D', 'F', 'Ab'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Ab': {
        'Ab': [
          { name: 'Ab', roman: 'I', notes: ['Ab', 'C', 'Eb'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Abmaj7', roman: 'Imaj7', notes: ['Ab', 'C', 'Eb', 'G'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'Bb': [
          { name: 'Bbm', roman: 'ii', notes: ['Bb', 'Db', 'F'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Bbm7', roman: 'ii7', notes: ['Bb', 'Db', 'F', 'Ab'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'C': [
          { name: 'Cm', roman: 'iii', notes: ['C', 'Eb', 'G'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Cm7', roman: 'iii7', notes: ['C', 'Eb', 'G', 'Bb'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'Db': [
          { name: 'Db', roman: 'IV', notes: ['Db', 'F', 'Ab'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Dbmaj7', roman: 'IVmaj7', notes: ['Db', 'F', 'Ab', 'C'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'Eb': [
          { name: 'Eb', roman: 'V', notes: ['Eb', 'G', 'Bb'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'Eb7', roman: 'V7', notes: ['Eb', 'G', 'Bb', 'Db'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'F': [
          { name: 'Fm', roman: 'vi', notes: ['F', 'Ab', 'C'], function: 'Tonic', color: 'bg-indigo-600' },
          { name: 'Fm7', roman: 'vi7', notes: ['F', 'Ab', 'C', 'Eb'], function: 'Tonic', color: 'bg-indigo-500' }
        ],
        'G': [
          { name: 'Gm7♭5', roman: 'viiø7', notes: ['G', 'Bb', 'Db', 'F'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'Gdim', roman: 'vii°', notes: ['G', 'Bb', 'Db'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      // MINOR KEYS
      'Am': {
        'A': [
          { name: 'Am', roman: 'i', notes: ['A', 'C', 'E'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Am7', roman: 'i7', notes: ['A', 'C', 'E', 'G'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'B': [
          { name: 'Bm7♭5', roman: 'iiø7', notes: ['B', 'D', 'F', 'A'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Bdim', roman: 'ii°', notes: ['B', 'D', 'F'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'C': [
          { name: 'C', roman: 'III', notes: ['C', 'E', 'G'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Cmaj7', roman: 'IIImaj7', notes: ['C', 'E', 'G', 'B'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'D': [
          { name: 'Dm', roman: 'iv', notes: ['D', 'F', 'A'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Dm7', roman: 'iv7', notes: ['D', 'F', 'A', 'C'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'E': [
          { name: 'Em', roman: 'v', notes: ['E', 'G', 'B'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'E7', roman: 'V7', notes: ['E', 'G#', 'B', 'D'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'F': [
          { name: 'F', roman: 'VI', notes: ['F', 'A', 'C'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Fmaj7', roman: 'VImaj7', notes: ['F', 'A', 'C', 'E'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'G': [
          { name: 'G', roman: 'VII', notes: ['G', 'B', 'D'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'G7', roman: 'VII7', notes: ['G', 'B', 'D', 'F'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Em': {
        'E': [
          { name: 'Em', roman: 'i', notes: ['E', 'G', 'B'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Em7', roman: 'i7', notes: ['E', 'G', 'B', 'D'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'F#': [
          { name: 'F#m7♭5', roman: 'iiø7', notes: ['F#', 'A', 'C', 'E'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'F#dim', roman: 'ii°', notes: ['F#', 'A', 'C'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'G': [
          { name: 'G', roman: 'III', notes: ['G', 'B', 'D'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Gmaj7', roman: 'IIImaj7', notes: ['G', 'B', 'D', 'F#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'A': [
          { name: 'Am', roman: 'iv', notes: ['A', 'C', 'E'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Am7', roman: 'iv7', notes: ['A', 'C', 'E', 'G'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'B': [
          { name: 'Bm', roman: 'v', notes: ['B', 'D', 'F#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'B7', roman: 'V7', notes: ['B', 'D#', 'F#', 'A'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'C': [
          { name: 'C', roman: 'VI', notes: ['C', 'E', 'G'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Cmaj7', roman: 'VImaj7', notes: ['C', 'E', 'G', 'B'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'D': [
          { name: 'D', roman: 'VII', notes: ['D', 'F#', 'A'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'D7', roman: 'VII7', notes: ['D', 'F#', 'A', 'C'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Bm': {
        'B': [
          { name: 'Bm', roman: 'i', notes: ['B', 'D', 'F#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Bm7', roman: 'i7', notes: ['B', 'D', 'F#', 'A'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'C#': [
          { name: 'C#m7♭5', roman: 'iiø7', notes: ['C#', 'E', 'G', 'B'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'C#dim', roman: 'ii°', notes: ['C#', 'E', 'G'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'D': [
          { name: 'D', roman: 'III', notes: ['D', 'F#', 'A'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Dmaj7', roman: 'IIImaj7', notes: ['D', 'F#', 'A', 'C#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'E': [
          { name: 'Em', roman: 'iv', notes: ['E', 'G', 'B'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Em7', roman: 'iv7', notes: ['E', 'G', 'B', 'D'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'F#': [
          { name: 'F#m', roman: 'v', notes: ['F#', 'A', 'C#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'F#7', roman: 'V7', notes: ['F#', 'A#', 'C#', 'E'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'G': [
          { name: 'G', roman: 'VI', notes: ['G', 'B', 'D'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Gmaj7', roman: 'VImaj7', notes: ['G', 'B', 'D', 'F#'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'A': [
          { name: 'A', roman: 'VII', notes: ['A', 'C#', 'E'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'A7', roman: 'VII7', notes: ['A', 'C#', 'E', 'G'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'F#m': {
        'F#': [
          { name: 'F#m', roman: 'i', notes: ['F#', 'A', 'C#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'F#m7', roman: 'i7', notes: ['F#', 'A', 'C#', 'E'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'G#': [
          { name: 'G#m7♭5', roman: 'iiø7', notes: ['G#', 'B', 'D', 'F#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'G#dim', roman: 'ii°', notes: ['G#', 'B', 'D'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'A': [
          { name: 'A', roman: 'III', notes: ['A', 'C#', 'E'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Amaj7', roman: 'IIImaj7', notes: ['A', 'C#', 'E', 'G#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'B': [
          { name: 'Bm', roman: 'iv', notes: ['B', 'D', 'F#'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Bm7', roman: 'iv7', notes: ['B', 'D', 'F#', 'A'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'C#': [
          { name: 'C#m', roman: 'v', notes: ['C#', 'E', 'G#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'C#7', roman: 'V7', notes: ['C#', 'E#', 'G#', 'B'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'D': [
          { name: 'D', roman: 'VI', notes: ['D', 'F#', 'A'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Dmaj7', roman: 'VImaj7', notes: ['D', 'F#', 'A', 'C#'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'E': [
          { name: 'E', roman: 'VII', notes: ['E', 'G#', 'B'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'E7', roman: 'VII7', notes: ['E', 'G#', 'B', 'D'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'C#m': {
        'C#': [
          { name: 'C#m', roman: 'i', notes: ['C#', 'E', 'G#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'C#m7', roman: 'i7', notes: ['C#', 'E', 'G#', 'B'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'D#': [
          { name: 'D#m7♭5', roman: 'iiø7', notes: ['D#', 'F#', 'A', 'C#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'D#dim', roman: 'ii°', notes: ['D#', 'F#', 'A'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'E': [
          { name: 'E', roman: 'III', notes: ['E', 'G#', 'B'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Emaj7', roman: 'IIImaj7', notes: ['E', 'G#', 'B', 'D#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'F#': [
          { name: 'F#m', roman: 'iv', notes: ['F#', 'A', 'C#'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'F#m7', roman: 'iv7', notes: ['F#', 'A', 'C#', 'E'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'G#': [
          { name: 'G#m', roman: 'v', notes: ['G#', 'B', 'D#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'G#7', roman: 'V7', notes: ['G#', 'B#', 'D#', 'F#'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'A': [
          { name: 'A', roman: 'VI', notes: ['A', 'C#', 'E'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Amaj7', roman: 'VImaj7', notes: ['A', 'C#', 'E', 'G#'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'B': [
          { name: 'B', roman: 'VII', notes: ['B', 'D#', 'F#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'B7', roman: 'VII7', notes: ['B', 'D#', 'F#', 'A'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'G#m': {
        'G#': [
          { name: 'G#m', roman: 'i', notes: ['G#', 'B', 'D#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'G#m7', roman: 'i7', notes: ['G#', 'B', 'D#', 'F#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'A#': [
          { name: 'A#m7♭5', roman: 'iiø7', notes: ['A#', 'C#', 'E', 'G#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'A#dim', roman: 'ii°', notes: ['A#', 'C#', 'E'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'B': [
          { name: 'B', roman: 'III', notes: ['B', 'D#', 'F#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Bmaj7', roman: 'IIImaj7', notes: ['B', 'D#', 'F#', 'A#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'C#': [
          { name: 'C#m', roman: 'iv', notes: ['C#', 'E', 'G#'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'C#m7', roman: 'iv7', notes: ['C#', 'E', 'G#', 'B'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'D#': [
          { name: 'D#m', roman: 'v', notes: ['D#', 'F#', 'A#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'D#7', roman: 'V7', notes: ['D#', 'F##', 'A#', 'C#'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'E': [
          { name: 'E', roman: 'VI', notes: ['E', 'G#', 'B'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Emaj7', roman: 'VImaj7', notes: ['E', 'G#', 'B', 'D#'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'F#': [
          { name: 'F#', roman: 'VII', notes: ['F#', 'A#', 'C#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'F#7', roman: 'VII7', notes: ['F#', 'A#', 'C#', 'E'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'D#m': {
        'D#': [
          { name: 'D#m', roman: 'i', notes: ['D#', 'F#', 'A#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'D#m7', roman: 'i7', notes: ['D#', 'F#', 'A#', 'C#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'E#': [
          { name: 'E#m7♭5', roman: 'iiø7', notes: ['E#', 'G#', 'B', 'D#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'E#dim', roman: 'ii°', notes: ['E#', 'G#', 'B'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'F#': [
          { name: 'F#', roman: 'III', notes: ['F#', 'A#', 'C#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'F#maj7', roman: 'IIImaj7', notes: ['F#', 'A#', 'C#', 'E#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'G#': [
          { name: 'G#m', roman: 'iv', notes: ['G#', 'B', 'D#'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'G#m7', roman: 'iv7', notes: ['G#', 'B', 'D#', 'F#'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'A#': [
          { name: 'A#m', roman: 'v', notes: ['A#', 'C#', 'E#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'A#7', roman: 'V7', notes: ['A#', 'C##', 'E#', 'G#'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'B': [
          { name: 'B', roman: 'VI', notes: ['B', 'D#', 'F#'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Bmaj7', roman: 'VImaj7', notes: ['B', 'D#', 'F#', 'A#'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'C#': [
          { name: 'C#', roman: 'VII', notes: ['C#', 'E#', 'G#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'C#7', roman: 'VII7', notes: ['C#', 'E#', 'G#', 'B'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'A#m': {
        'A#': [
          { name: 'A#m', roman: 'i', notes: ['A#', 'C#', 'E#'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'A#m7', roman: 'i7', notes: ['A#', 'C#', 'E#', 'G#'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'B#': [
          { name: 'B#m7♭5', roman: 'iiø7', notes: ['B#', 'D#', 'F#', 'A#'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'B#dim', roman: 'ii°', notes: ['B#', 'D#', 'F#'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'C#': [
          { name: 'C#', roman: 'III', notes: ['C#', 'E#', 'G#'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'C#maj7', roman: 'IIImaj7', notes: ['C#', 'E#', 'G#', 'B#'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'D#': [
          { name: 'D#m', roman: 'iv', notes: ['D#', 'F#', 'A#'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'D#m7', roman: 'iv7', notes: ['D#', 'F#', 'A#', 'C#'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'E#': [
          { name: 'E#m', roman: 'v', notes: ['E#', 'G#', 'B#'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'E#7', roman: 'V7', notes: ['E#', 'G##', 'B#', 'D#'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'F#': [
          { name: 'F#', roman: 'VI', notes: ['F#', 'A#', 'C#'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'F#maj7', roman: 'VImaj7', notes: ['F#', 'A#', 'C#', 'E#'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'G#': [
          { name: 'G#', roman: 'VII', notes: ['G#', 'B#', 'D#'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'G#7', roman: 'VII7', notes: ['G#', 'B#', 'D#', 'F#'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Fm': {
        'F': [
          { name: 'Fm', roman: 'i', notes: ['F', 'Ab', 'C'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Fm7', roman: 'i7', notes: ['F', 'Ab', 'C', 'Eb'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'G': [
          { name: 'Gm7♭5', roman: 'iiø7', notes: ['G', 'Bb', 'Db', 'F'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Gdim', roman: 'ii°', notes: ['G', 'Bb', 'Db'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'Ab': [
          { name: 'Ab', roman: 'III', notes: ['Ab', 'C', 'Eb'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Abmaj7', roman: 'IIImaj7', notes: ['Ab', 'C', 'Eb', 'G'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'Bb': [
          { name: 'Bbm', roman: 'iv', notes: ['Bb', 'Db', 'F'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Bbm7', roman: 'iv7', notes: ['Bb', 'Db', 'F', 'Ab'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'C': [
          { name: 'Cm', roman: 'v', notes: ['C', 'Eb', 'G'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'C7', roman: 'V7', notes: ['C', 'E', 'G', 'Bb'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'Db': [
          { name: 'Db', roman: 'VI', notes: ['Db', 'F', 'Ab'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Dbmaj7', roman: 'VImaj7', notes: ['Db', 'F', 'Ab', 'C'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'Eb': [
          { name: 'Eb', roman: 'VII', notes: ['Eb', 'G', 'Bb'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'Eb7', roman: 'VII7', notes: ['Eb', 'G', 'Bb', 'Db'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Cm': {
        'C': [
          { name: 'Cm', roman: 'i', notes: ['C', 'Eb', 'G'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Cm7', roman: 'i7', notes: ['C', 'Eb', 'G', 'Bb'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'D': [
          { name: 'Dm7♭5', roman: 'iiø7', notes: ['D', 'F', 'Ab', 'C'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Ddim', roman: 'ii°', notes: ['D', 'F', 'Ab'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'Eb': [
          { name: 'Eb', roman: 'III', notes: ['Eb', 'G', 'Bb'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Ebmaj7', roman: 'IIImaj7', notes: ['Eb', 'G', 'Bb', 'D'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'F': [
          { name: 'Fm', roman: 'iv', notes: ['F', 'Ab', 'C'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Fm7', roman: 'iv7', notes: ['F', 'Ab', 'C', 'Eb'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'G': [
          { name: 'Gm', roman: 'v', notes: ['G', 'Bb', 'D'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'G7', roman: 'V7', notes: ['G', 'B', 'D', 'F'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'Ab': [
          { name: 'Ab', roman: 'VI', notes: ['Ab', 'C', 'Eb'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Abmaj7', roman: 'VImaj7', notes: ['Ab', 'C', 'Eb', 'G'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'Bb': [
          { name: 'Bb', roman: 'VII', notes: ['Bb', 'D', 'F'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'Bb7', roman: 'VII7', notes: ['Bb', 'D', 'F', 'Ab'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Gm': {
        'G': [
          { name: 'Gm', roman: 'i', notes: ['G', 'Bb', 'D'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Gm7', roman: 'i7', notes: ['G', 'Bb', 'D', 'F'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'A': [
          { name: 'Am7♭5', roman: 'iiø7', notes: ['A', 'C', 'Eb', 'G'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Adim', roman: 'ii°', notes: ['A', 'C', 'Eb'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'Bb': [
          { name: 'Bb', roman: 'III', notes: ['Bb', 'D', 'F'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Bbmaj7', roman: 'IIImaj7', notes: ['Bb', 'D', 'F', 'A'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'C': [
          { name: 'Cm', roman: 'iv', notes: ['C', 'Eb', 'G'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Cm7', roman: 'iv7', notes: ['C', 'Eb', 'G', 'Bb'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'D': [
          { name: 'Dm', roman: 'v', notes: ['D', 'F', 'A'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'D7', roman: 'V7', notes: ['D', 'F#', 'A', 'C'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'Eb': [
          { name: 'Eb', roman: 'VI', notes: ['Eb', 'G', 'Bb'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Ebmaj7', roman: 'VImaj7', notes: ['Eb', 'G', 'Bb', 'D'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'F': [
          { name: 'F', roman: 'VII', notes: ['F', 'A', 'C'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'F7', roman: 'VII7', notes: ['F', 'A', 'C', 'Eb'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      },
      'Dm': {
        'D': [
          { name: 'Dm', roman: 'i', notes: ['D', 'F', 'A'], function: 'Tonic', color: 'bg-green-600' },
          { name: 'Dm7', roman: 'i7', notes: ['D', 'F', 'A', 'C'], function: 'Tonic', color: 'bg-green-500' }
        ],
        'E': [
          { name: 'Em7♭5', roman: 'iiø7', notes: ['E', 'G', 'Bb', 'D'], function: 'Subdominant', color: 'bg-blue-600' },
          { name: 'Edim', roman: 'ii°', notes: ['E', 'G', 'Bb'], function: 'Subdominant', color: 'bg-blue-500' }
        ],
        'F': [
          { name: 'F', roman: 'III', notes: ['F', 'A', 'C'], function: 'Tonic', color: 'bg-purple-600' },
          { name: 'Fmaj7', roman: 'IIImaj7', notes: ['F', 'A', 'C', 'E'], function: 'Tonic', color: 'bg-purple-500' }
        ],
        'G': [
          { name: 'Gm', roman: 'iv', notes: ['G', 'Bb', 'D'], function: 'Subdominant', color: 'bg-orange-600' },
          { name: 'Gm7', roman: 'iv7', notes: ['G', 'Bb', 'D', 'F'], function: 'Subdominant', color: 'bg-orange-500' }
        ],
        'A': [
          { name: 'Am', roman: 'v', notes: ['A', 'C', 'E'], function: 'Dominant', color: 'bg-red-600' },
          { name: 'A7', roman: 'V7', notes: ['A', 'C#', 'E', 'G'], function: 'Dominant', color: 'bg-red-500' }
        ],
        'Bb': [
          { name: 'Bb', roman: 'VI', notes: ['Bb', 'D', 'F'], function: 'Subdominant', color: 'bg-indigo-600' },
          { name: 'Bbmaj7', roman: 'VImaj7', notes: ['Bb', 'D', 'F', 'A'], function: 'Subdominant', color: 'bg-indigo-500' }
        ],
        'C': [
          { name: 'C', roman: 'VII', notes: ['C', 'E', 'G'], function: 'Dominant', color: 'bg-gray-600' },
          { name: 'C7', roman: 'VII7', notes: ['C', 'E', 'G', 'Bb'], function: 'Dominant', color: 'bg-gray-500' }
        ]
      }
    };

    // Default to C major if key not found
    const keyData = chordDatabase[key] || chordDatabase['C'];
    
    if (!note) {
      // Return all chords for the key
      return Object.values(keyData).flat();
    }
    
    // Return chords for specific note, with fallback to generic chords
    const normalizedNote = note.replace('♯', '#').replace('♭', 'b');
    const keySpecificChords = keyData[normalizedNote] || keyData[note];
    
    if (keySpecificChords && keySpecificChords.length > 0) {
      return keySpecificChords;
    }
    
    // Fallback to generic chords if no key-specific chords found
    return genericChordData[normalizedNote] || genericChordData[note] || [];
  };

  if (!selectedKey) return null;

  const chords = getChordData(selectedKey, lastPressedNote);
  const allKeyChords = lastPressedNote ? chords : getChordData(selectedKey);

  return (
    <div className="bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-lg p-4 rounded-xl border border-white/10 max-h-96 overflow-y-auto">
      <div className="flex items-center space-x-2 mb-3">
        <Music2 className="w-5 h-5 text-blue-400" />
        <h4 className="text-white font-semibold">
          {lastPressedNote ? `${lastPressedNote} Chords in ${selectedKey}` : `${selectedKey} Key Chords`}
        </h4>
      </div>
      
      {chords.length > 0 ? (
        <div className="space-y-2">
          {chords.slice(0, 8).map((chord, index) => (
            <div key={index} className="flex items-center justify-between bg-gray-900/50 rounded-lg p-2">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${chord.color}`}></div>
                <div>
                  <span className="text-white font-medium">{chord.name}</span>
                  {chord.roman && <span className="text-gray-400 text-sm ml-2">({chord.roman})</span>}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-300 text-xs">{chord.notes.join(' - ')}</div>
                <div className="text-blue-300 text-xs">{chord.function}</div>
              </div>
            </div>
          ))}
          
          {!lastPressedNote && (
            <div className="mt-3 p-2 bg-blue-900/30 rounded-lg">
              <p className="text-blue-200 text-xs">
                💡 <strong>Tip:</strong> Press any piano key to see specific chord variations for that note!
              </p>
            </div>
          )}
          
          {lastPressedNote && (
            <div className="mt-3 p-2 bg-green-900/30 rounded-lg">
              <div className="text-green-200 text-xs space-y-1">
                <p><strong>Function:</strong> {chords[0]?.function} - {getFunctionDescription(chords[0]?.function)}</p>
                {chords[0]?.roman ? (
                  <p><strong>Common Progressions:</strong> {getCommonProgressions(selectedKey, lastPressedNote)}</p>
                ) : (
                  <p><strong>Note:</strong> This note is not diatonic to {selectedKey}. Showing generic chord variations.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-gray-400 text-sm">
          {!lastPressedNote ? 
            `Press a piano key to see chord variations for that note in ${selectedKey}.` :
            `No chord data available for ${lastPressedNote} in ${selectedKey}.`
          }
        </div>
      )}
    </div>
  );
};

// Helper functions
const getFunctionDescription = (func?: string): string => {
  switch (func) {
    case 'Tonic': return 'Home/Rest - Stable, resolved sound';
    case 'Subdominant': return 'Departure - Creates movement away from home';
    case 'Dominant': return 'Tension - Wants to resolve back to tonic';
    case 'Major': return 'Bright, happy sound - stable major triad';
    case 'Minor': return 'Dark, sad sound - stable minor triad';
    case 'Dominant 7th': return 'Strong tension - wants to resolve down a fifth';
    default: return 'Harmonic function';
  }
};

const getCommonProgressions = (key: string, note: string): string => {
  const progressions: { [key: string]: { [note: string]: string } } = {
    'C': {
      'C': 'C-Am-F-G, C-F-G-C',
      'F': 'F-G-C, C-F-C',
      'G': 'G-C, C-G-Am-F',
      'Am': 'Am-F-C-G, Am-Dm-G-C',
      'Dm': 'Dm-G-C, C-Dm-G',
      'Em': 'Em-Am-Dm-G'
    },
    'F#m': {
      'F#': 'F#m-D-A-E, F#m-Bm-C#m',
      'A': 'A-E-F#m, F#m-A-E',
      'B': 'Bm-F#m-C#m-F#m',
      'C#': 'C#m-F#m-Bm-E',
      'D': 'D-A-Bm-F#m',
      'E': 'E-F#m, F#m-E-D-A'
    }
  };
  
  return progressions[key]?.[note] || 'Try with other chords in the key';
};

export default ChordInfo;