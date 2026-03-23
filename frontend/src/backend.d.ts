import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StorySegment {
    level: bigint;
    narrative: string;
}
export interface Puzzle {
    id: bigint;
    cipherType: CipherType;
    storyPart: string;
    hint: string;
    difficulty: bigint;
    codedMessage: string;
    level: bigint;
    solution: string;
}
export interface Tutorial {
    tip: string;
    cipherType: CipherType;
    explanation: string;
    example: string;
}
export interface Achievement {
    badgeIcon: string;
    name: string;
    description: string;
    criteria: string;
}
export enum CipherType {
    caesarShift = "caesarShift",
    vigenere = "vigenere",
    symbolReplacement = "symbolReplacement",
    layered = "layered",
    playfair = "playfair",
    numberToLetter = "numberToLetter",
    morseCode = "morseCode",
    scrambledSentence = "scrambledSentence"
}
export interface backendInterface {
    addAchievement(name: string, description: string, badgeIcon: string, criteria: string): Promise<void>;
    addPuzzle(level: bigint, cipherType: CipherType, codedMessage: string, solution: string, hint: string, storyPart: string, difficulty: bigint): Promise<bigint>;
    addStorySegment(level: bigint, narrative: string): Promise<void>;
    addTutorial(cipherType: CipherType, explanation: string, example: string, tip: string): Promise<void>;
    getAchievement(name: string): Promise<Achievement>;
    getAllAchievements(): Promise<Array<Achievement>>;
    getAllPuzzles(): Promise<Array<Puzzle>>;
    getAllStorySegments(): Promise<Array<StorySegment>>;
    getPuzzle(id: bigint): Promise<Puzzle>;
    getPuzzlesByLevel(level: bigint): Promise<Array<Puzzle>>;
    getStorySegment(level: bigint): Promise<StorySegment>;
    getTutorial(cipherType: CipherType): Promise<Tutorial>;
}
