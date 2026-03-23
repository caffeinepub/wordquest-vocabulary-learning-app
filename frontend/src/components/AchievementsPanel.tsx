import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trophy, Lock } from 'lucide-react';
import type { Achievement } from '../backend';

interface AchievementsPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  achievements: Achievement[];
  earnedAchievements: Set<string>;
}

export default function AchievementsPanel({
  open,
  onOpenChange,
  achievements,
  earnedAchievements,
}: AchievementsPanelProps) {
  const getAchievementIcon = (name: string): string => {
    if (name.includes('Fast')) return '/assets/generated/fast-decoder-badge-transparent.dim_100x100.png';
    if (name.includes('Hints')) return '/assets/generated/no-hints-badge-transparent.dim_100x100.png';
    return '/assets/generated/fast-decoder-badge-transparent.dim_100x100.png';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Trophy className="h-6 w-6 text-primary" />
            Agent Achievements
          </DialogTitle>
          <DialogDescription>
            Track your progress and unlock special badges
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[500px] pr-4">
          <div className="grid gap-4">
            {achievements.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="py-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <p className="text-muted-foreground">No achievements available yet.</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Complete missions to earn badges!
                  </p>
                </CardContent>
              </Card>
            ) : (
              achievements.map((achievement) => {
                const isEarned = earnedAchievements.has(achievement.name);
                
                return (
                  <Card
                    key={achievement.name}
                    className={`transition-all ${
                      isEarned
                        ? 'border-primary/50 bg-gradient-to-br from-primary/10 to-transparent'
                        : 'opacity-60 border-dashed'
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <img
                            src={getAchievementIcon(achievement.name)}
                            alt={achievement.name}
                            className={`w-16 h-16 ${!isEarned && 'grayscale opacity-50'}`}
                          />
                          {!isEarned && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <Lock className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-bold text-lg">{achievement.name}</h3>
                            {isEarned && (
                              <Badge className="bg-green-500/20 text-green-500 border-green-500/50">
                                Earned
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {achievement.description}
                          </p>
                          <p className="text-xs text-muted-foreground italic">
                            {achievement.criteria}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
