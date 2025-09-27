import { useReducer, useState, type Dispatch, type SetStateAction } from "react"
import type { CardReducerPayload, ProcessedBeverageData, ProcessedBeverageDataWithCardReducerPayload } from "../../../interfaces/marginEdge"
import { handleSearchFilterLogic, handleSearchQueryLogic } from "../../../helpers/marginEdge/search"
import type { SearchFilter } from "../../../interfaces/calculator"
import { cardReducer } from "./cardReducer"
import { formatErrorKey, capitalizeFirstLetter } from "../../../helpers/general/caseFormatting"
import { marginEdgeBevereageUnitNames } from "../../../constants/marginEdge"

export const BulkBeverageCard = (
    {processedData, setProcessedData, searchQuery, searchFilter, index}: 
    {processedData: ProcessedBeverageData, setProcessedData: Dispatch<SetStateAction<ProcessedBeverageData[]>>, searchQuery: string, searchFilter: SearchFilter, index: number}
) => {
  const buildPayloadState = (processedData: ProcessedBeverageData, key: keyof ProcessedBeverageData) => {
    return {
      value: processedData[key],
      isUpdating: false,
      isReadyForProcessing: false,
      errorKey: formatErrorKey(key)
    }
  }
  const INITIAL_STATE: ProcessedBeverageDataWithCardReducerPayload = {
    ...processedData,
    price: buildPayloadState(processedData, "price") as CardReducerPayload,
    unitName: buildPayloadState(processedData, "unitName") as CardReducerPayload,
    unitQuantity: buildPayloadState(processedData, "unitQuantity") as CardReducerPayload
  }

  const [state, dispatch] = useReducer(cardReducer, INITIAL_STATE)
  const [isEditing, setIsEditing] = useState(false)

  const handleInputChange = (name: string, key: string, value: string | number | boolean) => {
    dispatch({ 
      type: `set${capitalizeFirstLetter(name)}`, 
      payload: { ...((state as any)[name] as CardReducerPayload), [key]: value }
    })
  }

  return (
    <div 
      style={{
        position: "relative",
        display: handleSearchQueryLogic(processedData, searchQuery) && handleSearchFilterLogic(processedData, searchFilter) ? "block" : "none",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Item {index + 1} {processedData.success.description}</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button onClick={() => setIsEditing((prev) => !prev)}>Edit</button>
          <button onClick={() => dispatch({ type: "reset", payload: INITIAL_STATE })}>Reset</button>
          <button>Preview</button>
          <button>Save</button>
          <button>Delete</button>
        </div>
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
        Price: $
        {
          isEditing ?
          <input type="text" name="price" value={state.price.value} onChange={(e) => handleInputChange("price", "value", e.target.value)} /> :
          <>{processedData.price} <span style={{color: 'red'}}>{processedData.error['missingPrice'] && 'Item price must be resolved'}</span></>
        }
        <br />
        Unit Name:
        {
          isEditing ?
          <select name="unitName" value={state.unitName.value} onChange={(e) => handleInputChange("unitName", "value", e.target.value)}>
            {Object.values(marginEdgeBevereageUnitNames).map((unit) => (
              <option key={unit.name} value={unit.name}>{unit.name}</option>
            ))}
          </select> :
          <>{processedData.unitName} <span style={{color: 'red'}}>{processedData.error['missingUnitName'] && 'Please confirm unit name'}</span></>
        }
        <br />
        Unit Quantity:
        {
          isEditing ?
          <input type="text" name="unitQuantity" value={state.unitQuantity.value} onChange={(e) => handleInputChange("unitQuantity", "value", e.target.value)} /> :
          <>{processedData.unitQuantity} <span style={{color: 'red'}}>{processedData.error['missingUnitQuantity'] && 'Please confirm unit quantity'}</span></>
        }
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
// import { useReducer, type Dispatch, type SetStateAction } from "react"
// import type { CardReducerPayload, ProcessedBeverageData, ProcessedBeverageDataWithCardReducerPayload } from "../../../interfaces/marginEdge"
// import { handleSearchFilterLogic, handleSearchQueryLogic } from "../../../helpers/marginEdge/search"
// import type { SearchFilter } from "../../../interfaces/calculator"
// import { cardReducer } from "./cardReducer"
// import { formatErrorKey, capitalizeFirstLetter } from "../../../helpers/general/caseFormatting"
// import { marginEdgeBevereageUnitNames } from "../../../constants/marginEdge"

// export const BulkBeverageCard = (
//     {processedData, setProcessedData, searchQuery, searchFilter, index}: 
//     {processedData: ProcessedBeverageData, setProcessedData: Dispatch<SetStateAction<ProcessedBeverageData[]>>, searchQuery: string, searchFilter: SearchFilter, index: number}
// ) => {
//   const buildPayloadState = (processedData: ProcessedBeverageData, key: keyof ProcessedBeverageData) => {
//     return {
//       value: processedData[key],
//       isUpdating: false,
//       isReadyForProcessing: false,
//       errorKey: formatErrorKey(key)
//     }
//   }
//   const INITIAL_STATE: ProcessedBeverageDataWithCardReducerPayload = {
//     ...processedData,
//     price: buildPayloadState(processedData, "price") as CardReducerPayload,
//     unitName: buildPayloadState(processedData, "unitName") as CardReducerPayload,
//     unitQuantity: buildPayloadState(processedData, "unitQuantity") as CardReducerPayload
//   }

//   const [state, dispatch] = useReducer(cardReducer, INITIAL_STATE)

//   const handleInputChange = (name: string, key: string, value: string | number | boolean) => {
//     dispatch({ 
//       type: `set${capitalizeFirstLetter(name)}`, 
//       payload: { ...((state as any)[name] as CardReducerPayload), [key]: value }
//     })
//   }

//   return (
//     <div 
//       style={{
//         position: "relative",
//         display: handleSearchQueryLogic(processedData, searchQuery) && handleSearchFilterLogic(processedData, searchFilter) ? "block" : "none",
//       }}
//     >
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <h3>Item {index + 1} {processedData.success.description}</h3>
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             flexWrap: "wrap",
//           }}
//         >
//           <button>Edit</button>
//           <button onClick={() => dispatch({ type: "reset", payload: INITIAL_STATE })}>Reset</button>
//           <button>Preview</button>
//           <button>Save</button>
//           <button>Delete</button>
//         </div>
//       </div>

//       <div
//         style={{
//           border: `3px solid ${processedData.success.color}`,
//           padding: "10px",
//           margin: "10px",
//           borderRadius: "5px",
//         }}
//       >
//         Name: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{processedData.name}</span>
//         <br />
//         Category: {processedData.category}
//         <br />
//         Price: $
//         {
//           state.price.isUpdating ?
//           <input type="text" name="price" value={state.price.value} onChange={(e) => handleInputChange("price", "value", e.target.value)} /> :
//           <>{processedData.price} <span style={{color: 'red'}}>{processedData.error['missingPrice'] && 'Item price must be resolved'}</span></>
//         }
//         <button onClick={() => handleInputChange("price", "isUpdating", !state.price.isUpdating)}>Update</button>
//         <br />
//         Unit Name:
//         {
//           state.unitName.isUpdating ?
//           <select name="unitName" value={state.unitName.value} onChange={(e) => handleInputChange("unitName", "value", e.target.value)}>
//             {Object.values(marginEdgeBevereageUnitNames).map((unit) => (
//               <option key={unit.name} value={unit.name}>{unit.name}</option>
//             ))}
//           </select> :
//           <>{processedData.unitName} <span style={{color: 'red'}}>{processedData.error['missingUnitName'] && 'Please confirm unit name'}</span></>
//         }
//         <button onClick={() => handleInputChange("unitName", "isUpdating", !state.unitName.isUpdating)}>Update</button>
//         <br />
//         Unit Quantity:
//         {
//           state.unitQuantity.isUpdating ?
//           <input type="text" name="unitQuantity" value={state.unitQuantity.value} onChange={(e) => handleInputChange("unitQuantity", "value", e.target.value)} /> :
//           <>{processedData.unitQuantity} <span style={{color: 'red'}}>{processedData.error['missingUnitQuantity'] && 'Please confirm unit quantity'}</span></>
//         }
//         <button onClick={() => handleInputChange("unitQuantity", "isUpdating", !state.unitQuantity.isUpdating)}>Update</button>
//         <br />
//         Unit Quantity In Milliliters: {processedData.unitQuantityInMilliliters} 
//         <br />
//         Markup Multiplier: {processedData.markupMultiplier}
//         <br />
//         Cost Percentage (%): {processedData.costPercentage}
//         <br />
//         Price Per {processedData.ozPerPour}oz Pour At (%){Number(processedData.costPercentage).toFixed(2)} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{(processedData.pricePerPourAtCostPercentage)}</span>
//         <br />
//         Price Per Bottle At (%){Number(processedData.costPercentage).toFixed(2)} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{processedData.pricePerBottleAtCostPercentage}</span>
//         <br />
//         Success: {processedData.success.description}
//         <br />
//         {Object.values(processedData.error).length > 0 && <span style={{ color: "red" }}>Error: {Object.values(processedData.error).join(", ")}</span>}
//       </div>
//     </div>
//   )
// }