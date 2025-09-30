import { useState } from "react";
import { ModularBeveragePricingCalculator } from "../ModularBeveragePricingCalculator/ModularBeveragePricingCalculator";
import { Documentation } from "../Documentation/Documentation";

export const ModularBeverageWrapper = () => {
  const [showDocumentation, setShowDocumentation] = useState(false);

  return (
    <div>
      <ModularBeveragePricingCalculator>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button onClick={() => setShowDocumentation(!showDocumentation)}>
            {showDocumentation ? "Hide Documentation" : "Show Documentation"}
          </button>
        </div>
      </ModularBeveragePricingCalculator>
      <Documentation isOpen={showDocumentation} setIsOpen={setShowDocumentation} />
    </div>
  );
};  