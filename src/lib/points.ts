// Game Points and Achievement System

export interface UserProfile {
  username: string;
  level: number;
  experience: number;
  achievements: Achievement[];
  battlePoints: number;
  cards: string[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  points: number;
  unlocked: boolean;
  date?: Date;
}

// Experience points needed for each level
export const LEVEL_THRESHOLDS = {
  1: 0,
  2: 100,
  3: 250,
  4: 500,
  5: 1000,
  // Add more levels as needed
};

// Battle points rewards
export const BATTLE_REWARDS = {
  WIN: 100,
  DRAW: 50,
  LOSS: 25,
  PERFECT_WIN: 150,
};

// Achievement definitions
export const ACHIEVEMENTS = {
  FIRST_CARD: {
    id: "first_card",
    name: "Card Creator",
    description: "Create your first card",
    points: 50,
  },
  FIRST_BATTLE: {
    id: "first_battle",
    name: "Battle Initiate",
    description: "Complete your first battle",
    points: 100,
  },
  CARD_COLLECTOR: {
    id: "card_collector",
    name: "Card Collector",
    description: "Collect 10 different cards",
    points: 200,
  },
  BATTLE_MASTER: {
    id: "battle_master",
    name: "Battle Master",
    description: "Win 10 battles",
    points: 500,
  },
};

// Local storage keys
const PROFILE_STORAGE_KEY = "cardcraft_profile";

// Get user profile from local storage
export const getUserProfile = (): UserProfile => {
  const stored = localStorage.getItem(PROFILE_STORAGE_KEY);
  if (!stored) {
    const initial: UserProfile = {
      username: "Player",
      level: 1,
      experience: 0,
      achievements: [],
      battlePoints: 0,
      cards: [],
    };
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }
  return JSON.parse(stored);
};

// Update user profile
export const updateProfile = (updates: Partial<UserProfile>): UserProfile => {
  const current = getUserProfile();
  const updated = { ...current, ...updates };
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// Add experience points and check for level up
export const addExperience = (
  amount: number,
): { newLevel: boolean; profile: UserProfile } => {
  const profile = getUserProfile();
  const newExp = profile.experience + amount;

  let newLevel = false;
  let currentLevel = profile.level;

  // Check for level up
  while (
    LEVEL_THRESHOLDS[currentLevel + 1] &&
    newExp >= LEVEL_THRESHOLDS[currentLevel + 1]
  ) {
    currentLevel++;
    newLevel = true;
  }

  const updated = updateProfile({
    experience: newExp,
    level: currentLevel,
  });

  return { newLevel, profile: updated };
};

// Award an achievement
export const awardAchievement = (
  achievementId: string,
): { isNew: boolean; profile: UserProfile } => {
  const profile = getUserProfile();

  // Check if achievement already unlocked
  if (profile.achievements.some((a) => a.id === achievementId)) {
    return { isNew: false, profile };
  }

  const achievement = ACHIEVEMENTS[achievementId];
  if (!achievement) return { isNew: false, profile };

  const updated = updateProfile({
    achievements: [
      ...profile.achievements,
      {
        ...achievement,
        unlocked: true,
        date: new Date(),
      },
    ],
    battlePoints: profile.battlePoints + achievement.points,
  });

  return { isNew: true, profile: updated };
};
