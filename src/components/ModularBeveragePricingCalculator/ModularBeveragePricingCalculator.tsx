import { useState } from "react";
import { deriveMarkupMultiplier, modularBeveragePricingFormula, bottlePricingFormula, testSlidingScaleMarkupMultiplier, deriveSlidingScaleMarkupMultiplier } from "../../helpers/pricingFormulas/formulas";
import { bulkCsvRequest } from "../../helpers/marginEdge/bulkCsvRequest";
import type { ProcessedLiquorData } from "../../interfaces/marginEdge";
import { liqourAndWineSearchFilters, defaultSlidingScale } from "../../constants/calculator";
import type { SearchFilter, SlidingScale } from "../../interfaces/calculator";
import { useCSVDownloader } from "react-papaparse";

export const ModularBeveragePricingCalculator = () => {
  const { CSVDownloader, Type } = useCSVDownloader();
  
  const [wholeSaleBottlePrice, setWholeSaleBottlePrice] = useState<string>("");
  const [costPercentage, setCostPercentage] = useState<string>("18");
  const [markupMultiplier, setMarkupMultiplier] = useState<string | number>(deriveMarkupMultiplier(costPercentage));
  const [bottleSizeInML, setBottleSizeInML] = useState<string>("750");
  const [ozPerPour, setOzPerPour] = useState<string>("2");
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedLiquorData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<SearchFilter>(liqourAndWineSearchFilters[0]);
  const [slidingScale, setSlidingScale] = useState<SlidingScale>(defaultSlidingScale);
  const [slidingScaleWarning, setSlidingScaleWarning] = useState<string>('');

  const calculateModularBeveragePricing = () => {
    const price = modularBeveragePricingFormula(wholeSaleBottlePrice, markupMultiplier, bottleSizeInML, ozPerPour);
    return price.toFixed(2);
  };
 
  const calculateBottlePricing = () => {
    return bottlePricingFormula(wholeSaleBottlePrice, markupMultiplier).toFixed(2)
  }

  const handleSlidingScaleChange = (e: React.ChangeEvent<HTMLInputElement> | null, name: string, value: string | boolean) => {
    let newObjectValue = {[name]: value};
    if (e) newObjectValue = {[e.target.name]: e.target.value};
    const newSlidingScale = {...slidingScale, ...newObjectValue};
    setSlidingScale((prevSlidingScale) => ({
      ...prevSlidingScale,
      ...newObjectValue,
    }));
    setSlidingScaleWarning(testSlidingScaleMarkupMultiplier(newSlidingScale));
    setMarkupMultiplier(deriveSlidingScaleMarkupMultiplier(newSlidingScale, wholeSaleBottlePrice));
  };

  const handleSlidingScaleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSlidingScale((prevSlidingScale) => ({
      ...prevSlidingScale,
      isEnabled: e.target.checked,
    }));
    if (e.target.checked) {
      setMarkupMultiplier(deriveSlidingScaleMarkupMultiplier(slidingScale, wholeSaleBottlePrice));
    } else {
      setMarkupMultiplier(deriveMarkupMultiplier(costPercentage));
    }
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
      const processedData = await bulkCsvRequest(csvFile, markupMultiplier, costPercentage, ozPerPour, slidingScale);
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

  const handleWholesaleBottlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWholeSaleBottlePrice(e.target.value)
    if (slidingScale.isEnabled) setMarkupMultiplier(deriveSlidingScaleMarkupMultiplier(slidingScale, e.target.value));
  } 

  return (
    <div>
      <h1>
        Modular Beverage Pricing Calculator
      </h1>
      <label>
        Whole Sale Bottle Price: ($)
      </label>
      <input type="number" value={wholeSaleBottlePrice} onChange={(e) => handleWholesaleBottlePriceChange(e)} />
      <br />
      <br />
      <label>
        Use Sliding Scale:
      </label>
      <input type="checkbox" checked={slidingScale.isEnabled} onChange={(e) => handleSlidingScaleCheckboxChange(e)} />
      <br />
      {slidingScaleWarning && <span style={{ color: 'red' }}>{slidingScaleWarning}<br/></span>}
      <br />
      {
        slidingScale.isEnabled &&
        <>
          <label>
            Lower Bound {slidingScale.unitType === 'percentage' ? 'Cost (%)' : 'Markup Multiplier'}:
          </label>
          <input type="number" value={slidingScale.lowerBound} onChange={(e) => handleSlidingScaleChange(null, 'lowerBound', e.target.value)} />
          <br />
          <label>
            Upper Bound {slidingScale.unitType === 'percentage' ? 'Cost (%)' : 'Markup Multiplier'}:
          </label>
          <input type="number" value={slidingScale.upperBound} onChange={(e) => handleSlidingScaleChange(null, 'upperBound', e.target.value)} />
          <br />
          <label>
            Affected Price Range Floor:
          </label>
          <input type="number" value={slidingScale.affectedPriceRangeFloor} onChange={(e) => handleSlidingScaleChange(null, 'affectedPriceRangeFloor', e.target.value)} />
          <br />
          <label>
            Affected Price Range Ceiling:
          </label>
          <input type="number" value={slidingScale.affectedPriceRangeCeiling} onChange={(e) => handleSlidingScaleChange(null, 'affectedPriceRangeCeiling', e.target.value)} />
          <br />
          <label>
            Unit Type:
          </label>
          <select value={slidingScale.unitType} onChange={(e) => handleSlidingScaleChange(null, 'unitType', e.target.value)}>
            <option value="percentage">Percentage</option>
            <option value="markupMultiplier">Markup Multiplier</option>
          </select>
          <br />
        </>
      }
      {
        !slidingScale.isEnabled &&
        <>
          <strong>Markup Multiplier Can Be Derived From Cost Percentage or Set Manually</strong>
          <br />
          <label>
            Cost Percentage: (%)
          </label>
          <input type="number" value={costPercentage} onChange={(e) => handleCostPercentageChange(e)} />
          <br />
        </>
      }
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
      <br />
      <label>
        Per Pour Price Floor:
      </label>
      <input type="number" value={slidingScale.pricePerPourFloor} onChange={(e) => handleSlidingScaleChange(null, 'pricePerPourFloor', e.target.value)} />
      <br />
      <label>
        Per Bottle Price Floor:
      </label>
      <input type="number" value={slidingScale.pricePerBottleFloor} onChange={(e) => handleSlidingScaleChange(null, 'pricePerBottleFloor', e.target.value)} />
      <br />
      <br />
      <label
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Price Per Pour: <span style={{ color: "red" }}>${Math.max(Number(calculateModularBeveragePricing()), Number(slidingScale.pricePerPourFloor))}</span>
      </label>
      <br />
      <label
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Price Per Bottle: <span style={{ color: "red" }}>${Math.max(Number(calculateBottlePricing()), Number(slidingScale.pricePerBottleFloor))}</span>
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
            liqourAndWineSearchFilters.map((filter) => {
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
              Markup Multiplier: {item.markupMultiplier}
              <br />
              Cost Percentage: {item.costPercentage}
              <br />
              Price Per {item.ozPerPour}oz Pour At %{item.costPercentage.toFixed(2)} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{item.pricePerPourAtCostPercentage}</span>
              <br />
              Price Per Bottle At %{item.costPercentage.toFixed(2)} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{item.pricePerBottleAtCostPercentage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};