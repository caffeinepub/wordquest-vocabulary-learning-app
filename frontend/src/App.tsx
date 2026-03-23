import { useState, useEffect } from 'react';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import Header from './components/Header';
import Footer from './components/Footer';
import GameBoard from './components/GameBoard';
import TutorialDialog from './components/TutorialDialog';
import AchievementsPanel from './components/AchievementsPanel';
import StoryDialog from './components/StoryDialog';
import { useGameData } from './hooks/useQueries';

function App() {
  const [currentLevel, setCurrentLevel] = useState(1);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const [showStory, setShowStory] = useState(false);
  const [completedLevels, setCompletedLevels] = useState<Set<number>>(new Set());
  const [hintsUsed, setHintsUsed] = useState<Set<number>>(new Set());
  const [solveTime, setSolveTime] = useState<number>(0);
  const [earnedAchievements, setEarnedAchievements] = useState<Set<string>>(new Set());

  const { puzzles, achievements, isLoading } = useGameData();

  // Load saved progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('juniorCodebreakers');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setCurrentLevel(data.currentLevel || 1);
        setCompletedLevels(new Set(data.completedLevels || []));
        setHintsUsed(new Set(data.hintsUsed || []));
        setEarnedAchievements(new Set(data.earnedAchievements || []));
      } catch (e) {
        console.error('Failed to load saved progress');
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    const data = {
      currentLevel,
      completedLevels: Array.from(completedLevels),
      hintsUsed: Array.from(hintsUsed),
      earnedAchievements: Array.from(earnedAchievements),
    };
    localStorage.setItem('juniorCodebreakers', JSON.stringify(data));
  }, [currentLevel, completedLevels, hintsUsed, earnedAchievements]);

  const handleLevelComplete = (puzzleId: number, timeSpent: number) => {
    setCompletedLevels(prev => new Set([...prev, puzzleId]));
    setSolveTime(timeSpent);
    
    // Check for achievements
    const newAchievements = new Set(earnedAchievements);
    
    // Fast Decoder: solved in under 30 seconds
    if (timeSpent < 30 && !hintsUsed.has(puzzleId)) {
      newAchievements.add('Fast Decoder');
    }
    
    // No Hints Hero: completed 5 levels without hints
    const levelsWithoutHints = Array.from(completedLevels).filter(id => !hintsUsed.has(id));
    if (levelsWithoutHints.length >= 5) {
      newAchievements.add('No Hints Hero');
    }
    
    setEarnedAchievements(newAchievements);
    
    // Show story after completing level
    setTimeout(() => setShowStory(true), 500);
  };

  const handleHintUsed = (puzzleId: number) => {
    setHintsUsed(prev => new Set([...prev, puzzleId]));
  };

  const handleNextLevel = () => {
    setCurrentLevel(prev => prev + 1);
    setShowStory(false);
  };

  const handleResetProgress = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setCurrentLevel(1);
      setCompletedLevels(new Set());
      setHintsUsed(new Set());
      setEarnedAchievements(new Set());
      localStorage.removeItem('juniorCodebreakers');
    }
  };

  if (isLoading) {
    return (
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            <p className="mt-4 text-muted-foreground">Loading mission data...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background flex flex-col">
        <Header 
          onShowTutorial={() => setShowTutorial(true)}
          onShowAchievements={() => setShowAchievements(true)}
          onResetProgress={handleResetProgress}
          earnedAchievementsCount={earnedAchievements.size}
        />
        
        <main className="flex-1 container mx-auto px-4 py-8">
          <GameBoard
            currentLevel={currentLevel}
            puzzles={puzzles}
            completedLevels={completedLevels}
            onLevelComplete={handleLevelComplete}
            onHintUsed={handleHintUsed}
            onShowTutorial={() => setShowTutorial(true)}
          />
        </main>

        <Footer />

        <TutorialDialog 
          open={showTutorial} 
          onOpenChange={setShowTutorial}
        />

        <AchievementsPanel
          open={showAchievements}
          onOpenChange={setShowAchievements}
          achievements={achievements}
          earnedAchievements={earnedAchievements}
        />

        <StoryDialog
          open={showStory}
          onOpenChange={setShowStory}
          level={currentLevel}
          onNextLevel={handleNextLevel}
          hasMoreLevels={currentLevel < (puzzles?.length || 0)}
        />

        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default App;
