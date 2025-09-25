import type { Dispatch, SetStateAction } from "react"

import type { ProcessedBeverageData } from "../../../interfaces/marginEdge"
import { handleSearchFilterLogic, handleSearchQueryLogic } from "../../../helpers/marginEdge/search"
import type { SearchFilter } from "../../../interfaces/calculator"

export const BulkBeverageCard = ({processedData, setProcessedData, searchQuery, searchFilter, index}: 
  {processedData: ProcessedBeverageData, setProcessedData: Dispatch<SetStateAction<ProcessedBeverageData[]>>, searchQuery: string, searchFilter: SearchFilter, index: number}) => {
  return (
    <div 
      style={{
        display: handleSearchQueryLogic(processedData, searchQuery) && handleSearchFilterLogic(processedData, searchFilter) ? "block" : "none",
      }}
    >
      <h3>Item {index + 1} {processedData.success.description}</h3>
      <div>
        
      </div>
      <div
        style={{
          border: `3px solid ${processedData.success.color}`,
          padding: "10px",
          margin: "10px",
          borderRadius: "5px",
        }}
      >
        Name: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{processedData.name}</span>
        <br />
        Category: {processedData.category}
        <br />
        Price: ${processedData.price} <span style={{color: 'red'}}>{processedData.error['missingPrice'] && 'Item price must be resolved'}</span>
        <br />
        Unit: {processedData.unit} <span style={{color: 'red'}}>{processedData.error['missingUnitName'] && 'Please confirm unit name'}</span>
        <br />
        Unit Quantity: {processedData.unitQuantity} <span style={{color: 'red'}}>{processedData.error['missingUnitQuantity'] && 'Please confirm unit quantity'}</span>
        <br />
        Unit Quantity In Milliliters: {processedData.unitQuantityInMilliliters} 
        <br />
        Markup Multiplier: {processedData.markupMultiplier}
        <br />
        Cost Percentage (%): {processedData.costPercentage}
        <br />
        Price Per {processedData.ozPerPour}oz Pour At (%){Number(processedData.costPercentage).toFixed(2)} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{(processedData.pricePerPourAtCostPercentage)}</span>
        <br />
        Price Per Bottle At (%){Number(processedData.costPercentage).toFixed(2)} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{processedData.pricePerBottleAtCostPercentage}</span>
        <br />
        Success: {processedData.success.description}
        <br />
        {Object.values(processedData.error).length > 0 && <span style={{ color: "red" }}>Error: {Object.values(processedData.error).join(", ")}</span>}
      </div>
    </div>
  )
}