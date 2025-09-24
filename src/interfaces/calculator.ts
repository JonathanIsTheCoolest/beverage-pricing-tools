interface SearchFilter {
  name: string;
  description: string;
}

interface SlidingScale {
  lowerBound: string | number;
  upperBound: string | number;
  affectedPriceRangeFloor: string | number;
  affectedPriceRangeCeiling: string | number;
  pricePerPourFloor: string | number;
  pricePerBottleFloor: string | number;
  unitType: 'percentage' | 'markupMultiplier';
  isEnabled: boolean;
}

export type { SearchFilter, SlidingScale };