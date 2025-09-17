import type { SearchFilter } from "../interfaces/calculator";

const liqourAndWineSearchFilters: SearchFilter[] = [
  {
    name: "all",
    description: "All",
  },
  {
    name: "successfullyProcessed",
    description: "Successfully Processed",
  },
  {
    name: "failedToProcess",
    description: "Failed To Process",
  },
]
;

export { liqourAndWineSearchFilters };