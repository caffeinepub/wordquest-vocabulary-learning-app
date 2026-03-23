import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

const MORSE_CODE: Record<string, string> = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

const REVERSE_MORSE = Object.fromEntries(
  Object.entries(MORSE_CODE).map(([k, v]) => [v, k])
);

export default function MorseSimulator() {
  const [inputText, setInputText] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('decode');

  const process = (text: string): string => {
    if (mode === 'encode') {
      return text
        .toUpperCase()
        .split('')
        .map(char => MORSE_CODE[char] || char)
        .join(' ');
    } else {
      return text
        .split(' ')
        .map(code => REVERSE_MORSE[code] || code)
        .join('');
    }
  };

  const result = inputText ? process(inputText) : '';

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <img 
            src="/assets/generated/morse-key.dim_150x100.png" 
            alt="Morse Key"
            className="w-8 h-6"
          />
          Morse Code Simulator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={mode === 'decode' ? 'default' : 'outline'}
            onClick={() => setMode('decode')}
            className="flex-1"
          >
            Decode
          </Button>
          <Button
            size="sm"
            variant={mode === 'encode' ? 'default' : 'outline'}
            onClick={() => setMode('encode')}
            className="flex-1"
          >
            Encode
          </Button>
        </div>

        <div>
          <Label htmlFor="morse-input" className="text-xs">
            {mode === 'encode' ? 'Text to Encode' : 'Morse to Decode'}
          </Label>
          <Input
            id="morse-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={mode === 'encode' ? 'Enter text...' : 'Enter morse code...'}
            className="font-mono text-sm"
          />
        </div>

        {result && (
          <div>
            <Label className="text-xs">Result</Label>
            <div className="bg-secondary/50 p-3 rounded-md font-mono text-sm break-all">
              {result}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
