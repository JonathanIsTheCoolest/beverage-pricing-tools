import { marginEdgeLiquorUnitNames } from "../../constants/marginEdge";
import type { LiquorData, ProcessedLiquorData } from "../../interfaces/marginEdge";
import { csvParsingErrorMessages } from "../../errorMessages/csv";
import { spiritAndDesertWinePricingFormula } from "../spiritAndDesertWinePricing/formulas";

const getUnitQuantity = (string: string) => {
  const numberMatch = string.match(/(\d+(\.\d+)?)/);
  const extractedNumber = parseFloat(numberMatch?.[1] || '0');
  if (extractedNumber) {
    return extractedNumber;
  }
  return '';
}

export const processLiquorData = (data: LiquorData[], markupMultiplier: number, costPercentage: number, ozPerPour: number) => {
  return data.map((row) => {
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

    const pricePerOzAtCostPercentageValue = spiritAndDesertWinePricingFormula(getUnitQuantity(row["Latest Price"]), markupMultiplier, unitQuantityInMilliliters, ozPerPour).toFixed(2)

    return {
      name: row["Name"],
      price: row["Latest Price"],
      unit: unitName,
      unitQuantity: unitName ? unitQuantity : csvParsingErrorMessages.missingUnit,
      unitQuantityInMilliliters: unitName ? unitQuantityInMilliliters : csvParsingErrorMessages.missingUnit,
      ozPerPour: ozPerPour,
      costPercentage: costPercentage,
      pricePerPourAtCostPercentage: pricePerOzAtCostPercentageValue !== 'NaN' ? `$${pricePerOzAtCostPercentageValue}` : csvParsingErrorMessages.missingUnit,
    };
  }); 
};