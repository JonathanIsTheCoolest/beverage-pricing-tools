import type { SearchFilter, SlidingScale } from "../interfaces/calculator";

const beverageSearchFilters: SearchFilter[] = [
  {
    name: "all",
    description: "All",
  },
  {
    name: "success",
    description: "Successfully Processed",
  },
  {
    name: "partial",
    description: "Partially Processed",
  },
  {
    name: "fail",
    description: "Failed To Process",
  },
]
;

const defaultSlidingScale: SlidingScale = {
  lowerBound: 25,
  upperBound: 33.333333333333333,
  affectedPriceRangeFloor: 10,
  affectedPriceRangeCeiling: 40,
  pricePerPourFloor: 10,
  pricePerBottleFloor: 40,
  unitType: 'percentage',
  isEnabled: false,
};  

export { beverageSearchFilters, defaultSlidingScale };