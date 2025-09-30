import styles from "./Documentation.module.css";

export const Documentation = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) => {
  const maxWidth = 500;
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
        scrollBehavior: "smooth"
      }}
    >
      <div
        style={{ 
          position: "sticky",
          padding: "10px 0px",
          top: "0px",
          width: "100%",
          backgroundColor: "white",
          borderBottom: "2px solid black",
          cursor: "pointer",
          display: "flex",
          justifyContent: "right",
          alignItems: "center",
        }}
        onClick={() => setIsOpen(false)}
      >
        <div
          style={{
            paddingRight: "10px",
          }}
        >
          ❌
        </div>
      </div>
      <div
        style={{
          margin: "20px",
        }}
      >
        <article aria-labelledby="doc-title">
          <header>
            <h1 id="doc-title">How to Use the Calculator</h1>
            <p>
              This tool calculates the price of a beverage based on the cost of the beverage, markup multiplier, bottle size, and ounces per pour. 
              It can use a sliding scale or fixed markup multiplier.
            </p>
          </header>
          
          <h2>Table of Contents</h2>
          <ul>
            <li>
              <a href="#use-cases">Use Cases</a>
              <ul>
                <li>
                  <a href="#singular-use-cases">Singular Use Cases</a>
                </li>
                <li>
                  <a href="#bulk-use-cases">Bulk Use Cases</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#general-options">General Options</a>
            </li>
            <li>
              <a href="#markup-options">Markup Options</a>
              <ul>
                <li>
                  <a href="#sliding-scale">Sliding Scale</a>
                </li>
                <li>
                  <a href="#fixed-markup-multiplier">Fixed Markup Multiplier</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="#formulas">Formulas</a>
            </li>
          </ul>

          <section className={styles.section} id="use-cases" aria-labelledby="use-cases-title">
            <h2 id="use-cases-title">Use Cases</h2>

            <h3 className={styles.section} id="singular-use-cases">Singular Use Cases</h3>
            <p>For singular use cases, you can simply add a wholesale bottle price and adjust the rest of the options to your liking.</p>

            <h3 className={styles.section} id="bulk-use-cases">Bulk Use Cases</h3>
            <p>For bulk use cases, you can upload a Margin Edge Product CSV file or create a new CSV file with the following columns: (This is the format that Margin Edge uses)</p>

            <p>Use the calcultor at the top of the page to adjust your desired settings. The wholesale bottle price in this instance is unnecessary as it's derived from the CSV file.</p>

            <dl>
              <div>
                <dt><strong>Name</strong> <span className={styles.required}>*(Required)</span></dt>
                <dd><p>The name of the beverage.</p></dd>
              </div>

              <div>
                <dt><strong>Category</strong> <span className={styles.required}>*(Required)</span></dt>
                <dd>
                  <p>Category Names must be one of the following:</p>
                  <ul>
                    <li>Beer Bottle / Can</li>
                    <li>Wine</li>
                    <li>Liquor</li>
                    <li>NA Beverages</li>
                  </ul>
                  <p>The category of the beverage. This is used to determine the most common format of the beverage if it is not specified.</p>
                </dd>
              </div>

              <div>
                <dt><strong>Report By Unit</strong> <span className={styles.required}>*(Required)</span></dt>
                <dd>
                  <p>Report By Unit must be one of the following:</p>
                  <ul>
                    <li>Fluid Ounces</li>
                    <li>Milliliters</li>
                    <li>Liter</li>
                  </ul>
                  <p>The unit of the beverage.</p>
                  <p>examples:</p>
                  <ul>
                    <li>"750 Millileters"</li>
                    <li>"12 Fluid Ounces"</li>
                    <li>"2 Liter" or just "Liter"</li>
                  </ul>
                </dd>
              </div>

              <div>
                <dt><strong>Latest Price</strong> <span className={styles.required}>*(Required)</span></dt>
                <dd>
                  <p>examples: "$10.00", "1.50", "50"</p>
                  <p>The price of the beverage.</p>
                </dd>
              </div>

              <div>
                <dt>Accounting Code(Not Required)</dt>
              </div>
              <div>
                <dt>Item Count(Not Required)</dt>
              </div>
              <div>
                <dt>On Inventory(Not Required)</dt>
              </div>
              <div>
                <dt>Tax Exempt(Not Required)</dt>
              </div>
            </dl>
          </section>

          <section className={styles.section} id="general-options" aria-labelledby="general-options-title">
            <h2 id="general-options-title">General Options</h2>
            <dl>
              <div>
                <dt><strong>Wholesale Bottle Price</strong></dt>
                <dd>
                  <p>The wholesale bottle price is your cost to purchase a single bottle of the beverage.</p>
                </dd>
              </div>

              <div>
                <dt><strong>Cost Percentage</strong></dt>
                <dd>
                  <p>The cost percentage is the percentage of what you paid for the beverage compared to the price you sell it for.</p>
                </dd>
              </div>

              <div>
                <dt><strong>Markup Multiplier</strong></dt>
                <dd>
                  <p>The markup multiplier is the percentage that the beverage is marked up by.</p>
                </dd>
              </div>

              <div>
                <dt><strong>Bottle Size</strong></dt>
                <dd>
                  <p>The bottle size is the size of the bottle that the beverage is sold in. We are using milliliters (ml) as the unit.</p>
                </dd>
              </div>

              <div>
                <dt><strong>Ounces per Pour</strong></dt>
                <dd>
                  <p>The ounces per pour is the number of ounces per serving.</p>
                </dd>
              </div>

              <div>
                <dt><strong>Price Per Pour Floor</strong></dt>
                <dd>
                  <p>The Price Per Pour Floor is the lowest price per pour that the beverage can be sold for.</p>
                </dd>
              </div>

              <div>
                <dt><strong>Price Per Bottle Floor</strong></dt>
                <dd>
                  <p>The Price Per Bottle Floor is the lowest price per bottle that the beverage can be sold for.</p>
                </dd>
              </div>
            </dl>
          </section>

          <section className={styles.section} id="markup-options" aria-labelledby="markup-options-title">
            <h2 id="markup-options-title">Markup Options</h2>

            <p>The calculator has two options:</p>
            <ul>
              <li><strong>Sliding Scale</strong></li>
              <li><strong>Fixed Markup Multiplier</strong></li>
            </ul>

            <section className={styles.section} id="sliding-scale" aria-labelledby="sliding-scale-title">
              <h3 id="sliding-scale-title">Sliding Scale</h3>
              <p>The sliding scale is a range of prices that are calculated based on the cost of the beverage and the markup multiplier.</p>

              <dl>
                <div>
                  <dt><strong>Lower Bound Cost</strong></dt>
                  <dd><p>The lower bound cost is the lowest cost percentage that the beverage can be sold for. This translates to the highest markup multiplier allowed in your sliding scales range.(ie largest profit margin)</p></dd>
                </div>

                <div>
                  <dt><strong>Upper Bound Cost</strong></dt>
                  <dd><p>The upper bound cost is the highest cost percentage that the beverage can be sold for. This translates to the lowest markup multiplier allowed in your sliding scales range.(ie smallest profit margin)</p></dd>
                </div>

                <div>
                  <dt><strong>Affected Price Range Floor</strong></dt>
                  <dd>
                    <p>The affected price range floor is the lowest price at which the sliding scale is applied. Before this price, the markup multiplier is clamped the Lower Bound Cost.</p>
                  </dd>
                </div>

                <div>
                  <dt><strong>Affected Price Range Ceiling</strong></dt>
                  <dd>
                    <p>The affected price range ceiling is the highest price at which the sliding scale is applied. After this price, the markup multiplier is clamped the Upper Bound Cost.</p>
                  </dd>
                </div>

                <div>
                  <dt><strong>Affected Price Range</strong></dt>
                  <dd>
                    <p>The affected price range is the range of prices at which the sliding scale is applied.</p>
                  </dd>
                </div>
              </dl>
            </section>

            <section className={styles.section} id="fixed-markup-multiplier" aria-labelledby="fixed-markup-multiplier-title">
              <h3 id="fixed-markup-multiplier-title">Fixed Markup Multiplier</h3>
              <p>The fixed markup multiplier uses a static markup multiplier or cost percentage to calculate the price of the beverage.</p>
            </section>
          </section>

          <section className={styles.section} id="formulas" aria-labelledby="formulas-title">
            <h2 id="formulas-title">Formulas</h2>

            <section className={styles.section} id="price-formula" aria-labelledby="price-formula-title">
              <h3 id="price-formula-title">Price</h3>
              <p>The calculator uses the following formula to calculate the price of the beverage:</p>
              <p><strong>Beverage Price = </strong><code>(Whole Sale Bottle Price * Markup Multiplier) / (Bottle Size in ML * 0.033814 / Ounces per Pour)</code></p>
            </section>

            <section className={styles.section} id="sliding-scale-formulas" aria-labelledby="sliding-scale-formulas-title">
              <h3 id="sliding-scale-formulas-title">Sliding Scale Markup Multiplier</h3>
              <p>The calculator uses the following formulas to calculate the sliding scale markup multiplier:</p>
              <p><strong>Interpolation Factor</strong> = <code>(Whole Sale Bottle Price - Affected Price Range Floor) / (Affected Price Range Ceiling - Affected Price Range Floor)</code></p>
              <p><strong>Raw Interpolated Multiplier</strong> = <code>(Lower Bound Cost + (Upper Bound Cost - Lower Bound Cost) * Interpolation Factor)</code></p>
              <p>
                <strong>Final Multiplier</strong> = <code>Math.min(Math.max(Raw Interpolated Multiplier, Lower Bound Cost), Upper Bound Cost)</code>
              </p>
              <p>This clamps the multiplier between the lower and upper bound costs.</p>
            </section>
          </section>
        </article>
      </div>
    </div>
  );
};