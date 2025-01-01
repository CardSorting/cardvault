import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Tables } from "@/lib/supabase/types";

type Card = Tables<"cards">;

export function useCards() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchCards();
  }, []);

  async function fetchCards() {
    try {
      const { data, error } = await supabase
        .from("cards")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setCards(data);
    } catch (e) {
      setError(e instanceof Error ? e : new Error("An error occurred"));
    } finally {
      setLoading(false);
    }
  }

  async function addCard(card: Omit<Tables<"cards">, "id" | "created_at">) {
    try {
      const { data, error } = await supabase
        .from("cards")
        .insert([card])
        .select()
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
    addCard,
    refreshCards: fetchCards,
  };
}
