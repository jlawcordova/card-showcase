import { ICard } from "../lib/api/card.interface";

export interface TradeCard {
  card: ICard | undefined;
  quantity?: number;
}
