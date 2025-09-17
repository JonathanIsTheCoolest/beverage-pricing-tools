import marginEdgeLiquorCSVparser from "../../helpers/marginEdge/liquorCSVparser.ts"; 
import { processLiquorData } from "../../helpers/marginEdge/processLiquorData.ts";

export const bulkCsvRequest = async (csvFile: File) => {
  const csvText = await csvFile.text();
  const data = marginEdgeLiquorCSVparser(csvText);
  const processedData = processLiquorData(data, 5.555, 18, 2);

  return processedData;
};