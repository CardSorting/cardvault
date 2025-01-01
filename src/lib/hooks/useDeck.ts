import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/lib/supabase/types";
import { useAuth } from "@/lib/auth/AuthContext";

type DeckWithCards = Tables<"decks"> & {
  deck_cards: (Tables<"deck_cards"> & {
    card_instances: Tables<"card_instances"> & {
      cards: Tables<"cards">;
    };
  })[];
};

export function useDeck(deckId?: string) {
  const { user } = useAuth();
  const [deck, setDeck] = useState<DeckWithCards | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user && deckId) {
      fetchDeck();
    }
  }, [user, deckId]);

  async function fetchDeck() {
    if (!user || !deckId) return;

    try {
      const { data, error } = await supabase
        .from("decks")
        .select(
          `
          *,
          deck_cards (*, card_instances (*, cards (*)))
        `,
        )
        .eq("id", deckId)
        .eq("user_id", user.id)
        .single();

      if (error) throw error;
      setDeck(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }

  async function createDeck(name: string) {
    if (!user) throw new Error("User not authenticated");

    try {
      const { data, error } = await supabase
        .from("decks")
        .insert([
          {
            user_id: user.id,
            name,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
      throw e;
    }
  }

  async function addCardToDeck(cardInstanceId: string, position: number) {
    if (!user || !deckId) throw new Error("Invalid deck or user");

    try {
      const { data, error } = await supabase
        .from("deck_cards")
        .insert([
          {
            deck_id: deckId,
            card_instance_id: cardInstanceId,
            position,
          },
        ])
        .select()
        .single();

      if (error) throw error;
      await fetchDeck();
      return data;
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
      throw e;
    }
  }

  async function removeCardFromDeck(cardInstanceId: string) {
    if (!user || !deckId) throw new Error("Invalid deck or user");

    try {
      const { error } = await supabase
        .from("deck_cards")
        .delete()
        .eq("deck_id", deckId)
        .eq("card_instance_id", cardInstanceId);

      if (error) throw error;
      await fetchDeck();
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
      throw e;
    }
  }

  return {
    deck,
    loading,
    error,
    createDeck,
    addCardToDeck,
    removeCardFromDeck,
    refreshDeck: fetchDeck,
  };
}
