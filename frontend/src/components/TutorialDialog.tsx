import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TutorialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TutorialDialog({ open, onOpenChange }: TutorialDialogProps) {
  const tutorials = [
    {
      id: 'caesar',
      name: 'Caesar Shift',
      explanation: 'A substitution cipher where each letter is shifted by a fixed number of positions in the alphabet.',
      example: 'With a shift of 3: A→D, B→E, C→F. "HELLO" becomes "KHOOR"',
      tip: 'Try different shift values (1-25) until the message makes sense.',
    },
    {
      id: 'number',
      name: 'Number Code',
      explanation: 'Each number represents a letter position in the alphabet (1=A, 2=B, 3=C, etc.).',
      example: '8-5-12-12-15 decodes to "HELLO"',
      tip: 'Remember: A=1, Z=26. Look for patterns in the numbers.',
    },
    {
      id: 'morse',
      name: 'Morse Code',
      explanation: 'Uses dots (.) and dashes (-) to represent letters. Spaces separate letters, slashes separate words.',
      example: '.... . .-.. .-.. --- decodes to "HELLO"',
      tip: 'Use the Morse simulator tool to practice encoding and decoding.',
    },
    {
      id: 'scrambled',
      name: 'Scrambled Sentence',
      explanation: 'Words or letters are rearranged. Use context clues to unscramble the message.',
      example: '"OLLEH DLROW" unscrambles to "HELLO WORLD"',
      tip: 'Look for common words and letter patterns. The hint will guide you.',
    },
    {
      id: 'symbol',
      name: 'Symbol Replacement',
      explanation: 'Letters are replaced with symbols or other characters. Find the pattern to decode.',
      example: 'If ★=H, ☆=E, ✦=L, ✧=O, then "★☆✦✦✧" = "HELLO"',
      tip: 'Look for repeated symbols - they represent repeated letters.',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Cipher Training Manual</DialogTitle>
          <DialogDescription>
            Learn about different cipher types and decoding techniques
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="caesar" className="w-full">
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="caesar">Caesar</TabsTrigger>
            <TabsTrigger value="number">Number</TabsTrigger>
            <TabsTrigger value="morse">Morse</TabsTrigger>
            <TabsTrigger value="scrambled">Scrambled</TabsTrigger>
            <TabsTrigger value="symbol">Symbol</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            {tutorials.map((tutorial) => (
              <TabsContent key={tutorial.id} value={tutorial.id} className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>{tutorial.name}</CardTitle>
                    <CardDescription>{tutorial.explanation}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Example:</h4>
                      <p className="text-sm bg-secondary/50 p-3 rounded-md font-mono">
                        {tutorial.example}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2 text-sm">Decoding Tip:</h4>
                      <p className="text-sm text-muted-foreground">{tutorial.tip}</p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/20 bg-primary/5">
                  <CardHeader>
                    <CardTitle className="text-base">Practice Strategy</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm space-y-2 text-muted-foreground">
                      <li>• Read the mission briefing carefully for context clues</li>
                      <li>• Use the hint button if you're stuck</li>
                      <li>• Try the decoder tools to experiment with different approaches</li>
                      <li>• Take your time - accuracy is more important than speed</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </ScrollArea>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
