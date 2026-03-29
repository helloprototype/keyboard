import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Send, Play, Pause, Settings, Key } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  progression?: ChordProgression;
}

interface ChordProgression {
  chords: string[];
  timeSignature: string;
  tempo: number;
  mood: string;
}

interface AISongComposerProps {
  onPlayProgression: (progression: ChordProgression) => void;
  onStopProgression: () => void;
  isPlaying: boolean;
}

const AISongComposer: React.FC<AISongComposerProps> = ({
  onPlayProgression,
  onStopProgression,
  isPlaying
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hello! I'm your AI music composer. Let's create some beautiful chord progressions together. Tell me what you'd like - for example: 'Create a melancholic 4-chord progression in 4/4 time' or 'Make something upbeat with 8 chords'. What would you like to compose?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentProgression, setCurrentProgression] = useState<ChordProgression | null>(null);

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    setShowApiKeyInput(false);
  };

  const parseProgressionFromResponse = (text: string): ChordProgression | null => {
    try {
      const progressionMatch = text.match(/\[PROGRESSION:(.*?)\]/s);
      if (progressionMatch) {
        const data = JSON.parse(progressionMatch[1]);
        return data;
      }
    } catch (error) {
      console.error('Error parsing progression:', error);
    }
    return null;
  };

  const callGeminiAPI = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "Please set up your Gemini API key first by clicking the key icon above.";
    }

    const conversationHistory = messages
      .slice(-5)
      .map(m => `${m.role}: ${m.content}`)
      .join('\n');

    const systemPrompt = `You are a music theory expert helping users create chord progressions. When the user asks for a chord progression, you must:

1. Understand their requirements (number of chords, time signature, mood, tempo)
2. Create a musically sound progression
3. Respond conversationally to the user
4. Include the progression data in a special format at the end

IMPORTANT: Always include the progression data in this exact format at the end of your response:
[PROGRESSION:{"chords":["C","Am","F","G"],"timeSignature":"4/4","tempo":120,"mood":"happy"}]

Available chords: C, C#, D, D#, E, F, F#, G, G#, A, A#, B, and their minor versions (Cm, C#m, etc.)
Default values if not specified: 4 chords, 4/4 time, 120 BPM, "neutral" mood

Examples:
User: "Create a sad progression with 4 chords"
Assistant: "I've created a melancholic progression in A minor. Starting with Am, moving to F for emotional depth, then C for lift, and Dm to bring it back down. This creates that bittersweet feeling you're looking for. [PROGRESSION:{"chords":["Am","F","C","Dm"],"timeSignature":"4/4","tempo":90,"mood":"sad"}]"

User: "Make it more upbeat"
Assistant: "Let me brighten that up! I've switched to C major and increased the tempo. This progression has more energy while keeping some emotional depth. [PROGRESSION:{"chords":["C","G","Am","F"],"timeSignature":"4/4","tempo":130,"mood":"upbeat"}]"

Conversation history:
${conversationHistory}

User: ${userMessage}
Assistant:`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || 'Failed to call Gemini API');
    }

    const data = await response.json();
    return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await callGeminiAPI(input);
      const progression = parseProgressionFromResponse(response);
      const cleanResponse = response.replace(/\[PROGRESSION:.*?\]/s, '').trim();

      const assistantMessage: Message = {
        role: 'assistant',
        content: cleanResponse,
        progression: progression || undefined
      };

      setMessages(prev => [...prev, assistantMessage]);

      if (progression) {
        setCurrentProgression(progression);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please check your API key and try again.`
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-modal-bg p-6 rounded-2xl shadow-2xl shadow-shadow-dark border border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Sparkles className="w-6 h-6 text-accent-yellow" />
          <h3 className="text-xl md:text-2xl font-bold text-text-primary">Song Composer</h3>
        </div>
        <button
          onClick={() => setShowApiKeyInput(!showApiKeyInput)}
          className="p-2 bg-gray-700 hover:bg-gray-600 text-text-primary rounded-lg transition-colors shadow-md shadow-shadow-dark"
          title="Configure API Key"
        >
          <Key size={20} />
        </button>
      </div>

      {showApiKeyInput && (
        <div className="mb-4 p-4 bg-modal-bg-light rounded-lg shadow-md shadow-shadow-dark">
          <label className="text-text-primary text-sm font-medium block mb-2">
            Gemini API Key
          </label>
          <div className="flex space-x-2">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Enter your Gemini API key..."
              className="flex-1 bg-gray-800 text-text-primary px-3 py-2 rounded border border-gray-600 focus:border-primary-bg-mid focus:outline-none"
            />
            <button
              onClick={saveApiKey}
              className="px-4 py-2 bg-button-primary hover:bg-button-primary/80 text-black rounded-lg transition-colors shadow-md shadow-shadow-dark"
            >
              Save
            </button>
          </div>
          <p className="text-text-primary/60 text-xs mt-2">
            Get your free API key at{' '}
            <a
              href="https://makersuite.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-yellow hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>
      )}

      <div className="bg-gray-900 rounded-lg p-4 h-96 overflow-y-auto mb-4 shadow-inner shadow-shadow-dark">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${
              message.role === 'user' ? 'text-right' : 'text-left'
            }`}
          >
            <div
              className={`inline-block max-w-[80%] p-3 rounded-lg ${
                message.role === 'user'
                  ? 'bg-primary-bg-mid text-text-primary'
                  : 'bg-gray-800 text-text-primary'
              } shadow-md shadow-shadow-dark`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              {message.progression && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <div className="flex flex-wrap gap-2 mb-2">
                    {message.progression.chords.map((chord, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-accent-yellow text-black text-xs font-bold rounded"
                      >
                        {chord}
                      </span>
                    ))}
                  </div>
                  <div className="text-xs text-text-primary/70 space-y-1">
                    <div>Time: {message.progression.timeSignature}</div>
                    <div>Tempo: {message.progression.tempo} BPM</div>
                    <div>Mood: {message.progression.mood}</div>
                  </div>
                  <button
                    onClick={() => {
                      if (isPlaying) {
                        onStopProgression();
                      } else {
                        setCurrentProgression(message.progression!);
                        onPlayProgression(message.progression!);
                      }
                    }}
                    className="mt-2 w-full px-3 py-2 bg-button-primary hover:bg-button-primary/80 text-black rounded transition-colors flex items-center justify-center space-x-2 shadow-md shadow-shadow-dark"
                  >
                    {isPlaying && currentProgression === message.progression ? (
                      <>
                        <Pause size={16} />
                        <span>Stop</span>
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        <span>Play</span>
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="text-left mb-4">
            <div className="inline-block bg-gray-800 text-text-primary p-3 rounded-lg shadow-md shadow-shadow-dark">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-accent-yellow rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-primary-bg-mid rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-accent-orange rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Describe the song you want to create..."
          disabled={isLoading}
          className="flex-1 bg-gray-800 text-text-primary px-4 py-3 rounded-lg border border-gray-600 focus:border-primary-bg-mid focus:outline-none disabled:opacity-50 shadow-inner shadow-shadow-dark"
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="px-6 py-3 bg-button-primary hover:bg-button-primary/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-black rounded-lg transition-colors shadow-md shadow-shadow-dark"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default AISongComposer;
