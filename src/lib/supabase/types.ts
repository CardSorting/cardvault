export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      achievements: {
        Row: {
          id: string;
          name: string;
          description: string;
          points: number;
          requirement_type: string;
          requirement_value: number;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          points: number;
          requirement_type: string;
          requirement_value: number;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          points?: number;
          requirement_type?: string;
          requirement_value?: number;
        };
      };
      battle_history: {
        Row: {
          id: string;
          player_id: string;
          opponent_id: string;
          winner_id: string;
          experience_gained: number;
          battle_points_gained: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          player_id: string;
          opponent_id: string;
          winner_id: string;
          experience_gained: number;
          battle_points_gained: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          player_id?: string;
          opponent_id?: string;
          winner_id?: string;
          experience_gained?: number;
          battle_points_gained?: number;
          created_at?: string;
        };
      };
      card_instances: {
        Row: {
          id: string;
          card_id: string;
          owner_id: string;
          serial_number: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          card_id: string;
          owner_id: string;
          serial_number: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          card_id?: string;
          owner_id?: string;
          serial_number?: number;
          created_at?: string;
        };
      };
      cards: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          rarity: "common" | "uncommon" | "rare" | "legendary";
          element: "fire" | "water" | "earth" | "air" | "light" | "dark";
          power: number;
          defense: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          rarity: "common" | "uncommon" | "rare" | "legendary";
          element: "fire" | "water" | "earth" | "air" | "light" | "dark";
          power: number;
          defense: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          rarity?: "common" | "uncommon" | "rare" | "legendary";
          element?: "fire" | "water" | "earth" | "air" | "light" | "dark";
          power?: number;
          defense?: number;
          created_at?: string;
        };
      };
      deck_cards: {
        Row: {
          deck_id: string;
          card_instance_id: string;
          position: number;
        };
        Insert: {
          deck_id: string;
          card_instance_id: string;
          position: number;
        };
        Update: {
          deck_id?: string;
          card_instance_id?: string;
          position?: number;
        };
      };
      decks: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          created_at?: string;
        };
      };
      profiles: {
        Row: {
          id: string;
          username: string | null;
          avatar_url: string | null;
          level: number;
          experience: number;
          battle_points: number;
          wins: number;
          losses: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username?: string | null;
          avatar_url?: string | null;
          level?: number;
          experience?: number;
          battle_points?: number;
          wins?: number;
          losses?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          username?: string | null;
          avatar_url?: string | null;
          level?: number;
          experience?: number;
          battle_points?: number;
          wins?: number;
          losses?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      user_achievements: {
        Row: {
          user_id: string;
          achievement_id: string;
          unlocked_at: string;
        };
        Insert: {
          user_id: string;
          achievement_id: string;
          unlocked_at?: string;
        };
        Update: {
          user_id?: string;
          achievement_id?: string;
          unlocked_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];
export type Insertable<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];
export type Updatable<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];
