import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Puzzle, Achievement, Tutorial, StorySegment, CipherType } from '../backend';

export function useGameData() {
  const { actor, isFetching } = useActor();

  const puzzlesQuery = useQuery<Puzzle[]>({
    queryKey: ['puzzles'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPuzzles();
    },
    enabled: !!actor && !isFetching,
  });

  const achievementsQuery = useQuery<Achievement[]>({
    queryKey: ['achievements'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAchievements();
    },
    enabled: !!actor && !isFetching,
  });

  const storyQuery = useQuery<StorySegment[]>({
    queryKey: ['story'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllStorySegments();
    },
    enabled: !!actor && !isFetching,
  });

  return {
    puzzles: puzzlesQuery.data || [],
    achievements: achievementsQuery.data || [],
    story: storyQuery.data || [],
    isLoading: puzzlesQuery.isLoading || achievementsQuery.isLoading || storyQuery.isLoading,
  };
}

export function useTutorial(cipherType: CipherType) {
  const { actor, isFetching } = useActor();

  return useQuery<Tutorial>({
    queryKey: ['tutorial', cipherType],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getTutorial(cipherType);
    },
    enabled: !!actor && !isFetching && !!cipherType,
  });
}

export function useStorySegment(level: number) {
  const { actor, isFetching } = useActor();

  return useQuery<StorySegment>({
    queryKey: ['storySegment', level],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.getStorySegment(BigInt(level));
    },
    enabled: !!actor && !isFetching && level > 0,
  });
}
