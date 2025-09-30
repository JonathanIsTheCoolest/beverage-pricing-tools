import { marginEdgeBevereageUnitNames, marginEdgeBevereageUnitAliases, marginEdgeBeverageCategories } from "../../constants/marginEdge";
import type { BeverageData } from "../../interfaces/marginEdge";
import type { SlidingScale } from "../../interfaces/calculator";
import { csvParsingErrorMessages } from "../../errorMessages/csv";
import { modularBeveragePricingFormula, bottlePricingFormula, deriveSlidingScaleMarkupMultiplier } from "../pricingFormulas/formulas";
import { marginEdgeProcessingStatuses } from "../../constants/marginEdge";
import { toCamelCase } from "../general/caseFormatting";

export const escapeRegex = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export const prepareObjectKeysForRegex = (object: Record<string, any>): string => {
  return Object.keys(object)
    .map(k => escapeRegex(k.trim()).replace(/\s+/g, "\\s*"))
    .sort((a, b) => b.length - a.length)
    .join('|');
}

const checkForAlias = (string: string): { unitName: string, unitQuantity: string } => {
  const aliases = prepareObjectKeysForRegex(marginEdgeBevereageUnitAliases);
  const regex = new RegExp(`\\b(\\d+(?:[.,]\\d+)?)\\s*(${aliases})s?\\b`, "i");
  const match = string.toLowerCase().match(regex);

  const unitName = match?.[2] || '';
  const unitQuantity = match?.[1] || '';
  return { unitName, unitQuantity };
}

const getUnitQuantity = (string: string): number | string => {
  const numberMatch = string.match(/(\d+(\.\d+)?)/);
  const extractedNumber = parseFloat(numberMatch?.[1] || '0');
  if (extractedNumber) {
    return extractedNumber;
  }
  return '';
}

const getMostCommonFormat = (category: string) => {
  const categoryKey = toCamelCase(category) as keyof typeof marginEdgeBeverageCategories;
  return marginEdgeBeverageCategories[categoryKey]?.mostCommonFormat;
}

export const processBeverageData = (data: BeverageData[], markupMultiplier: number, costPercentage: number | string, ozPerPour: number, slidingScale: SlidingScale) => {
  return data.map((row) => {
    let success = marginEdgeProcessingStatuses.success;
    let error: {[key: string]: string} = {};
    let unitName = '';
    let unitQuantity: number | string = '';
    const category = row["Category"];
    const mostCommonFormat = getMostCommonFormat(category);

    const latestPrice = getUnitQuantity(row["Latest Price"]);
    if (slidingScale.isEnabled) {
      markupMultiplier = deriveSlidingScaleMarkupMultiplier(slidingScale, latestPrice);
      costPercentage = (100 / markupMultiplier);
    }

    let unit = Object.values(marginEdgeBevereageUnitNames).find((unit) => {
      const { name } = unit;
      if (row["Report By Unit"].includes(name)) {
        return unit;
      }
    });

    if (!unit) {
      const { unitName, unitQuantity: unitQuantityAlias } = checkForAlias(row["Name"]);
      unit = marginEdgeBevereageUnitAliases[toCamelCase(unitName) as keyof typeof marginEdgeBevereageUnitAliases];
      unitQuantity = getUnitQuantity(unitQuantityAlias);
    }

    unitName = unit?.name || '';
    unitQuantity = unitQuantity || getUnitQuantity(row["Report By Unit"]);

    if (unitName === 'Liter' && !unitQuantity) {
      unitQuantity = 1;
    } else if (!unitName && !unitQuantity) {
      success = marginEdgeProcessingStatuses.partial;
      error[toCamelCase(csvParsingErrorMessages.missingUnitQuantity)] = csvParsingErrorMessages.missingUnitQuantity;
    }

    if (!unitName) {
      error[toCamelCase(csvParsingErrorMessages.missingUnitName)] = csvParsingErrorMessages.missingUnitName;
      success = marginEdgeProcessingStatuses.partial;
      unitName = mostCommonFormat?.unitName || 'Milliliters';
      unitQuantity = mostCommonFormat?.unitQuantity || 750;
    }

    if (Number(latestPrice) <= 0) {
      success = marginEdgeProcessingStatuses.fail;
      error[toCamelCase(csvParsingErrorMessages.missingPrice)] = csvParsingErrorMessages.missingPrice;
    }

    const unitQuantityInMilliliters = Number(unitQuantity) * (marginEdgeBevereageUnitAliases[toCamelCase(unitName) as keyof typeof marginEdgeBevereageUnitAliases]?.measurementInMilliliters || 0);

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