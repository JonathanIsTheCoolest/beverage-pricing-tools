import type { ErrorObject, CardReducerPayload, ProcessedBeverageDataWithCardReducerPayload } from "../../../interfaces/marginEdge"

interface CardReducerAction {
    type: string
    payload: CardReducerPayload
}

const returnUpdatedErrorObject = (state: ProcessedBeverageDataWithCardReducerPayload, action: CardReducerAction) => {
    const { payload } = action
    const { isReadyForProcessing, errorKey } = payload
    if (isReadyForProcessing) {
        delete state.error[errorKey]
    }
    return state.error as ErrorObject
}

export const cardReducer = (state: ProcessedBeverageDataWithCardReducerPayload, action: CardReducerAction) => {
  const { type, payload } = action
  switch (type) {
      case "setPrice":
          return { ...state, price: payload as CardReducerPayload, error: returnUpdatedErrorObject(state, action) }
      case "setUnit":
          return { ...state, unit: payload as CardReducerPayload, error: returnUpdatedErrorObject(state, action) }
      case "setUnitQuantity":
          return { ...state, unitQuantity: payload as CardReducerPayload, error: returnUpdatedErrorObject(state, action) }
      default:
            return state
    }
}