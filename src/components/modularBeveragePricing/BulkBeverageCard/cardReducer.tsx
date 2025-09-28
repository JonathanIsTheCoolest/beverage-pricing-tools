import type { SlidingScale } from "../../../interfaces/calculator"
import { modularBeveragePricingFormula, deriveSlidingScaleMarkupMultiplier, bottlePricingFormula, deriveMilliliters } from "../../../helpers/pricingFormulas/formulas"
import type { ErrorObject, CardReducerPayload, CardReducerKey, ProcessedBeverageData, ProcessedBeverageDataWithCardReducerPayload } from "../../../interfaces/marginEdge"
import { marginEdgeBevereageUnitNames, marginEdgeProcessingStatuses } from "../../../constants/marginEdge"
import { capitalizeFirstLetter } from "../../../helpers/general/caseFormatting"
import { csvParsingErrorMessages } from "../../../errorMessages/csv"

interface CardReducerAction {
    type: string
    payload: CardReducerPayload | ProcessedBeverageDataWithCardReducerPayload
    slidingScale?: SlidingScale
    stableState?: ProcessedBeverageData
}

const createPreview = (state: ProcessedBeverageDataWithCardReducerPayload, slidingScale: SlidingScale, stableState: ProcessedBeverageData) => {
    const { price, unitName, unitQuantity, ozPerPour, markupMultiplier } = state
    const { value: priceValue, isReadyForProcessing: priceIsReadyForProcessing, errorKey: priceErrorKey } = price as CardReducerKey
    const { value: unitNameValue, isReadyForProcessing: unitNameIsReadyForProcessing, errorKey: unitNameErrorKey } = unitName as CardReducerKey
    const { value: unitQuantityValue, isReadyForProcessing: unitQuantityIsReadyForProcessing, errorKey: unitQuantityErrorKey } = unitQuantity as CardReducerKey

    let newMarkupMultiplier = markupMultiplier
    const newUnitName = capitalizeFirstLetter(unitNameValue as keyof typeof marginEdgeBevereageUnitNames) as keyof typeof marginEdgeBevereageUnitNames
    let newUnitQuantityInMilliliters = deriveMilliliters(newUnitName.toString(), unitQuantityValue.toString())
    const newErrorObject = {...state.error}

    if (slidingScale.isEnabled) {
        newMarkupMultiplier = deriveSlidingScaleMarkupMultiplier(slidingScale, priceValue) 
    }

    const newPourPrice = modularBeveragePricingFormula(priceValue, newMarkupMultiplier, newUnitQuantityInMilliliters, ozPerPour)
    const newBottlePrice = bottlePricingFormula(priceValue, newMarkupMultiplier)

    if (!priceValue.toString().length) {
        newErrorObject['missingPrice'] = csvParsingErrorMessages.missingPrice
    } else {
        delete newErrorObject['missingPrice']
    }
    if (!newUnitName) {
        newErrorObject['missingUnitName'] = csvParsingErrorMessages.missingUnitName
    } else {
        delete newErrorObject['missingUnitName']
    }
    if (!unitQuantityValue.toString().length) {
        newErrorObject['missingUnitQuantity'] = csvParsingErrorMessages.missingUnitQuantity
    } else {
        delete newErrorObject['missingUnitQuantity']
    }

    return {
        ...state,
        price: { value: priceValue, isReadyForProcessing: true, errorKey: priceErrorKey } as CardReducerKey,
        unitName: { value: newUnitName, isReadyForProcessing: true, errorKey: unitNameErrorKey } as CardReducerKey,
        unitQuantity: { value: unitQuantityValue, isReadyForProcessing: true, errorKey: unitQuantityErrorKey } as CardReducerKey,
        unitQuantityInMilliliters: newUnitQuantityInMilliliters,
        pricePerPourAtCostPercentage: newPourPrice,
        pricePerBottleAtCostPercentage: newBottlePrice,
        markupMultiplier: newMarkupMultiplier,
        error: newErrorObject,
        success: marginEdgeProcessingStatuses.preview(state.success.name)
    }
}

const returnKeyName = (payload: CardReducerPayload) => {
    return Object.keys(payload)[0]
}

const returnKeyValue = (payload: CardReducerPayload) => {
    return payload[returnKeyName(payload)]
}
const returnUpdatedErrorObject = (state: ProcessedBeverageDataWithCardReducerPayload, action: CardReducerAction) => {
    const { payload } = action
    const keyValue = returnKeyValue(payload as CardReducerPayload)
    const { isReadyForProcessing, errorKey } = keyValue as CardReducerKey
    if (isReadyForProcessing) {
        delete state.error[errorKey]
    }
    return state.error as ErrorObject
}

export const cardReducer = (state: ProcessedBeverageDataWithCardReducerPayload, action: CardReducerAction) => {
    const { type, payload, slidingScale, stableState } = action
    const keyName = returnKeyName(payload as CardReducerPayload)
    const keyValue = returnKeyValue(payload as CardReducerPayload)

    switch (type) {
        case "setValue":
            return { ...state, [keyName]: keyValue, error: returnUpdatedErrorObject(state, action) }
        case "preview":
            return createPreview(state, slidingScale as SlidingScale, stableState as ProcessedBeverageData)
        case "reset":
            return payload as ProcessedBeverageDataWithCardReducerPayload
        default:
                return state
    }
}