const liter = {
  name: "Liter",
  measurementInMilliliters: 1000,
}

const fluidOunces = {
  name: "Fluid Ounces",
  measurementInMilliliters: 29.5735,
}

const milliliters = {
  name: "Milliliters",
  measurementInMilliliters: 1,
}

const centiliters = {
  name: "Centiliters",
  measurementInMilliliters: 10,
}

export const marginEdgeBevereageUnitNames = {
  liter: liter,
  fluidOunces: fluidOunces,
  milliliters: milliliters,
}

export const marginEdgeBevereageUnitAliases = {
  ...marginEdgeBevereageUnitNames,
  l: liter, // alias for liter
  ounces: fluidOunces, // alias for fluidOunces
  oz: fluidOunces, // alias for fluidOunces
  ml: milliliters, // alias for milliliters
  centiliters: centiliters,
  cl: centiliters, // alias for centiliters
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

export const marginEdgeBeverageCategories = {
  naBeverage: {
    name: "NA Beverages",
    subcategories: {
      soda: {
        name: "Soda",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 355,
        }
      },
      juice: {
        name: "Juice",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 355,
        }
      },
      water: {
        name: "Water",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 355,
        }
      },
    }
  },
  beer: {
    name: "Beer Bottle / Can",
    subcategories: {
      beer: {
        name: "Beer",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 355,
        }
      },
      cider: {
        name: "Cider",
        mostCommonFormat: {
          name: "Can",
          measurementInMilliliters: 355,
        }
      },
    }
  },
  wine: {
    name: "Wine",
    subcategories: {
      table: {
        name: "Table",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 750,
        }
      },
      dessert: {
        name: "Dessert",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 375,
        }
      },
      port: {
        name: "Port",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 500,
        }
      },
    }
  },
  liquor: {
    name: "Liquor",
    subcategories: {
      vodka: {
        name: "Vodka",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 750,
        }
      },
      gin: {
        name: "Gin",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 750,
        }
      },
      rum: {
        name: "Rum",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 750,
        }
      },
      whiskey: {
        name: "Whiskey",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 750,
        }
      },
      tequila: {
        name: "Tequila",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 750,
        }
      },
      liqueur: {
        name: "Liqueur",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 750,
        }
      },
      bitters: {
        name: "Bitters",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 118.294,
        }
      },
      other: {
        name: "Other",
        mostCommonFormat: {
          name: "Bottle",
          measurementInMilliliters: 750,
        }
      },
    }
  }
}