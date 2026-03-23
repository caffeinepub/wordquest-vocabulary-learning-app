import { Shield, Trophy, BookOpen, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onShowTutorial: () => void;
  onShowAchievements: () => void;
  onResetProgress: () => void;
  earnedAchievementsCount: number;
}

export default function Header({ 
  onShowTutorial, 
  onShowAchievements, 
  onResetProgress,
  earnedAchievementsCount 
}: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Shield className="h-8 w-8 text-primary" />
              <div className="absolute inset-0 bg-primary/20 blur-xl"></div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                Junior Codebreakers
              </h1>
              <p className="text-xs text-muted-foreground">Intelligence Training Academy</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowTutorial}
              className="gap-2"
            >
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Tutorial</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowAchievements}
              className="gap-2 relative"
            >
              <Trophy className="h-4 w-4" />
              <span className="hidden sm:inline">Achievements</span>
              {earnedAchievementsCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {earnedAchievementsCount}
                </span>
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onResetProgress}
              className="gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              <span className="hidden sm:inline">Reset</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
