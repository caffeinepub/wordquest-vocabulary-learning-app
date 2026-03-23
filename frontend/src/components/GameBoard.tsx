import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, Lightbulb, Lock, Play } from 'lucide-react';
import { toast } from 'sonner';
import type { Puzzle } from '../backend';
import DecoderWheel from './DecoderWheel';
import MorseSimulator from './MorseSimulator';

interface GameBoardProps {
  currentLevel: number;
  puzzles: Puzzle[];
  completedLevels: Set<number>;
  onLevelComplete: (puzzleId: number, timeSpent: number) => void;
  onHintUsed: (puzzleId: number) => void;
  onShowTutorial: () => void;
}

export default function GameBoard({
  currentLevel,
  puzzles,
  completedLevels,
  onLevelComplete,
  onHintUsed,
  onShowTutorial,
}: GameBoardProps) {
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [showTools, setShowTools] = useState(false);

  const currentPuzzle = puzzles.find(p => Number(p.level) === currentLevel);
  const isCompleted = currentPuzzle ? completedLevels.has(Number(currentPuzzle.id)) : false;
  const progress = (completedLevels.size / puzzles.length) * 100;

  useEffect(() => {
    setUserAnswer('');
    setShowHint(false);
    setStartTime(Date.now());
    setShowTools(false);
  }, [currentLevel]);

  const handleVerify = () => {
    if (!currentPuzzle) return;
    
    setIsVerifying(true);
    
    setTimeout(() => {
      const normalizedAnswer = userAnswer.trim().toLowerCase();
      const normalizedSolution = currentPuzzle.solution.trim().toLowerCase();
      
      if (normalizedAnswer === normalizedSolution) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        toast.success('Mission Complete!', {
          description: 'You successfully decoded the message!',
        });
        onLevelComplete(Number(currentPuzzle.id), timeSpent);
      } else {
        toast.error('Incorrect Answer', {
          description: 'Try again, agent. Review the cipher carefully.',
        });
      }
      
      setIsVerifying(false);
    }, 800);
  };

  const handleShowHint = () => {
    if (!currentPuzzle) return;
    setShowHint(true);
    onHintUsed(Number(currentPuzzle.id));
    toast.info('Hint Revealed', {
      description: 'Use this clue to help decode the message.',
    });
  };

  if (!currentPuzzle) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-card to-card/50">
          <CardContent className="py-12 text-center">
            <CheckCircle2 className="h-16 w-16 text-primary mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">All Missions Complete!</h2>
            <p className="text-muted-foreground mb-6">
              Congratulations, Agent! You've successfully completed all training missions.
            </p>
            <Button onClick={onShowTutorial}>Review Training Materials</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getCipherTypeName = (type: string): string => {
    const names: Record<string, string> = {
      caesarShift: 'Caesar Shift',
      symbolReplacement: 'Symbol Replacement',
      numberToLetter: 'Number Code',
      scrambledSentence: 'Scrambled Message',
      morseCode: 'Morse Code',
      vigenere: 'Vigenère Cipher',
      playfair: 'Playfair Cipher',
      layered: 'Layered Cipher',
    };
    return names[type] || type;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Progress Bar */}
      <Card className="border-primary/20 bg-gradient-to-r from-card to-card/50">
        <CardContent className="py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Training Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedLevels.size} / {puzzles.length} Missions
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Mission Brief */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-0"></div>
        
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="border-primary/50">
                  Level {currentLevel}
                </Badge>
                <Badge variant="secondary">
                  {getCipherTypeName(currentPuzzle.cipherType)}
                </Badge>
                {isCompleted && (
                  <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                    <CheckCircle2 className="h-3 w-3 mr-1" />
                    Completed
                  </Badge>
                )}
              </div>
              <CardTitle className="text-2xl">Mission Briefing</CardTitle>
              <CardDescription className="mt-2">
                {currentPuzzle.storyPart}
              </CardDescription>
            </div>
            <img 
              src="/assets/generated/classified-folder-transparent.dim_64x64.png" 
              alt="Classified"
              className="w-16 h-16 opacity-50"
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Coded Message */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent rounded-lg blur-xl"></div>
            <div className="relative bg-secondary/50 backdrop-blur-sm p-6 rounded-lg border border-primary/20">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">ENCRYPTED MESSAGE</span>
              </div>
              <p className="font-mono text-lg tracking-wide break-all">
                {currentPuzzle.codedMessage}
              </p>
            </div>
          </div>

          {/* Hint Section */}
          {showHint && (
            <div className="bg-accent/50 backdrop-blur-sm p-4 rounded-lg border border-accent">
              <div className="flex items-start gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm mb-1">Intelligence Hint:</p>
                  <p className="text-sm text-muted-foreground">{currentPuzzle.hint}</p>
                </div>
              </div>
            </div>
          )}

          {/* Answer Input */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Your Decoded Message:</label>
            <Input
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter the decoded message..."
              className="font-mono text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !isVerifying) {
                  handleVerify();
                }
              }}
              disabled={isCompleted}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={handleVerify}
              disabled={!userAnswer.trim() || isVerifying || isCompleted}
              className="flex-1 min-w-[140px]"
              size="lg"
            >
              {isVerifying ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2"></div>
                  Verifying...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Verify Answer
                </>
              )}
            </Button>

            {!showHint && !isCompleted && (
              <Button
                onClick={handleShowHint}
                variant="outline"
                size="lg"
                className="min-w-[140px]"
              >
                <Lightbulb className="h-4 w-4 mr-2" />
                Request Hint
              </Button>
            )}

            <Button
              onClick={() => setShowTools(!showTools)}
              variant="outline"
              size="lg"
              className="min-w-[140px]"
            >
              <Play className="h-4 w-4 mr-2" />
              {showTools ? 'Hide' : 'Show'} Tools
            </Button>
          </div>

          {/* Decoder Tools */}
          {showTools && (
            <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <DecoderWheel />
              <MorseSimulator />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Level Navigation */}
      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          disabled={currentLevel <= 1}
          onClick={() => window.location.reload()}
        >
          Previous Mission
        </Button>
        
        <div className="text-sm text-muted-foreground">
          Mission {currentLevel} of {puzzles.length}
        </div>

        <Button
          variant="outline"
          disabled={currentLevel >= puzzles.length || !isCompleted}
        >
          {!isCompleted && <Lock className="h-4 w-4 mr-2" />}
          Next Mission
        </Button>
      </div>
    </div>
  );
}
