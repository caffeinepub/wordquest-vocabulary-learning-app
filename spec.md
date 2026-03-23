# Junior Codebreakers - Educational Spy Game

## Overview
A single-player educational 2D game where players act as young intelligence agents decoding secret messages to stop a mysterious villain threatening global cybersecurity.

## Core Gameplay
- Players receive coded messages representing spy missions
- Each puzzle must be decoded to unlock the next level and advance the story
- Immediate feedback system with "Verify" button to check answers and "Hint" button for guided clues
- Tutorial popups introduce each cipher type with brief explanations

## Cipher Types
- Substitution ciphers (Caesar shifts, symbol replacements)
- Number-to-letter codes (1=A, 10=J, 26=Z)
- Scrambled sentences with contextual hints
- Morse code challenges
- Layered puzzles combining multiple cipher types
- Advanced ciphers (Vigenère, Playfair) unlock after several levels

## User Interface
- Spy-themed interface resembling tech equipment (radar screens, file folders, glowing terminals)
- Simple and uncluttered layout suitable for children
- Animated transitions between levels
- Subtle sound effects (clicks, chirps, code tones)
- In-game tools like decoder wheel and Morse simulator

## Progression System
- Difficulty scales smoothly with each mission
- Achievement system with badges (Fast Decoder, No Hints Hero, etc.)
- Story progression reveals clues about the villain's plot
- Each completed level unlocks the next mission

## Game State Management
- All game state (current level, progress, achievements, unlocked content) stored in frontend
- No backend persistence of game progress required

## Backend Data Storage
- Static puzzle data including coded messages, solutions, and hints
- Achievement definitions and badge information
- Tutorial content and cipher explanations
- Story narrative text for each mission

## Backend Operations
- Serve puzzle content for each level
- Provide hint system data
- Deliver achievement and badge information
- Supply tutorial and educational content
