import { useState } from "react";

export default function WinePricingCalculator() {
  const [wholesale, setWholesale] = useState<string>("");

  const parsedW: number = parseFloat(wholesale);
  const isValid: boolean = !isNaN(parsedW) && parsedW > 0;
  const wholesaleFixed: number = 14;
  const btbTaper: number = 0.0417;

  const btgMarkup: number | string = isValid ? Math.round((3 + 2 * Math.exp(-0.3 * (parsedW - wholesaleFixed))) * 100) / 100 : "";
  const btgMarkupCapped: number = typeof btgMarkup === "number" ? Math.min(btgMarkup, 5) : 0;
  const btgBottlePrice: number | string = isValid ? Math.round(parsedW * btgMarkupCapped * 100) / 100 : "";
  const btgGlassPrice: number | string = isValid ? Math.round(Math.max(wholesaleFixed, Number(btgBottlePrice) / btgMarkupCapped) * 100) / 100 : "";

  const btbMarkup: number | string = isValid
    ? Math.round(((parsedW - wholesaleFixed) * btbTaper > 0.25 ? 2.75 : 3 - (parsedW - wholesaleFixed) * btbTaper) * 100) / 100
    : "";
  const btbMarkupCapped: number = typeof btbMarkup === "number" ? Math.min(btbMarkup, 3) : 0;
  const adjustedWholesale: number = Math.max(parsedW, wholesaleFixed);
  const btbBottlePrice: number | string = isValid ? Math.round(btbMarkupCapped * adjustedWholesale * 100) / 100 : "";

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
    }}>
      <h1>Wine Pricing Calculator</h1>

      <label>
        <span>Wholesale Price ($)</span>
        <input
          type="number"
          value={wholesale}
          onChange={(e) => setWholesale(e.target.value)}
        />
      </label>

      {isValid && (
        <div>
          <p><strong>BTG Markup Multiplier:</strong> {btgMarkup}</p>
          <p><strong>BTG Bottle Price:</strong> ${btgBottlePrice}</p>
          <p><strong>BTG Glass Price:</strong> ${btgGlassPrice}</p>
          <p><strong>BTB Markup Multiplier:</strong> {btbMarkup}</p>
          <p><strong>BTB Bottle Price:</strong> ${btbBottlePrice}</p>
        </div>
      )}
    </div>
  );
}
