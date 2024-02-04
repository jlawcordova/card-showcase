import { useEffect, useState } from "react";
import { ICard, Legality } from "./card.interface";
import { Cards } from "./cards.const";

export default function useCards() {
  const [cards, setCards] = useState<ICard[] | undefined>(undefined);

  useEffect(() => {
    setCards(Cards);
  }, []);

  return cards;
}
