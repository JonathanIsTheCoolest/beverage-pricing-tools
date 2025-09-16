import { useState } from "react";

export const SpiritAndDesertPricingCalculator = () => {
  const deriveMarkupMultiplier = (costPercentage: string) => {
    return (100 / Number(costPercentage)).toString();
  }
  const [wholeSaleBottlePrice, setWholeSaleBottlePrice] = useState<string>("");
  const [costPercentage, setCostPercentage] = useState<string>("18");
  const [markupMultiplier, setMarkupMultiplier] = useState<string>(deriveMarkupMultiplier(costPercentage));
  const [bottleSizeInML, setBottleSizeInML] = useState<string>("750");
  const [ozPerPour, setOzPerPour] = useState<string>("2");
  
  const calculateSpiritAndDesertPricing = () => {
    const price = Number(wholeSaleBottlePrice) * Number(markupMultiplier) / (Number(bottleSizeInML) * 0.033814 / Number(ozPerPour));
    return price.toFixed(2);
  };

  const handleCostPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostPercentage(e.target.value);
    setMarkupMultiplier(deriveMarkupMultiplier(e.target.value));
  };

  return (
    <div>
      <h1>
        Spirit and Desert Pricing Calculator
      </h1>
      <label>
        Whole Sale Bottle Price: ($)
      </label>
      <input type="number" value={wholeSaleBottlePrice} onChange={(e) => setWholeSaleBottlePrice(e.target.value)} />
      <br />
      <br />
      <strong>Markup Multiplier Can Be Derived From Cost Percentage or Set Manually</strong>
      <br />
      <label>
        Cost Percentage: (%)
      </label>
      <input type="number" value={costPercentage} onChange={(e) => handleCostPercentageChange(e)} />
      <br />
      <label>
        Markup Multiplier:
      </label>
      <input disabled={costPercentage.length > 0} type="number" value={markupMultiplier} onChange={(e) => setMarkupMultiplier(e.target.value)} />
      <br />
      <br />
      <label>
        Bottle Size in ML:
      </label>
      <input type="number" value={bottleSizeInML} onChange={(e) => setBottleSizeInML(e.target.value)} />
      <br />
      <label>
        Oz Per Pour:
      </label>
      <input type="number" value={ozPerPour} onChange={(e) => setOzPerPour(e.target.value)} />
      <br />
      <label
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Price Per Pour: <span style={{ color: "red" }}>${calculateSpiritAndDesertPricing()}</span>
      </label>
    </div>
  );
};