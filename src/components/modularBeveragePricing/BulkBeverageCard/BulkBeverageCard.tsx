import { useReducer, useState, useEffect, type Dispatch, type SetStateAction } from "react"
import type { CardReducerPayload, CardReducerKey, ProcessedBeverageData, ProcessedBeverageDataWithCardReducerPayload, ErrorObject, SuccessObject } from "../../../interfaces/marginEdge"
import { handleSearchFilterLogic, handleSearchQueryLogic } from "../../../helpers/marginEdge/search"
import type { SearchFilter, SlidingScale } from "../../../interfaces/calculator"
import { cardReducer } from "./cardReducer"
import { formatErrorKey } from "../../../helpers/general/caseFormatting"
import { marginEdgeBevereageUnitNames, marginEdgeProcessingStatuses } from "../../../constants/marginEdge"
import { strictNumberHandler } from "../../../helpers/general/inputHandlers"
import { DeleteModal } from "../DeleteModal/DeleteModal"
import { SuccessPopupModal } from "../SuccessPopupModal/SuccessPopupModal"

export const BulkBeverageCard = (
    {processedData, setProcessedData, searchQuery, searchFilter, index, slidingScale}: 
    {processedData: ProcessedBeverageData, setProcessedData: Dispatch<SetStateAction<ProcessedBeverageData[]>>, searchQuery: string, searchFilter: SearchFilter, index: number, slidingScale: SlidingScale}
) => {
  const buildPayloadState = (processedData: ProcessedBeverageData, key: keyof ProcessedBeverageData) => {
    return {
      value: processedData[key] as string | number,
      isReadyForProcessing: false,
      errorKey: formatErrorKey(key)
    }
  }
  const INITIAL_STATE: ProcessedBeverageDataWithCardReducerPayload = {
    ...processedData,
    price: buildPayloadState(processedData, "price") as CardReducerKey,
    unitName: buildPayloadState(processedData, "unitName") as CardReducerKey,
    unitQuantity: buildPayloadState(processedData, "unitQuantity") as CardReducerKey
  }

  const [state, dispatch] = useReducer(cardReducer, INITIAL_STATE)
  const { price, unitName, unitQuantity, pricePerPourAtCostPercentage, pricePerBottleAtCostPercentage, markupMultiplier, costPercentage, ozPerPour, unitQuantityInMilliliters, error, success } = state as ProcessedBeverageDataWithCardReducerPayload
  const { value: priceValue, isReadyForProcessing: priceIsReadyForProcessing, errorKey: priceErrorKey } = price as CardReducerKey
  const { value: unitNameValue, isReadyForProcessing: unitNameIsReadyForProcessing, errorKey: unitNameErrorKey } = unitName as CardReducerKey
  const { value: unitQuantityValue, isReadyForProcessing: unitQuantityIsReadyForProcessing, errorKey: unitQuantityErrorKey } = unitQuantity as CardReducerKey 

  const { missingPrice, missingUnitName, missingUnitQuantity } = error as ErrorObject
  const { description: successDescription, color: successColor } = success as SuccessObject

  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [isPreviewing, setIsPreviewing] = useState<boolean>(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false)
  const [isSuccessPopupModalOpen, setIsSuccessPopupModalOpen] = useState<boolean>(false)

  const handleInputChange = (name: string, key: string, value: string | number | boolean) => {
    const payload = {[name]: { ...((state as any)[name] as CardReducerKey), [key]: value }} as CardReducerPayload
    dispatch({ 
      type: `setValue`, 
      payload: payload
    })
  }

  const handlePreview = () => {
    dispatch({ type: "preview", payload: state, slidingScale: slidingScale, stableState: processedData })
    setIsPreviewing((prev) => !prev)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing((prev) => !prev)
    setIsPreviewing(false)
  }

  const handleSave = () => {
    setIsEditing(false)
    setIsPreviewing(false)
    setIsSuccessPopupModalOpen(true)
    if (!Object.keys(state.error).length) {
      setProcessedData((prev) => {
        const newProcessedData = {
          ...state,
          unitName: state.unitName.value,
          price: state.price.value,
          unitQuantity: state.unitQuantity.value,
          success: marginEdgeProcessingStatuses.success,
        } as ProcessedBeverageData
        prev.splice(index, 1, newProcessedData)
        return [...prev]
      })
    }
  }

  const handleDelete = () => {
    setProcessedData((prev) => {
      prev.splice(index, 1)
      return [...prev] as ProcessedBeverageData[]
    })
    setIsDeleteModalOpen(false)
  }

  const ifEditing = (stableValue: string | number | ErrorObject | SuccessObject, editableValue: string | number | ErrorObject | SuccessObject) => {
    return isEditing || isPreviewing ? editableValue : stableValue
  }

  useEffect(() => {
    const event = (e: KeyboardEvent) => {e.key === "Enter" && isEditing && handlePreview()}
    window.addEventListener("keydown", event)
    return () => {
      window.removeEventListener("keydown", event)
    }
  }, [handlePreview])

  useEffect(() => {
    const event = (e: KeyboardEvent) => {e.key === "Enter" && isPreviewing && handleSave()}
    window.addEventListener("keydown", event)
    return () => {
      window.removeEventListener("keydown", event)
    }
  }, [handleSave])

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
          <button onClick={handleEdit}>{isEditing ? "Exit Edit Mode" : "Edit"}</button>
          <button onClick={() => dispatch({ type: "reset", payload: INITIAL_STATE })}>Reset</button>
          <button onClick={handlePreview}>{isPreviewing ? "Exit Preview Mode" : "Preview"}</button>
          {isPreviewing && <button onClick={handleSave}>Save</button>}
          <button onClick={() => setIsDeleteModalOpen(true)}>Delete</button>
          {isDeleteModalOpen && <DeleteModal setIsOpen={setIsDeleteModalOpen} deleteFunction={handleDelete} productName={processedData.name} />}
        </div>
      </div>

      <div
        style={{
          border: `3px solid ${ifEditing(processedData.success.color, successColor)}`,
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
          <input type="text" name="price" value={priceValue} onChange={(e) => handleInputChange("price", "value", strictNumberHandler(e.target.value, priceValue))} /> :
          <> {ifEditing(processedData.price, priceValue) as string | number} <span style={{color: 'red'}}>{ifEditing(processedData.error['missingPrice'], missingPrice) && 'Item price must be resolved'}</span></>
        }
        <br />
        Unit Name:
        {
          isEditing ?
          <select name="unitName" value={unitNameValue} onChange={(e) => handleInputChange("unitName", "value", e.target.value)}>
            {Object.values(marginEdgeBevereageUnitNames).map((unit) => (
              <option key={unit.name} value={unit.name}>{unit.name}</option>
            ))}
          </select> :
          <> {ifEditing(processedData.unitName, unitNameValue) as string} <span style={{color: 'red'}}>{ifEditing(processedData.error['missingUnitName'], missingUnitName) && 'Please confirm unit name'}</span></>
        }
        <br />
        Unit Quantity:
        {
          isEditing ?
          <input type="text" name="unitQuantity" value={unitQuantityValue} onChange={(e) => handleInputChange("unitQuantity", "value", strictNumberHandler(e.target.value, unitQuantityValue))} /> :
          <> {ifEditing(processedData.unitQuantity, unitQuantityValue) as string | number} <span style={{color: 'red'}}>{ifEditing(processedData.error['missingUnitQuantity'], missingUnitQuantity)  && 'Please confirm unit quantity'}</span></>
        }
        <br />
        Unit Quantity In Milliliters: {ifEditing(processedData.unitQuantityInMilliliters, unitQuantityInMilliliters) as string | number} 
        <br />
        Markup Multiplier: {ifEditing(processedData.markupMultiplier, markupMultiplier) as string | number}
        <br />
        Cost Percentage (%): {ifEditing(processedData.costPercentage, costPercentage) as string | number}
        <br />
        Price Per {processedData.ozPerPour}oz Pour At (%){ifEditing(Number(processedData.costPercentage).toFixed(2), Number(costPercentage).toFixed(2)) as string | number} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{(ifEditing(processedData.pricePerPourAtCostPercentage, pricePerPourAtCostPercentage) as string | number)}</span>
        <br />
        Price Per Bottle At (%){ifEditing(Number(processedData.costPercentage).toFixed(2), Number(costPercentage).toFixed(2)) as string | number} Cost Percentage: <span style={{ fontSize: "16px", fontWeight: "bold" }}>{ifEditing(processedData.pricePerBottleAtCostPercentage, pricePerBottleAtCostPercentage) as string | number}</span>
        <br />
        Success: {ifEditing(processedData.success.description, successDescription) as string}
        <br />
        {Object.values(ifEditing(processedData.error, error)).length > 0 && <span style={{ color: "red" }}>Error: {Object.values(ifEditing(processedData.error, error)).join(", ")}</span>}
      </div>
      {isSuccessPopupModalOpen && <SuccessPopupModal setIsOpen={setIsSuccessPopupModalOpen} errorObject={error} productName={processedData.name} />}
    </div>
  )
}