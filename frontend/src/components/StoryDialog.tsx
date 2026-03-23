import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useStorySegment } from '../hooks/useQueries';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface StoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  level: number;
  onNextLevel: () => void;
  hasMoreLevels: boolean;
}

export default function StoryDialog({
  open,
  onOpenChange,
  level,
  onNextLevel,
  hasMoreLevels,
}: StoryDialogProps) {
  const { data: storySegment, isLoading } = useStorySegment(level);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
            Mission Complete!
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
            </div>
          ) : storySegment ? (
            <div className="space-y-4">
              <div className="bg-secondary/50 p-6 rounded-lg border border-primary/20">
                <p className="text-base leading-relaxed">{storySegment.narrative}</p>
              </div>
              
              {hasMoreLevels && (
                <div className="bg-accent/30 p-4 rounded-lg border border-accent">
                  <p className="text-sm text-muted-foreground">
                    The investigation continues. Your next mission awaits, Agent.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Story segment not available.</p>
            </div>
          )}
        </div>

        <DialogFooter>
          {hasMoreLevels ? (
            <Button onClick={onNextLevel} size="lg" className="w-full">
              Continue to Next Mission
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={() => onOpenChange(false)} size="lg" className="w-full">
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
