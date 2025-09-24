import { marginEdgeLiquorUnitNames } from "../../constants/marginEdge";
import type { LiquorData, ProcessedLiquorData } from "../../interfaces/marginEdge";
import type { SlidingScale } from "../../interfaces/calculator";
import { csvParsingErrorMessages } from "../../errorMessages/csv";
import { modularBeveragePricingFormula, bottlePricingFormula, deriveSlidingScaleMarkupMultiplier } from "../pricingFormulas/formulas";

const getUnitQuantity = (string: string) => {
  const numberMatch = string.match(/(\d+(\.\d+)?)/);
  const extractedNumber = parseFloat(numberMatch?.[1] || '0');
  if (extractedNumber) {
    return extractedNumber;
  }
  return '';
}

export const processLiquorData = (data: LiquorData[], markupMultiplier: number, costPercentage: number | string, ozPerPour: number, slidingScale: SlidingScale) => {
  return data.map((row) => {
    const latestPrice = getUnitQuantity(row["Latest Price"]);
    if (slidingScale.isEnabled) {
      markupMultiplier = deriveSlidingScaleMarkupMultiplier(slidingScale, latestPrice);
      costPercentage = (100 / markupMultiplier);
    }
    const unit = marginEdgeLiquorUnitNames.find((unit) => {
      const { name } = unit;
      if (row["Report By Unit"].includes(name)) {
        return unit;
      }
    });
    const unitName = unit?.name;
    let unitQuantity: number | string = 0;
    if (unitName) {
      unitQuantity = getUnitQuantity(row["Report By Unit"]);
      if (!unitQuantity) {
        unitQuantity = 1;
       }
    }

    const unitQuantityInMilliliters = unitName ? Number(unitQuantity) * (unit?.measurementInMilliliters || 0) : csvParsingErrorMessages.missingUnit;

    const pricePerOzAtCostPercentageValue = modularBeveragePricingFormula(latestPrice, markupMultiplier, unitQuantityInMilliliters, ozPerPour).toFixed(2)
    const pricePerBottleAtCostPercentageValue = bottlePricingFormula(latestPrice, markupMultiplier).toFixed(2)

    return {
      name: row["Name"],
      price: latestPrice,
      unit: unitName,
      unitQuantity: unitName ? unitQuantity : csvParsingErrorMessages.missingUnit,
      unitQuantityInMilliliters: unitName ? unitQuantityInMilliliters : csvParsingErrorMessages.missingUnit,
      ozPerPour: ozPerPour,
      costPercentage: costPercentage,
      markupMultiplier: markupMultiplier,
      pricePerBottleAtCostPercentage: pricePerBottleAtCostPercentageValue !== 'NaN' ? `$${pricePerBottleAtCostPercentageValue}` : csvParsingErrorMessages.missingUnit,
      pricePerPourAtCostPercentage: pricePerOzAtCostPercentageValue !== 'NaN' ? `$${pricePerOzAtCostPercentageValue}` : csvParsingErrorMessages.missingUnit,
    };
  }); 
};