import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function DecoderWheel() {
  const [shift, setShift] = useState(3);
  const [inputText, setInputText] = useState('');

  const caesarShift = (text: string, shiftAmount: number): string => {
    return text
      .toUpperCase()
      .split('')
      .map((char) => {
        if (char >= 'A' && char <= 'Z') {
          const code = char.charCodeAt(0);
          const shifted = ((code - 65 + shiftAmount) % 26) + 65;
          return String.fromCharCode(shifted);
        }
        return char;
      })
      .join('');
  };

  const decoded = caesarShift(inputText, shift);

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <img 
            src="/assets/generated/decoder-wheel.dim_200x200.png" 
            alt="Decoder Wheel"
            className="w-8 h-8"
          />
          Caesar Decoder Wheel
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="shift" className="text-xs">Shift Amount: {shift}</Label>
          <input
            id="shift"
            type="range"
            min="1"
            max="25"
            value={shift}
            onChange={(e) => setShift(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
          />
        </div>
        
        <div>
          <Label htmlFor="input" className="text-xs">Input Text</Label>
          <Input
            id="input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to decode..."
            className="font-mono text-sm"
          />
        </div>

        {decoded && (
          <div>
            <Label className="text-xs">Decoded Result</Label>
            <div className="bg-secondary/50 p-3 rounded-md font-mono text-sm break-all">
              {decoded}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
