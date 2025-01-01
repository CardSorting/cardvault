import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/lib/supabase/types";
import { useAuth } from "@/lib/auth/AuthContext";

type CardInstance = Tables<"card_instances"> & {
  cards: Tables<"cards">;
};

export function useUserCards() {
  const { user } = useAuth();
  const [cards, setCards] = useState<CardInstance[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (user) {
      fetchUserCards();
    }
  }, [user]);

  async function fetchUserCards() {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from("card_instances")
        .select(
          `
          *,
          cards (*)
        `,
        )
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCards(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }

  async function addCardToUser(cardId: string) {
    if (!user) throw new Error("User not authenticated");

    try {
      // Get the highest serial number for this card
      const { data: existingCards, error: serialError } = await supabase
        .from("card_instances")
        .select("serial_number")
        .eq("card_id", cardId)
        .order("serial_number", { ascending: false })
        .limit(1);

      if (serialError) throw serialError;

      const nextSerialNumber = existingCards?.[0]?.serial_number
        ? existingCards[0].serial_number + 1
        : 1;

      const { data, error } = await supabase
        .from("card_instances")
        .insert([
          {
            card_id: cardId,
            owner_id: user.id,
            serial_number: nextSerialNumber,
          },
        ])
        .select(
          `
          *,
          cards (*)
        `,
        )
        .single();

      if (error) throw error;
      setCards((prev) => [data, ...prev]);
      return data;
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
      throw e;
    }
  }

  return {
    cards,
    loading,
    error,
    addCardToUser,
    refreshUserCards: fetchUserCards,
  };
}
