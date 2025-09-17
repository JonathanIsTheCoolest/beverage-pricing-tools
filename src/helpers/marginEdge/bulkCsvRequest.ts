import marginEdgeLiquorCSVparser from "../../helpers/marginEdge/liquorCSVparser.ts"; 
import { processLiquorData } from "../../helpers/marginEdge/processLiquorData.ts";

export const bulkCsvRequest = async (csvFile: File, markupMultiplier: number | string, costPercentage: number | string, ozPerPour: number | string) => {
  const csvText = await csvFile.text();
  const data = marginEdgeLiquorCSVparser(csvText);
  const processedData = processLiquorData(data, Number(markupMultiplier), Number(costPercentage), Number(ozPerPour));

  return processedData;
};