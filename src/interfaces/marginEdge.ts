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

export interface ProcessedBeverageData {
  name: string;
  category: string;
  price: string | number;
  unit: string;
  unitQuantity: string | number;
  unitQuantityInMilliliters: string | number;
  ozPerPour: string | number;
  costPercentage: string | number;
  markupMultiplier: string | number;
  pricePerPourAtCostPercentage: string | number;
  pricePerBottleAtCostPercentage: string | number;
  success: {
    description: string;
    name: string;
    color: string;
  };
  error: string[];
}