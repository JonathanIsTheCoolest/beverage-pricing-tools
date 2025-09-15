import { useState } from "react";

export const SpiritAndDesertPricingCalculator = () => {
  const [wholeSaleBottlePrice, setWholeSaleBottlePrice] = useState<number>(0);
  const [markupMultiplier, setMarkupMultiplier] = useState<number>(0);
  const [bottleSizeInML, setBottleSizeInML] = useState<number>(0);
  const [ozPerPour, setOzPerPour] = useState<number>(2);
  
  const calculateSpiritAndDesertPricing = () => {
    const price = wholeSaleBottlePrice * markupMultiplier / (bottleSizeInML * 0.033814 / ozPerPour);
    return price.toFixed(2);
  };

  return (
    <div>
      <h1>
        Spirit and Desert Pricing Calculator
      </h1>
      <label>
        Whole Sale Bottle Price:
      </label>
      <input type="text" value={wholeSaleBottlePrice} onChange={(e) => setWholeSaleBottlePrice(Number(e.target.value))} />
      <label>
        Markup Multiplier:
      </label>
      <input type="text" value={markupMultiplier} onChange={(e) => setMarkupMultiplier(Number(e.target.value))} />
      <label>
        Bottle Size in ML:
      </label>
      <input type="text" value={bottleSizeInML} onChange={(e) => setBottleSizeInML(Number(e.target.value))} />
      <label>
        Oz Per Pour:
      </label>
      <input type="text" value={ozPerPour} onChange={(e) => setOzPerPour(Number(e.target.value))} />
      <label>
        Price Per Pour: ${calculateSpiritAndDesertPricing()}
      </label>
    </div>
  );
};