import marginEdgeLiquorCSVparser from "../../helpers/marginEdge/liquorCSVparser.ts"; 
import loadCsvFromAssets from "../../helpers/csv/csvLoader.ts";
import { processBeverageData } from "../../helpers/marginEdge/processBeverageData.ts";

export const testLiquor = async () => {
  const csvText = await loadCsvFromAssets("marginEdge/MarginEdgeLiquorExample.csv");
  const data = marginEdgeLiquorCSVparser(csvText);
  const processedData = processBeverageData(data, 5.555, 18, 2);

  console.log(data);
  console.log(processedData);
};