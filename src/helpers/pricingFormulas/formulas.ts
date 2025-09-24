import { slidingScaleErrorMessages } from "../../errorMessages/caluculator";
import type { SlidingScale } from "../../interfaces/calculator";

export const modularBeveragePricingFormula = (wholeSaleBottlePrice: number | string, markupMultiplier: number | string, bottleSizeInML: number | string, ozPerPour: number | string) => {
  return Number(wholeSaleBottlePrice) * Number(markupMultiplier) / (Number(bottleSizeInML) * 0.033814 / Number(ozPerPour));
}

export const bottlePricingFormula = (wholeSaleBottlePrice: number | string, markupMultiplier: number | string) => {
  return Number(wholeSaleBottlePrice) * Number(markupMultiplier)
}

export const deriveMarkupMultiplier = (costPercentage: string | number) => {
  return (100 / Number(costPercentage));
}

export const deriveSlidingScaleMarkupMultiplier = (slidingScale: SlidingScale, wholeSaleBottlePrice: number | string) => {
  const { lowerBound, upperBound, affectedPriceRangeCeiling, affectedPriceRangeFloor, unitType } = slidingScale
  let lowerBoundMarkupMultiplier = Number(lowerBound)
  let upperBoundMarkupMultiplier = Number(upperBound)
  let multiplier = 0;

  if (unitType === "percentage") {
    lowerBoundMarkupMultiplier = deriveMarkupMultiplier(lowerBound);
    upperBoundMarkupMultiplier = deriveMarkupMultiplier(upperBound);
  }
  
  const interpolationFactor =
    (Number(wholeSaleBottlePrice) - Number(affectedPriceRangeFloor)) /
    (Number(affectedPriceRangeCeiling) - Number(affectedPriceRangeFloor));

  multiplier = (Number(lowerBoundMarkupMultiplier) + (upperBoundMarkupMultiplier - lowerBoundMarkupMultiplier) * interpolationFactor)

  const minimumBoundMarkupMultiplier = Math.min(lowerBoundMarkupMultiplier, upperBoundMarkupMultiplier);
  const maximumBoundMarkupMultiplier = Math.max(lowerBoundMarkupMultiplier, upperBoundMarkupMultiplier);
  if (multiplier < minimumBoundMarkupMultiplier) multiplier = minimumBoundMarkupMultiplier;
  else if (multiplier > maximumBoundMarkupMultiplier) multiplier = maximumBoundMarkupMultiplier;

  return multiplier
}

export const testSlidingScaleMarkupMultiplier = (slidingScale: SlidingScale) => {
  const { affectedPriceRangeFloor, affectedPriceRangeCeiling } = slidingScale
  let index = Number(affectedPriceRangeFloor);
  const getResult = (index: number) => deriveSlidingScaleMarkupMultiplier(slidingScale, index) * index;

  let result: number = getResult(index);
  let error: boolean | string = '';

  while (index < Number(affectedPriceRangeCeiling)) {
    index++;
    const nextResult = getResult(index);
    if (result > nextResult) {
      error = slidingScaleErrorMessages.depreciatingValue;
      break;
    }
    result = nextResult;
  }
  return error;
}

export const isDepreciatingValue = (lowerBound: string | number, upperBound: string | number, affectedPriceRangeFloor: string | number, affectedPriceRangeCeiling: string | number) => {
  return Number(lowerBound) > Number(upperBound) || Number(affectedPriceRangeFloor) > Number(affectedPriceRangeCeiling);
}