import Map "mo:core/Map";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import List "mo:core/List";
import Order "mo:core/Order";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Runtime "mo:core/Runtime";

actor {
  // Types
  type CipherType = {
    #caesarShift;
    #symbolReplacement;
    #numberToLetter;
    #scrambledSentence;
    #morseCode;
    #vigenere;
    #playfair;
    #layered;
  };

  type Puzzle = {
    id : Nat;
    level : Nat;
    cipherType : CipherType;
    codedMessage : Text;
    solution : Text;
    hint : Text;
    storyPart : Text;
    difficulty : Nat;
  };

  type Achievement = {
    name : Text;
    description : Text;
    badgeIcon : Text;
    criteria : Text;
  };

  type Tutorial = {
    cipherType : CipherType;
    explanation : Text;
    example : Text;
    tip : Text;
  };

  type StorySegment = {
    level : Nat;
    narrative : Text;
  };

  // Core logic
  module Puzzle {
    public func compare(puzzle1 : Puzzle, puzzle2 : Puzzle) : Order.Order {
      Nat.compare(puzzle1.id, puzzle2.id);
    };
  };

  let puzzles = Map.empty<Nat, Puzzle>();
  let achievements = Map.empty<Text, Achievement>();
  let tutorials = Map.empty<Text, Tutorial>();
  let story = Map.empty<Nat, StorySegment>();

  var nextPuzzleId = 1;

  // Core Operations
  public shared ({ caller }) func addPuzzle(
    level : Nat,
    cipherType : CipherType,
    codedMessage : Text,
    solution : Text,
    hint : Text,
    storyPart : Text,
    difficulty : Nat,
  ) : async Nat {
    let puzzle : Puzzle = {
      id = nextPuzzleId;
      level;
      cipherType;
      codedMessage;
      solution;
      hint;
      storyPart;
      difficulty;
    };

    puzzles.add(nextPuzzleId, puzzle);
    nextPuzzleId += 1;
    nextPuzzleId - 1;
  };

  public query ({ caller }) func getPuzzle(id : Nat) : async Puzzle {
    switch (puzzles.get(id)) {
      case (null) { Runtime.trap("Puzzle not found") };
      case (?puzzle) { puzzle };
    };
  };

  public query ({ caller }) func getPuzzlesByLevel(level : Nat) : async [Puzzle] {
    let listBuilder = List.empty<Puzzle>();

    for ((_, puzzle) in puzzles.entries()) {
      if (puzzle.level == level) {
        listBuilder.add(puzzle);
      };
    };

    listBuilder.toArray();
  };

  public query ({ caller }) func getAllPuzzles() : async [Puzzle] {
    puzzles.values().toArray().sort();
  };

  public shared ({ caller }) func addAchievement(
    name : Text,
    description : Text,
    badgeIcon : Text,
    criteria : Text,
  ) : async () {
    let achievement : Achievement = {
      name;
      description;
      badgeIcon;
      criteria;
    };

    achievements.add(name, achievement);
  };

  public query ({ caller }) func getAchievement(name : Text) : async Achievement {
    switch (achievements.get(name)) {
      case (null) { Runtime.trap("Achievement not found") };
      case (?achievement) { achievement };
    };
  };

  public query ({ caller }) func getAllAchievements() : async [Achievement] {
    achievements.values().toArray();
  };

  public shared ({ caller }) func addTutorial(
    cipherType : CipherType,
    explanation : Text,
    example : Text,
    tip : Text,
  ) : async () {
    let tut : Tutorial = {
      cipherType;
      explanation;
      example;
      tip;
    };

    let cipherKey = cipherTypeToText(cipherType);
    tutorials.add(cipherKey, tut);
  };

  public query ({ caller }) func getTutorial(cipherType : CipherType) : async Tutorial {
    let cipherKey = cipherTypeToText(cipherType);
    switch (tutorials.get(cipherKey)) {
      case (null) { Runtime.trap("Tutorial not found") };
      case (?tut) { tut };
    };
  };

  public shared ({ caller }) func addStorySegment(level : Nat, narrative : Text) : async () {
    let segment : StorySegment = {
      level;
      narrative;
    };

    story.add(level, segment);
  };

  public query ({ caller }) func getStorySegment(level : Nat) : async StorySegment {
    switch (story.get(level)) {
      case (null) { Runtime.trap("Story segment not found") };
      case (?seg) { seg };
    };
  };

  public query ({ caller }) func getAllStorySegments() : async [StorySegment] {
    story.values().toArray();
  };

  func cipherTypeToText(ct : CipherType) : Text {
    switch (ct) {
      case (#caesarShift) { "caesarShift" };
      case (#symbolReplacement) { "symbolReplacement" };
      case (#numberToLetter) { "numberToLetter" };
      case (#scrambledSentence) { "scrambledSentence" };
      case (#morseCode) { "morseCode" };
      case (#vigenere) { "vigenere" };
      case (#playfair) { "playfair" };
      case (#layered) { "layered" };
    };
  };
};
