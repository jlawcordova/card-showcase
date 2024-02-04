import Image from "next/image";
import ShinyCard from "../lib/shiny-card/shiny-card";
import { TradeCard } from "./trade-card.interface";
import CardMarketLogo from "../assets/card-market.png";

export default function Card({
  tradeCard,
  quantityText = "Available",
}: {
  tradeCard: TradeCard;
  quantityText?: string;
}) {
  const card = tradeCard.card;

  if (!card) {
    return null;
  }

  return (
    <div>
      <ShinyCard zTranslateMaxStrength={24} rotationMaxStrength={12}>
        <div className="w-full" style={{ aspectRatio: 6.3 / 8.8 }}></div>
        <Image
          src={card.images.large}
          alt={`${card.name} card`}
          fill={true}
        ></Image>
      </ShinyCard>
      <h1 className="mt-4 font-bold">{card.name}</h1>
      <p>
        <Image
          className="inline pr-2 align-top"
          src={card.set.images.symbol}
          alt={`${card.name} card`}
          width={32}
          height={32}
        ></Image>
        {card.set.name} - {card.number}/{card.set.printedTotal}
      </p>
      <p>{card.rarity}</p>
      {tradeCard.quantity && (
        <p className="mt-2 text-sm text-[#FFF56D]">
          {tradeCard.quantity} {quantityText}
        </p>
      )}
      {/* <Image src={CardMarketLogo} alt="" width={24} height={24} />
      <p>€{tradeCard.card?.cardmarket?.prices.averageSellPrice}</p>
      <Image
        src="https://mp-assets.tcgplayer.com/img/TCGplayer-logo-primary@2x.png"
        alt=""
        width={32}
        height={32}
      />
      <p>${tradeCard.card?.tcgplayer?.prices.holofoil?.market}</p> */}
    </div>
  );
}
