import Papa from "papaparse";
import type { BeverageData } from "../../interfaces/marginEdge";

const marginEdgeLiquorCSVparser = (csv: string | undefined) => {
  if (!csv) {
    throw new Error("CSV is undefined");
  }

  const result = Papa.parse(csv, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: false,
  });

  return result.data as BeverageData[];
};

export default marginEdgeLiquorCSVparser;