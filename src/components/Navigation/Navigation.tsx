import { useState } from "react";
import { ModularBeverageWrapper } from "../modularBeveragePricing/ModularBeverageWrapper/ModularBeverageWrapper";

interface Location {
  name: string;
  description: string;
  component: React.ReactNode;
}

const locationObject: { [key: string]: Location } = {
  modularBeveragePricingCalculator:{
    name: "modularBeveragePricingCalculator",
    description: "Modular Beverage Pricing Calculator",
    component: <ModularBeverageWrapper />
  },
}

const selectedStyle = {
  backgroundColor: "red",
  color: "white",
}

export const Navigation = () => {
  const [location, setLocation] = useState<Location>(locationObject['modularBeveragePricingCalculator']); 

  return (
    <div      
    >
      <div>
        {
          Object.keys(locationObject).map((objectName) => (   
            <button 
            key={objectName}
            style={location.name === objectName ? selectedStyle : {}}
            onClick={() => setLocation(locationObject[objectName])} 
            value={objectName} 
            >{locationObject[objectName].description}</button>
          ))
        }
      </div>
      {
        locationObject[location.name].component
      }
    </div>
  );
};