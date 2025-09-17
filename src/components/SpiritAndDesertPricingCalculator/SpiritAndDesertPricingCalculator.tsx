import { useState } from "react";
import { deriveMarkupMultiplier, spiritAndDesertWinePricingFormula } from "../../helpers/spiritAndDesertWinePricing/formulas";
import { bulkCsvRequest } from "../../helpers/marginEdge/bulkCsvRequest";
import type { ProcessedLiquorData } from "../../interfaces/marginEdge";
import { liqourAndWineSearchFilters } from "../../constants/calculator";
import type { SearchFilter } from "../../interfaces/calculator";

export const SpiritAndDesertPricingCalculator = () => {
  const [wholeSaleBottlePrice, setWholeSaleBottlePrice] = useState<string>("");
  const [costPercentage, setCostPercentage] = useState<string>("18");
  const [markupMultiplier, setMarkupMultiplier] = useState<string>(deriveMarkupMultiplier(costPercentage));
  const [bottleSizeInML, setBottleSizeInML] = useState<string>("750");
  const [ozPerPour, setOzPerPour] = useState<string>("2");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedLiquorData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<SearchFilter>(liqourAndWineSearchFilters[0]);
  
  const calculateSpiritAndDesertPricing = () => {
    const price = spiritAndDesertWinePricingFormula(wholeSaleBottlePrice, markupMultiplier, bottleSizeInML, ozPerPour);
    return price.toFixed(2);
  };

  const handleCostPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostPercentage(e.target.value);
    setMarkupMultiplier(deriveMarkupMultiplier(e.target.value));
  };

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvFile(e.target.files?.[0] || null);
  };

  const handleProcessData = async () => {
    if (csvFile) {
      const processedData = await bulkCsvRequest(csvFile, markupMultiplier, costPercentage, ozPerPour);
      setProcessedData(processedData as ProcessedLiquorData[]);
    }
  };

  const handleRemoveFile = () => {
    setCsvFile(null);
    setProcessedData([]);
    (document.getElementById("csvFileInput") as HTMLInputElement).value = "";
  };

  const handleSearchFilterLogic = (item: ProcessedLiquorData) => { 
    if (searchFilter.name === "all") {
      return true;
    } else if (searchFilter.name === "successfullyProcessed" && item.unit) {
      return true;
    } else if (searchFilter.name === "failedToProcess" && !item.unit) {
      return true;
    } else {
      return false;
    }
  }

  const handleSearchQueryLogic = (item: ProcessedLiquorData) => {
    if (searchQuery.length > 0) {
      return item.name.toLowerCase().includes(searchQuery.toLowerCase());
    } else {
      return true;
    }
  }

  return (
    <div>
      <h1>
        Modular Beverage Pricing Calculator
      </h1>
      <label>
        Whole Sale Bottle Price: ($)
      </label>
      <input type="number" value={wholeSaleBottlePrice} onChange={(e) => setWholeSaleBottlePrice(e.target.value)} />
      <br />
      <br />
      <strong>Markup Multiplier Can Be Derived From Cost Percentage or Set Manually</strong>
      <br />
      <label>
        Cost Percentage: (%)
      </label>
      <input type="number" value={costPercentage} onChange={(e) => handleCostPercentageChange(e)} />
      <br />
      <label>
        Markup Multiplier:
      </label>
      <input disabled={costPercentage.length > 0} type="number" value={markupMultiplier} onChange={(e) => setMarkupMultiplier(e.target.value)} />
      <br />
      <br />
      <label>
        Bottle Size in ML:
      </label>
      <input type="number" value={bottleSizeInML} onChange={(e) => setBottleSizeInML(e.target.value)} />
      <br />
      <label>
        Oz Per Pour:
      </label>
      <input type="number" value={ozPerPour} onChange={(e) => setOzPerPour(e.target.value)} />
      <br />
      <label
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Price Per Pour: <span style={{ color: "red" }}>${calculateSpiritAndDesertPricing()}</span>
      </label>
      <br /><br />
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
      <br />
      <br />
      {
        processedData.length > 0 &&
        <div>
          <label>Search Filter:</label>
          {
            liqourAndWineSearchFilters.map((filter) => {
              return (
                <button 
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
        {processedData.map((item: ProcessedLiquorData, index: number) => (
          <div 
            key={item.name}
            style={{
              display: handleSearchQueryLogic(item) && handleSearchFilterLogic(item) ? "block" : "none",
            }}
          >
            <h3>Item {index + 1} {item.unit ? "Successfully Processed ✅" : " Could Not Be Processed ❌"}</h3>
            <div>
              
            </div>
            <div
              style={{
                border: item.unit ? "3px solid green" : "3px solid red",
                padding: "10px",
                margin: "10px",
                borderRadius: "5px",
              }}
            >
              Name: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{item.name}</span>
              <br />
              Price: {item.price}
              <br />
              Unit: {item.unit}
              <br />
              Unit Quantity: {item.unitQuantity}
              <br />
              Unit Quantity In Milliliters: {item.unitQuantityInMilliliters}
              <br />
              Price Per {item.ozPerPour}oz Pour At %{item.costPercentage} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{item.pricePerPourAtCostPercentage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};