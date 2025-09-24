import marginEdgeLiquorCSVparser from "../../helpers/marginEdge/liquorCSVparser.ts"; 
import { processLiquorData } from "../../helpers/marginEdge/processLiquorData.ts";
import type { SlidingScale } from "../../interfaces/calculator.ts";

export const bulkCsvRequest = async (csvFile: File, markupMultiplier: number | string, costPercentage: number | string, ozPerPour: number | string, slidingScale: SlidingScale) => {
  const csvText = await csvFile.text();
  const data = marginEdgeLiquorCSVparser(csvText);
  const processedData = processLiquorData(data, Number(markupMultiplier), Number(costPercentage), Number(ozPerPour), slidingScale);

  return processedData;
};