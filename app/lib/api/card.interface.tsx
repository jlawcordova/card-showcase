export interface ICard {
  id: string;
  name: string;
  supertype: string;
  subtypes: string[];
  hp?: string;
  types?: string[];
  evolesFrom?: string;
  evolvesTo?: string[];
  rules?: string[];
  retreatCost?: string[];
  convertedRetreatCost?: number;
  set: ISet;
  number: string;
  artist?: string;
  rarity: string;
  flavorText?: string;
  nationalPokedexNumbers?: number[];
  legalities: ILegality;
  images: ICardImage;
  tcgplayer?: ITCGPlayer;
  cardmarket?: ICardmarket;
}

export interface ISet {
  id: string;
  images: ISetImage;
  legalities: ILegality;
  name: string;
  printedTotal: number;
  ptcgoCode?: string;
  releaseDate: string;
  series: string;
  total: number;
  updatedAt: string;
}

export interface ILegality {
  expanded: Legality | undefined;
  standard: Legality | undefined;
  unlimited: Legality | undefined;
}

export enum Legality {
  LEGAL = "Legal",
  BANNED = "Banned",
}

export interface ISetImage {
  symbol: string;
  logo: string;
}

export interface ICardImage {
  small: string;
  large: string;
}

export interface ITCGPlayer {
  url: string;
  updatedAt: string;
  prices: {
    normal?: IPrice | undefined;
    holofoil?: IPrice | undefined;
    reverseHolofoil?: IPrice | undefined;
    "1stEditionNormal"?: IPrice | undefined;
    "1stEditionHolofoil"?: IPrice | undefined;
  };
}

export interface ICardmarket {
  url: string;
  updatedAt: string;
  prices: {
    averageSellPrice: number | null;
    lowPrice: number | null;
    trendPrice: number | null;
    germanProLow: number | null;
    suggestedPrice: number | null;
    reverseHoloSell: number | null;
    reverseHoloLow: number | null;
    reverseHoloTrend: number | null;
    lowPriceExPlus: number | null;
    avg1: number | null;
    avg7: number | null;
    avg30: number | null;
    reverseHoloAvg1: number | null;
    reverseHoloAvg7: number | null;
    reverseHoloAvg30: number | null;
  };
}

export interface IPrice {
  low: number | null;
  mid: number | null;
  high: number | null;
  market: number | null;
  directLow: number | null;
}
