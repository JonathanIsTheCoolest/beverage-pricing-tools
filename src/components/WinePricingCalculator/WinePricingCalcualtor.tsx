import { useState } from "react";

export function WinePricingCalculator() {
  const [wholesale, setWholesale] = useState<string>("");

  const parsedW: number = parseFloat(wholesale);
  const isValid: boolean = !isNaN(parsedW) && parsedW > 0;

  // Constants
  const wholesaleFixed: number = 14; // Used for BTG floor
  const btbFloorWholesale: number = 10; // New floor for BTB wholesale
  const btbMarkupRaw = 4 - (parsedW - 10) / 30;

  // BTG Markup & Pricing
  const btgMarkup: number | string = isValid
    ? Math.round((3 + 2 * Math.exp(-0.3 * (parsedW - wholesaleFixed))) * 100) / 100
    : "";
  const btgMarkupCapped: number = typeof btgMarkup === "number" ? Math.min(btgMarkup, 5) : 0;
  const btgBottlePrice: number | string = isValid
    ? Math.round(parsedW * btgMarkupCapped * 100) / 100
    : "";
  const btgGlassPrice: number | string = isValid
    ? Math.round(Math.max(wholesaleFixed, Number(btgBottlePrice) / btgMarkupCapped) * 100) / 100
    : "";

  // BTB Markup Multiplier (new taper logic from 4 to 3)
  const btbMarkup: number | string = isValid
    ? Math.round(Math.min(4, Math.max(3, btbMarkupRaw)) * 100) / 100
    : "";
  const btbMarkupCapped: number = typeof btbMarkup === "number" ? Math.min(btbMarkup, 4) : 0;
  const adjustedWholesale: number = Math.max(parsedW, btbFloorWholesale);
  const btbBottlePrice: number | string = isValid
    ? Math.max(42, Math.round(btbMarkupCapped * adjustedWholesale * 100) / 100)
    : "";

  return (
    <div>
      <h1>Wine Pricing Calculator</h1>

      <label>
        <span>Wholesale Price: ($)</span>
        <input
          type="number"
          value={wholesale}
          onChange={(e) => setWholesale(e.target.value)}
        />
      </label>

      {isValid && (
        <div>
          <p>
            <strong>BTG Markup Multiplier:</strong> {btgMarkup}
          </p>
          <p>
            <strong>BTG Bottle Price:</strong> ${btgBottlePrice}
          </p>
          <p>
            <strong>BTG Glass Price:</strong> ${btgGlassPrice}
          </p>
          <p>
            <strong>BTB Markup Multiplier:</strong> {btbMarkup}
          </p>
          <p>
            <strong>BTB Bottle Price:</strong> ${btbBottlePrice}
          </p>
        </div>
      )}
    </div>
  );
}
