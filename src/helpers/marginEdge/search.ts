import type { ProcessedBeverageData } from "../../interfaces/marginEdge";
import type { SearchFilter } from "../../interfaces/calculator";

export const handleSearchFilterLogic = (item: ProcessedBeverageData, searchFilter: SearchFilter) => { 
  if (searchFilter.name === "all") {
    return true;
  } else if (searchFilter.name === item.success.name) {
    return true;
  } else {
    return false;
  }
}

export const handleSearchQueryLogic = (item: ProcessedBeverageData, searchQuery: string) => {
  if (searchQuery.length > 0) {
    return item.name.toLowerCase().includes(searchQuery.toLowerCase());
  } else {
    return true;
  }
}