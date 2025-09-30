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
  naBeverages: {
    name: "NA Beverages",
    mostCommonFormat: {
      name: "Bottle",
      unitName: fluidOunces.name,
      unitQuantity: 12,
    },
    subcategories: {
      soda: {
        name: "Soda",
        mostCommonFormat: {
          name: "Bottle",
          unitName: fluidOunces.name,
          unitQuantity: 12,
        }
      },
      juice: {
        name: "Juice",
        mostCommonFormat: {
          name: "Bottle",
          unitName: fluidOunces.name,
          unitQuantity: 12,
        }
      },
      water: {
        name: "Water",
        mostCommonFormat: {
          name: "Bottle",
          unitName: fluidOunces.name,
          unitQuantity: 12,
        }
      },
    }
  },
  'beerBottle/Can': {
    name: "Beer Bottle / Can",
    mostCommonFormat: {
      name: "Bottle",
      unitName: fluidOunces.name,
      unitQuantity: 12,
    },
    subcategories: {
      beer: {
        name: "Beer",
        mostCommonFormat: {
          name: "Bottle",
          unitName: fluidOunces.name,
          unitQuantity: 12,
        }
      },
      cider: {
        name: "Cider",
        mostCommonFormat: {
          name: "Can",
          unitName: fluidOunces.name,
          unitQuantity: 12,
        }
      },
    }
  },
  wine: {
    name: "Wine",
    mostCommonFormat: {
      name: "Bottle",
      unitName: milliliters.name,
      unitQuantity: 750,
    },
    subcategories: {
      table: {
        name: "Table",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 750,
        }
      },
      dessert: {
        name: "Dessert",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 375,
        }
      },
      port: {
        name: "Port",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 500,
        }
      },
    }
  },
  liquor: {
    name: "Liquor",
    mostCommonFormat: {
      name: "Bottle",
      unitName: milliliters.name,
      unitQuantity: 750,
    },
    subcategories: {
      vodka: {
        name: "Vodka",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 750,
        }
      },
      gin: {
        name: "Gin",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 750,
        }
      },
      rum: {
        name: "Rum",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 750,
        }
      },
      whiskey: {
        name: "Whiskey",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 750,
        }
      },
      tequila: {
        name: "Tequila",
        mostCommonFormat: {
          name: "Bottle",
            unitName: milliliters.name,
          unitQuantity: 750,
        }
      },
      liqueur: {
        name: "Liqueur",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 750,
        }
      },
      bitters: {
        name: "Bitters",
        mostCommonFormat: {
          name: "Bottle",
          unitName: fluidOunces.name,
          unitQuantity: 4,
        }
      },
      other: {
        name: "Other",
        mostCommonFormat: {
          name: "Bottle",
          unitName: milliliters.name,
          unitQuantity: 750,
        }
      },
    }
  }
}