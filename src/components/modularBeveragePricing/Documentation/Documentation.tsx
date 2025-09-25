export const Documentation = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const maxWidth = 800;
  return (
    <div
      style={{
        position: "fixed",
        transition: "0.3s ease-in-out",
        top: "0",
        right: isOpen ? "0px" : `-${maxWidth + 30}px`,
        maxWidth: `${maxWidth}px`,
        height: "100%",
        overflow: "auto",
        backgroundColor: "white",
        borderLeft: "2px solid black",
        boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)",
        color: "black",
      }}
    >
      <div
        style={{ 
          position: "sticky",
          top: "0px",
          width: "100%",
          backgroundColor: "white",
          borderBottom: "2px solid black",
          cursor: "pointer",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
      >
        <div
          style={{
            paddingRight: "10px",
          }}
          onClick={() => setIsOpen(false)}
        >
          ❌
        </div>
      </div>
      <div
        style={{
          margin: "10px",
        }}
      >
        <h1>How to Use the Calculator</h1>
        <p>
          This tool calculates the price of a beverage based on the cost of the beverage, markup multiplier, bottle size, and ounces per pour. 
          It can use a sliding scale or fixed markup multiplier.
        </p>
        <h2>General Options</h2>
        <p>
          <strong>Wholesale Bottle Price</strong>
          <br />
          The wholesale bottle price is your cost to purchase a single bottle of the beverage.
          <br />
          <br />
          <strong>Cost Percentage</strong>
          <br />
          The cost percentage is the percentage of what you paid for the beverage compared to the price you sell it for.
          <br />
          <br />
          <strong>Markup Multiplier</strong>
          <br />
          The markup multiplier is the percentage that the beverage is marked up by.
          <br />
          <br />
          <strong>Bottle Size</strong>
          <br />
          The bottle size is the size of the bottle that the beverage is sold in. We are using milliliters (ml) as the unit.
          <br />
          <br />
          <strong>Ounces per Pour</strong>
          <br />
          The ounces per pour is the number of ounces per serving.
          <br />
        </p>
        <h2>Markup Options</h2>
        <p>
          The calculator has two options:
        </p>
        <p>
          <strong>Sliding Scale</strong>
          <br />
          <strong>Fixed Markup Multiplier</strong>
          <br />
        </p>
        <h3>Sliding Scale</h3>
        <p>
          The sliding scale is a range of prices that are calculated based on the cost of the beverage and the markup multiplier.
          <br />
          <br />
          <strong>Lower Bound Cost</strong>
          <br />
          The lower bound is the minimum price that the beverage can be sold for.
          <br />
          <br />
          <strong>Upper Bound Cost</strong>
          <br />
          The upper bound is the maximum price that the beverage can be sold for.
          <br />
          <br />
          <strong>Affected Price Range Floor</strong>
          <br />
          The affected price range floor is the lowest price at which the sliding scale is applied. Before this price, the markup multiplier is fixed to the value of the Lower Bound Cost.
          <br />
          <br />
          <strong>Affected Price Range Ceiling</strong>
          <br />
          The affected price range ceiling is the highest price at which the sliding scale is applied. After this price, the markup multiplier is fixed to the value of the Upper Bound Cost.
          <br />
          <br />
          <strong>Affected Price Range</strong>
          <br />
          The affected price range is the range of prices at which the sliding scale is applied.
        </p>
        <h3>Fixed Markup Multiplier</h3>
        <p>
          The fixed markup multiplier uses a static markup multiplier or cost percentage to calculate the price of the beverage.
        </p>
        <h2>Formulas</h2>
        <h3>Price</h3>
        <p>
          The calculator uses the following formula to calculate the price of the beverage:
        </p>
        <p>
          <strong>Beverage Price = </strong>(Whole Sale Bottle Price * Markup Multiplier) / (Bottle Size in ML * 0.033814 / Ounces per Pour)
        </p>
        <h3>Sliding Scale Markup Multiplier</h3>
        <p>
          The calculator uses the following formulas to calculate the sliding scale markup multiplier:
        </p>
        <p>
          <strong>Interpolation Factor</strong> = (Whole Sale Bottle Price - Affected Price Range Floor) / (Affected Price Range Ceiling - Affected Price Range Floor)
        </p>
        <p>
          <strong>Raw Interpolated Multiplier</strong> = (Lower Bound Cost + (Upper Bound Cost - Lower Bound Cost) * Interpolation Factor)
        </p>
        <p>
          <strong>Final Multiplier</strong> = Math.min(Math.max(Raw Interpolated Multiplier, Lower Bound Cost), Upper Bound Cost) 
          <br /><br />
          This clamps the multiplier between the lower and upper bound costs.
        </p>
      </div>
    </div>
  );
};