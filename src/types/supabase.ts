export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      achievements: {
        Row: {
          description: string
          id: string
          name: string
          points: number
          requirement_type: string
          requirement_value: number
        }
        Insert: {
          description: string
          id?: string
          name: string
          points: number
          requirement_type: string
          requirement_value: number
        }
        Update: {
          description?: string
          id?: string
          name?: string
          points?: number
          requirement_type?: string
          requirement_value?: number
        }
        Relationships: []
      }
      battle_history: {
        Row: {
          battle_points_gained: number
          created_at: string
          experience_gained: number
          id: string
          opponent_id: string
          player_id: string
          winner_id: string
        }
        Insert: {
          battle_points_gained: number
          created_at?: string
          experience_gained: number
          id?: string
          opponent_id: string
          player_id: string
          winner_id: string
        }
        Update: {
          battle_points_gained?: number
          created_at?: string
          experience_gained?: number
          id?: string
          opponent_id?: string
          player_id?: string
          winner_id?: string
        }
        Relationships: []
      }
      card_instances: {
        Row: {
          card_id: string
          created_at: string
          id: string
          owner_id: string
          serial_number: number
        }
        Insert: {
          card_id: string
          created_at?: string
          id?: string
          owner_id: string
          serial_number: number
        }
        Update: {
          card_id?: string
          created_at?: string
          id?: string
          owner_id?: string
          serial_number?: number
        }
        Relationships: [
          {
            foreignKeyName: "card_instances_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          created_at: string
          defense: number
          description: string | null
          element: string
          id: string
          image_url: string | null
          name: string
          power: number
          rarity: string
        }
        Insert: {
          created_at?: string
          defense: number
          description?: string | null
          element: string
          id?: string
          image_url?: string | null
          name: string
          power: number
          rarity: string
        }
        Update: {
          created_at?: string
          defense?: number
          description?: string | null
          element?: string
          id?: string
          image_url?: string | null
          name?: string
          power?: number
          rarity?: string
        }
        Relationships: []
      }
      deck_cards: {
        Row: {
          card_instance_id: string
          deck_id: string
          position: number
        }
        Insert: {
          card_instance_id: string
          deck_id: string
          position: number
        }
        Update: {
          card_instance_id?: string
          deck_id?: string
          position?: number
        }
        Relationships: [
          {
            foreignKeyName: "deck_cards_card_instance_id_fkey"
            columns: ["card_instance_id"]
            isOneToOne: false
            referencedRelation: "card_instances"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deck_cards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
        ]
      }
      decks: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      marketplace_listings: {
        Row: {
          card_instance_id: string
          created_at: string
          id: string
          price: number
          seller_id: string
          status: string
        }
        Insert: {
          card_instance_id: string
          created_at?: string
          id?: string
          price: number
          seller_id: string
          status: string
        }
        Update: {
          card_instance_id?: string
          created_at?: string
          id?: string
          price?: number
          seller_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "marketplace_listings_card_instance_id_fkey"
            columns: ["card_instance_id"]
            isOneToOne: false
            referencedRelation: "card_instances"
            referencedColumns: ["id"]
          },
        ]
      }
      price_history: {
        Row: {
          card_id: string
          id: string
          price: number
          recorded_at: string
        }
        Insert: {
          card_id: string
          id?: string
          price: number
          recorded_at?: string
        }
        Update: {
          card_id?: string
          id?: string
          price?: number
          recorded_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "price_history_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          battle_points: number | null
          created_at: string
          experience: number | null
          id: string
          level: number | null
          losses: number | null
          updated_at: string
          username: string | null
          wins: number | null
        }
        Insert: {
          avatar_url?: string | null
          battle_points?: number | null
          created_at?: string
          experience?: number | null
          id: string
          level?: number | null
          losses?: number | null
          updated_at?: string
          username?: string | null
          wins?: number | null
        }
        Update: {
          avatar_url?: string | null
          battle_points?: number | null
          created_at?: string
          experience?: number | null
          id?: string
          level?: number | null
          losses?: number | null
          updated_at?: string
          username?: string | null
          wins?: number | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          listing_id: string
          price: number
          seller_id: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          listing_id: string
          price: number
          seller_id: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          listing_id?: string
          price?: number
          seller_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "marketplace_listings"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          unlocked_at: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          unlocked_at?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          unlocked_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
