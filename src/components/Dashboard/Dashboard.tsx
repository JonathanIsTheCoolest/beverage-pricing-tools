import { useState } from "react";

import { SpiritAndDesertPricingCalculator } from "../SpiritAndDesertPricingCalculator/SpiritAndDesertPricingCalculator";
import { WinePricingCalculator } from "../WinePricingCalculator/WinePricingCalcualtor";

interface Location {
  name: string;
  component: React.ReactNode;
}

const locationObject: { [key: string]: Location } = {
  spirit:{
    name: "spirit",
    component: <SpiritAndDesertPricingCalculator />
  },
  wine: { 
    name: "wine",
    component: <WinePricingCalculator />
  }
}


export const Dashboard = () => {
  const [location, setLocation] = useState<Location>(locationObject['spirit']);

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLocation(locationObject[e.target.value]);
  };

  return (
    <div>
      <select value={location.name} onChange={handleLocationChange}>
        {
          Object.keys(locationObject).map((location) => (
            <option value={location}>{location}</option>
          ))
        }
      </select>
      {
        locationObject[location.name].component
      }
    </div>
  );
};