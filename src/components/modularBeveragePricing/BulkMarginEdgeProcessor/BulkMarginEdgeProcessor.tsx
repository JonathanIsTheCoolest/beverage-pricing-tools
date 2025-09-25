import { useCSVDownloader } from "react-papaparse";
import { beverageSearchFilters } from "../../../constants/calculator";
import { useState } from "react";
import type { ProcessedBeverageData } from "../../../interfaces/marginEdge";
import type { SearchFilter, SlidingScale } from "../../../interfaces/calculator";
import { bulkCsvRequest } from "../../../helpers/marginEdge/bulkCsvRequest";

export const BulkMarginEdgeProcessor = ({ markupMultiplier, costPercentage, ozPerPour, slidingScale }: { markupMultiplier: number, costPercentage: number, ozPerPour: number, slidingScale: SlidingScale }) => {
  const { CSVDownloader, Type } = useCSVDownloader();

  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedBeverageData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<SearchFilter>(beverageSearchFilters[0]);

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvFile(e.target.files?.[0] || null);
  };

  const handleProcessData = async () => {
    if (csvFile) {
      const processedData = await bulkCsvRequest(csvFile, markupMultiplier, costPercentage, ozPerPour, slidingScale);
      setProcessedData(processedData as ProcessedBeverageData[]);
    }
  };

  const handleRemoveFile = () => {
    setCsvFile(null);
    setProcessedData([]);
    (document.getElementById("csvFileInput") as HTMLInputElement).value = "";
  };

  const handleSearchFilterLogic = (item: ProcessedBeverageData, searchFilter: SearchFilter) => { 
    if (searchFilter.name === "all") {
      return true;
    } else if (searchFilter.name === item.success.name) {
      return true;
    } else {
      return false;
    }
  }

  const handleSearchQueryLogic = (item: ProcessedBeverageData) => {
    if (searchQuery.length > 0) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return true;
    }
  }

  return (
    <div>
    <h2>Upload Margin Edge CSV File and Process Data in Bulk</h2>
      <input id="csvFileInput" type="file" accept=".csv" onChange={(e) => handleCsvFileChange(e)} />
      <button onClick={() => handleRemoveFile()}>Remove File And Processed Data</button>
      <br />
      {
        csvFile && 
        <div>
          <h3>File Name: {csvFile.name}</h3>
          <h3>File Type: {csvFile.type}</h3>
          <h3>File Size: {csvFile.size}</h3>
        </div>
      }
      <br />
      <button onClick={() => handleProcessData()}>Process Data</button>
      {
        processedData.length > 0 &&
        <CSVDownloader
        type={Type.Button}
        filename={`${csvFile?.name}-processedData.csv`}
        bom /* helps Excel with UTF-8 */
        data={processedData}
        >
          Download CSV
        </CSVDownloader>
      }
      <br />
      <br />
      {
        processedData.length > 0 &&
        <div>
          <label>Search Filter:</label>
          {
            beverageSearchFilters.map((filter) => {
              return (
                <button 
                  key={filter.name}
                  onClick={() => setSearchFilter(filter)}
                  style={{
                    backgroundColor: searchFilter.name === filter.name ? "red" : "white",
                    color: searchFilter.name === filter.name ? "white" : "black",
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: "5px",
                    margin: "0 5px",
                  }}
                >{filter.description}</button>
              )
            })
          }
          <br /><br />
          <label>Search Product Name:</label>
          <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
      }
      <br />
      <br />
      <div>
        {processedData.map((item: ProcessedBeverageData, index: number) => (
          <div 
            key={item.name}
            style={{
              display: handleSearchQueryLogic(item) && handleSearchFilterLogic(item, searchFilter) ? "block" : "none",
            }}
          >
            <h3>Item {index + 1} {item.success.description}</h3>
            <div>
              
            </div>
            <div
              style={{
                border: `3px solid ${item.success.color}`,
                padding: "10px",
                margin: "10px",
                borderRadius: "5px",
              }}
            >
              Name: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{item.name}</span>
              <br />
              Category: {item.category}
              <br />
              Price: ${item.price}
              <br />
              Unit: {item.unit}
              <br />
              Unit Quantity: {item.unitQuantity}
              <br />
              Unit Quantity In Milliliters: {item.unitQuantityInMilliliters} 
              <br />
              Markup Multiplier: {item.markupMultiplier}
              <br />
              Cost Percentage (%): {item.costPercentage}
              <br />
              Price Per {item.ozPerPour}oz Pour At (%){Number(item.costPercentage).toFixed(2)} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{(item.pricePerPourAtCostPercentage)}</span>
              <br />
              Price Per Bottle At (%){Number(item.costPercentage).toFixed(2)} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{item.pricePerBottleAtCostPercentage}</span>
              <br />
              Success: {item.success.description}
              <br />
              {item.error.length > 0 && <span style={{ color: "red" }}>Error: {item.error.join(", ")}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}