export interface BeverageData {
  'Accounting Code': string;
  'Category': string;
  'Item Count': string;
  'Latest Price': string;
  'Name': string;
  'On Inventory': string;
  'Report By Unit': string;
  'Tax Exempt': string;
}

export interface ErrorObject {
  [type: string]: string;
}

export interface SuccessObject {
  description: string;
  name: string;
  color: string;
}

export interface CardReducerKey {
  value: string | number
  isReadyForProcessing: boolean
  errorKey: string
}

export interface CardReducerPayload {
  [key: string]: CardReducerKey
}

interface BeverageDataBase {
  name: string;
  category: string;
  unitQuantityInMilliliters: string | number;
  ozPerPour: string | number;
  costPercentage: string | number;
  markupMultiplier: string | number;
  pricePerPourAtCostPercentage: string | number;
  pricePerBottleAtCostPercentage: string | number;
  success: SuccessObject;
  error: ErrorObject;
}

export interface ProcessedBeverageData extends BeverageDataBase {
  price: string | number;
  unitName: string;
  unitQuantity: string | number;
}

export interface ProcessedBeverageDataWithCardReducerPayload extends BeverageDataBase {
  price: CardReducerKey | CardReducerPayload;
  unitName: CardReducerKey | CardReducerPayload;
  unitQuantity: CardReducerKey | CardReducerPayload;
}