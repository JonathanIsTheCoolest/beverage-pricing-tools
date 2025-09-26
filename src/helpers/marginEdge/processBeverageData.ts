import { marginEdgeBevereageUnitNames } from "../../constants/marginEdge";
import type { BeverageData } from "../../interfaces/marginEdge";
import type { SlidingScale } from "../../interfaces/calculator";
import { csvParsingErrorMessages } from "../../errorMessages/csv";
import { modularBeveragePricingFormula, bottlePricingFormula, deriveSlidingScaleMarkupMultiplier } from "../pricingFormulas/formulas";
import { marginEdgeProcessingStatuses } from "../../constants/marginEdge";
import { toCamelCase } from "../general/caseFormatting";

const getUnitQuantity = (string: string) => {
  const numberMatch = string.match(/(\d+(\.\d+)?)/);
  const extractedNumber = parseFloat(numberMatch?.[1] || '0');
  if (extractedNumber) {
    return extractedNumber;
  }
  return '';
}

export const processBeverageData = (data: BeverageData[], markupMultiplier: number, costPercentage: number | string, ozPerPour: number, slidingScale: SlidingScale) => {
  return data.map((row) => {
    let success = marginEdgeProcessingStatuses.success;
    let error: {[key: string]: string} = {};
    let unitName = '';
    let unitQuantity: number | string = '';
    const category = row["Category"];

    const latestPrice = getUnitQuantity(row["Latest Price"]);
    if (slidingScale.isEnabled) {
      markupMultiplier = deriveSlidingScaleMarkupMultiplier(slidingScale, latestPrice);
      costPercentage = (100 / markupMultiplier);
    }

    const unit = Object.values(marginEdgeBevereageUnitNames).find((unit) => {
      const { name } = unit;
      if (row["Report By Unit"].includes(name)) {
        return unit;
      }
    });

    unitName = unit?.name || '';
    unitQuantity = getUnitQuantity(row["Report By Unit"]);

    if (unitName === 'Liter' && !unitQuantity) {
      unitQuantity = 1;
    } else if (!unitName && !unitQuantity) {
      success = marginEdgeProcessingStatuses.partial;
      error[toCamelCase(csvParsingErrorMessages.missingUnitQuantity)] = csvParsingErrorMessages.missingUnitQuantity;
    }

    if (!unitName) {
      error[toCamelCase(csvParsingErrorMessages.missingUnitName)] = csvParsingErrorMessages.missingUnitName;
      unitName = 'Milliliters';
      unitQuantity = 750;
    }

    if (Number(latestPrice) <= 0) {
      success = marginEdgeProcessingStatuses.fail;
      error[toCamelCase(csvParsingErrorMessages.missingPrice)] = csvParsingErrorMessages.missingPrice;
    }

    const unitQuantityInMilliliters = Number(unitQuantity) * (marginEdgeBevereageUnitNames[toCamelCase(unitName) as keyof typeof marginEdgeBevereageUnitNames]?.measurementInMilliliters || 0);

    const pricePerOzAtCostPercentageValue = Math.max(modularBeveragePricingFormula(latestPrice, markupMultiplier, unitQuantityInMilliliters, ozPerPour), Number(slidingScale.pricePerPourFloor)).toFixed(2)
    const pricePerBottleAtCostPercentageValue = Math.max(bottlePricingFormula(latestPrice, markupMultiplier), Number(slidingScale.pricePerBottleFloor)).toFixed(2)

    return {
      name: row["Name"],
      category: category,
      price: latestPrice,
      unitName: unitName,
      unitQuantity: unitQuantity,
      unitQuantityInMilliliters: unitQuantityInMilliliters,
      ozPerPour: ozPerPour,
      costPercentage: costPercentage,
      markupMultiplier: markupMultiplier,
      pricePerBottleAtCostPercentage: pricePerBottleAtCostPercentageValue,
      pricePerPourAtCostPercentage: pricePerOzAtCostPercentageValue,
      success: success,
      error: error,
    };
  }); 
};