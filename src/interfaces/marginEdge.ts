export interface LiquorData {
  'Accounting Code': string;
  'Category': string;
  'Item Count': string;
  'Latest Price': string;
  'Name': string;
  'On Inventory': string;
  'Report By Unit': string;
  'Tax Exempt': string;
}

export interface ProcessedLiquorData {
  name: string;
  price: string;
  unit: string;
  unitQuantity: string;
  unitQuantityInMilliliters: string;
  ozPerPour: number;
  costPercentage: number;
  pricePerPourAtCostPercentage: string;
}