export const spiritAndDesertWinePricingFormula = (wholeSaleBottlePrice: number | string, markupMultiplier: number | string, bottleSizeInML: number | string, ozPerPour: number | string) => {
  return Number(wholeSaleBottlePrice) * Number(markupMultiplier) / (Number(bottleSizeInML) * 0.033814 / Number(ozPerPour));
}

export const deriveMarkupMultiplier = (costPercentage: string) => {
  return (100 / Number(costPercentage)).toString();
}