export const marginEdgeBevereageUnitNames = {
  liter:{
    name: "Liter",
    measurementInMilliliters: 1000,
  },
  fluidOunces:{
    name: "Fluid Ounces",
    measurementInMilliliters: 29.5735,
  },
  milliliters:{
    name: "Milliliters",
    measurementInMilliliters: 1,
  }
};

export const marginEdgeProcessingStatuses = {
  success: {
    description: 'Successfully Processed ✅',
    name: 'success',
    color: 'green',
  },
  partial: {
    description: 'Partially Processed ⚠️',
    name: 'partial',
    color: 'yellow',
  },
  fail: {
    description: 'Failed To Process ❌',
    name: 'fail',
    color: 'red',
  },
  preview: (name: string) => ({
    description: 'Preview 🛠️',
    name: name as keyof typeof marginEdgeProcessingStatuses,
    color: 'blue',
  })
};