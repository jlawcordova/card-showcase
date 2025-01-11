import Card from "./components/card";
import { ICard } from "./lib/api/card.interface";
import { ForTrade } from "./lib/api/for-trade.const";
import { TradeCard } from "./components/trade-card.interface";
import Heading1 from "./components/heading-1";
import { Wishlist } from "./lib/api/wishlist.const";
import Heading2 from "./components/heading-2";

export default async function Home() {
  const cardSearchParams = new URLSearchParams();
  const q = ForTrade.map((card) => `id:${card.id}`).join(" OR ");
  cardSearchParams.append("q", q);
  cardSearchParams.append("orderBy", "-set.releaseDate,-number");

  const serverCards = await fetch(
    `https://api.pokemontcg.io/v2/cards?${cardSearchParams}`
  );

  const response = await serverCards.json();
  const cards = response.data as ICard[];

  const wishlistParams = new URLSearchParams();
  const qWishlist = Wishlist.map((w) => w.content)
    .flat()
    .map((card) => `id:${card.id}`)
    .join(" OR ");
  wishlistParams.append("q", qWishlist);
  wishlistParams.append("orderBy", "-set.releaseDate,-number");

  const serverWishlistCards = await fetch(
    `https://api.pokemontcg.io/v2/cards?${wishlistParams}`
  );

  const wishlistResponse = await serverWishlistCards.json();
  const wishlistServerCards = wishlistResponse.data as ICard[];

  // const tradeCards: TradeCard[] = ForTrade.map((f) => {
  //   const card = cards.find((c) => c.id === f.id);

  //   return {
  //     card: card,
  //     quantity: f.quantity,
  //   };
  // });

  const tradeCards: TradeCard[] = cards.map((c) => {
    const forTrade = ForTrade.find((t) => t.id === c.id);

    return {
      card: c,
      quantity: forTrade?.quantity ?? 0,
    };
  });

  const wishlistCards: {
    id: string;
    section: string;
    description: string;
    content: TradeCard[];
  }[] = Wishlist.map((w) => {
    const content = w.content.map((c) => {
      const card = wishlistServerCards.find((wc) => wc.id === c.id);

      return {
        card: card,
        quantity: c?.quantity ?? 0,
      };
    });

    return {
      id: w.id,
      section: w.name,
      description: w.description,
      content: content,
    };
  });

  // wishlistServerCards.map((c) => {
  //   return {
  //     card: c,
  //   };
  // });

  return (
    <main>
      <div
        className="text-white"
        style={{
          backgroundImage: "url(/backgrounds/icon-patterns-3.png)",
          backgroundColor: "#232323",
        }}
      >
        <div className="px-8 lg:px-48 pb-16">
          <div className="py-8">
            <Heading1>For Trade</Heading1>
          </div>
          <div className="gap-4 gap-y-12 lg:gap-12 lg:gap-y-14 flex flex-wrap justify-start">
            {tradeCards?.map((tradeCard, i) => (
              <div
                key={tradeCard?.card?.id}
                className="w-[calc(50%-0.5rem)] lg:w-[calc(25%-2.25rem)]"
              >
                <Card tradeCard={tradeCard} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        className="text-white"
        style={{
          backgroundImage:
            "url(/backgrounds/checker-pattern-1.png), linear-gradient(108deg, #135465 0%, #07809e 47%, #1a6b80 100%)",
        }}
      >
        <div className="px-8 lg:px-48 pb-16">
          <div className="pt-8">
            <Heading1>Wishlist</Heading1>
          </div>
          {wishlistCards?.map((wishlistCard, i) => (
            <div key={wishlistCard.id}>
              <Heading2>{wishlistCard.section}</Heading2>
              <p className="mb-6">{wishlistCard.description}</p>
              <div className="mb-16 gap-4 gap-y-12 lg:gap-12 lg:gap-y-14 flex flex-wrap justify-start">
                {wishlistCard.content?.map((card, i) => (
                  <div
                    key={card?.card?.id}
                    className="w-[calc(50%-0.5rem)] lg:w-[calc(25%-2.25rem)]"
                  >
                    <Card tradeCard={card} quantityText="Piece(s)" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
