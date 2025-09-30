import { useState } from "react";
import { deriveMarkupMultiplier, modularBeveragePricingFormula, bottlePricingFormula, testSlidingScaleMarkupMultiplier, deriveSlidingScaleMarkupMultiplier } from "../../../helpers/pricingFormulas/formulas";
import { defaultSlidingScale } from "../../../constants/calculator";
import type { SlidingScale } from "../../../interfaces/calculator";
import { BulkMarginEdgeProcessor } from "../BulkMarginEdgeProcessor/BulkMarginEdgeProcessor";
import { Select } from "../../helper/inputs/Select/Select";
import { Checkbox } from "../../helper/inputs/Checkbox/Checkbox";

export const ModularBeveragePricingCalculator = ({children}: {children: React.ReactNode}) => {
  const [wholeSaleBottlePrice, setWholeSaleBottlePrice] = useState<string>("");
  const [costPercentage, setCostPercentage] = useState<string>("18");
  const [markupMultiplier, setMarkupMultiplier] = useState<string | number>(deriveMarkupMultiplier(costPercentage));
  const [bottleSizeInML, setBottleSizeInML] = useState<string>("750");
  const [ozPerPour, setOzPerPour] = useState<string>("2");
  const [slidingScale, setSlidingScale] = useState<SlidingScale>(defaultSlidingScale);
  const [slidingScaleWarning, setSlidingScaleWarning] = useState<string>('');

  const calculateModularBeveragePricing = () => {
    const price = modularBeveragePricingFormula(wholeSaleBottlePrice, markupMultiplier, bottleSizeInML, ozPerPour);
    return price.toFixed(2);
  };
 
  const calculateBottlePricing = () => {
    return bottlePricingFormula(wholeSaleBottlePrice, markupMultiplier).toFixed(2)
  }

  const handleSlidingScaleChange = (e: React.ChangeEvent<HTMLInputElement> | null, name: string, value: string | boolean) => {
    let newObjectValue = {[name]: value};
    if (e) newObjectValue = {[e.target.name]: e.target.value};
    const newSlidingScale = {...slidingScale, ...newObjectValue};
    setSlidingScale((prevSlidingScale) => ({
      ...prevSlidingScale,
      ...newObjectValue,
    }));
    setSlidingScaleWarning(testSlidingScaleMarkupMultiplier(newSlidingScale));
    setMarkupMultiplier(deriveSlidingScaleMarkupMultiplier(newSlidingScale, wholeSaleBottlePrice));
  };

  const handleSlidingScaleCheckboxChange = (checked: boolean) => {
    setSlidingScale((prevSlidingScale) => ({
      ...prevSlidingScale,
      isEnabled: checked,
    }));
    if (checked) {
      setMarkupMultiplier(deriveSlidingScaleMarkupMultiplier(slidingScale, wholeSaleBottlePrice));
    } else {
      setMarkupMultiplier(deriveMarkupMultiplier(costPercentage));
    }
  };

  const handleCostPercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCostPercentage(e.target.value);
    setMarkupMultiplier(deriveMarkupMultiplier(e.target.value));
  };

  const handleWholesaleBottlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWholeSaleBottlePrice(e.target.value)
    if (slidingScale.isEnabled) setMarkupMultiplier(deriveSlidingScaleMarkupMultiplier(slidingScale, e.target.value));
  } 

  const handleOnChangeUnitType = (value: string) => {
    setSlidingScale((prevSlidingScale) => ({
      ...prevSlidingScale,
      unitType: value as 'percentage' | 'markupMultiplier',
      lowerBound: value === 'percentage' ? deriveMarkupMultiplier(prevSlidingScale.lowerBound) : deriveMarkupMultiplier(prevSlidingScale.lowerBound),
      upperBound: value === 'percentage' ? deriveMarkupMultiplier(prevSlidingScale.upperBound) : deriveMarkupMultiplier(prevSlidingScale.upperBound),
    }));
    setMarkupMultiplier(deriveSlidingScaleMarkupMultiplier(slidingScale, wholeSaleBottlePrice));
  }

  const inputStyle = {
    margin: '10px 0',
  }

  const slidingScaleInputArray = [ 
    { name: 'lowerBound', label: `Lower Bound ${slidingScale.unitType === 'percentage' ? 'Cost (%)' : 'Markup Multiplier'}:`, type: 'number', value: slidingScale.lowerBound, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleSlidingScaleChange(null, 'lowerBound', e.target.value), style: inputStyle },
    { name: 'upperBound', label: `Upper Bound ${slidingScale.unitType === 'percentage' ? 'Cost (%)' : 'Markup Multiplier'}:`, type: 'number', value: slidingScale.upperBound, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleSlidingScaleChange(null, 'upperBound', e.target.value), style: inputStyle },
    { name: 'affectedPriceRangeFloor', label: 'Affected Price Range Floor ($): ', type: 'number', value: slidingScale.affectedPriceRangeFloor, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleSlidingScaleChange(null, 'affectedPriceRangeFloor', e.target.value), style: inputStyle },
    { name: 'affectedPriceRangeCeiling', label: 'Affected Price Range Ceiling ($): ', type: 'number', value: slidingScale.affectedPriceRangeCeiling, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleSlidingScaleChange(null, 'affectedPriceRangeCeiling', e.target.value), style: inputStyle },
  ]

  const wholesaleBottlePriceInputArray = [
    { name: 'wholeSaleBottlePrice', label: 'Wholesale Bottle Price: ($)', type: 'number', value: wholeSaleBottlePrice, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleWholesaleBottlePriceChange(e), style: inputStyle },
  ]

  const costPercentageInputArray = [
    { name: 'costPercentage', label: 'Cost Percentage: (%)', type: 'number', value: costPercentage, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleCostPercentageChange(e), style: inputStyle },
  ]

  const measurementInputArray = [
    { name: 'bottleSizeInML', label: 'Bottle Size in ML:', type: 'number', value: bottleSizeInML, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setBottleSizeInML(e.target.value), style: inputStyle },
    { name: 'ozPerPour', label: 'Oz Per Pour:', type: 'number', value: ozPerPour, onChange: (e: React.ChangeEvent<HTMLInputElement>) => setOzPerPour(e.target.value), style: inputStyle },
  ]

  const priceInputArray = [
    { name: 'pricePerPourFloor', label: 'Price Per Pour Floor: ($)', type: 'number', value: slidingScale.pricePerPourFloor, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleSlidingScaleChange(null, 'pricePerPourFloor', e.target.value), style: inputStyle },
    { name: 'pricePerBottleFloor', label: 'Price Per Bottle Floor: ($)', type: 'number', value: slidingScale.pricePerBottleFloor, onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleSlidingScaleChange(null, 'pricePerBottleFloor', e.target.value), style: inputStyle },
  ]

  const unitTypeArray = [{ value: 'percentage', label: 'Percentage %' }, { value: 'markupMultiplier', label: 'Markup Multiplier *' }]

  const buildInputs = (inputArray: { name: string, label: string, type: string, value: string | number, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void, style: React.CSSProperties | undefined }[]) => {
    return inputArray.map((input) => {
      return (
        <div 
          key={input.name}
          style={input.style}
        >
          <label>
            {input.label}
          </label>
          <input type={input.type} value={input.value} onChange={input.onChange} />
        </div>
    )
    })
  }

  return (
    <div>
      <h1>
        Modular Beverage Pricing Calculator
      </h1>
      {children}
      {buildInputs(wholesaleBottlePriceInputArray)}
      <br />
      <label> 
        Use Sliding Scale:
      </label> &nbsp;
      <Checkbox label="Use Sliding Scale" checked={slidingScale.isEnabled} onChange={handleSlidingScaleCheckboxChange} />
      <br />
      <br />
      {slidingScaleWarning && <span style={{ color: 'red' }}>{slidingScaleWarning}<br/></span>}
      {
        slidingScale.isEnabled &&
        <>
          <div style={inputStyle}>
            <label>
              Bound Unit Type: &nbsp;
            </label>
            <Select options={unitTypeArray} value={slidingScale.unitType} onChange={handleOnChangeUnitType} />
          </div>
          {buildInputs(slidingScaleInputArray)}
        </>
      }
      {
        !slidingScale.isEnabled &&
        <>
          <strong>Markup Multiplier Can Be Derived From Cost Percentage or Set Manually</strong>
          {buildInputs(costPercentageInputArray)}
        </>
      }
      <label>
        Markup Multiplier:
      </label>
      <input disabled={costPercentage.length > 0} type="number" value={markupMultiplier} onChange={(e) => setMarkupMultiplier(e.target.value)} />
      <br />
      <br />
      {buildInputs(measurementInputArray)}
      <br />
      {buildInputs(priceInputArray)}
      <br />
      <label
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Price Per Pour: <span style={{ color: "red" }}>${Math.max(Number(calculateModularBeveragePricing()), Number(slidingScale.pricePerPourFloor))}</span>
      </label>
      <br />
      <label
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          marginTop: "10px",
        }}
      >
        Price Per Bottle: <span style={{ color: "red" }}>${Math.max(Number(calculateBottlePricing()), Number(slidingScale.pricePerBottleFloor))}</span>
      </label>
      <br /><br />
      <BulkMarginEdgeProcessor 
        markupMultiplier={Number(markupMultiplier)} 
        costPercentage={Number(costPercentage)} 
        ozPerPour={Number(ozPerPour)} 
        slidingScale={slidingScale}
      />
    </div>
  );
};