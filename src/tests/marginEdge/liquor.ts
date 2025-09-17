import marginEdgeLiquorCSVparser from "../../helpers/marginEdge/liquorCSVparser.ts"; 
import loadCsvFromAssets from "../../helpers/csvLoader.ts";
import { processLiquorData } from "../../helpers/marginEdge/processLiquorData.ts";

export const testLiquor = async () => {
  const csvText = await loadCsvFromAssets("marginEdge/MarginEdgeLiquorExample.csv");
  const data = marginEdgeLiquorCSVparser(csvText);
  const processedData = processLiquorData(data, 5.555, 18, 2);

  console.log(data);
  console.log(processedData);
};