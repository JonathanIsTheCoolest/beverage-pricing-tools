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

export interface CardReducerPayload {
  value: string | number
  isReadyForProcessing: boolean
  errorKey: string
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
  unit: string;
  unitQuantity: string | number;
}

export interface ProcessedBeverageDataWithCardReducerPayload extends BeverageDataBase {
  price: CardReducerPayload;
  unit: CardReducerPayload;
  unitQuantity: CardReducerPayload;
}