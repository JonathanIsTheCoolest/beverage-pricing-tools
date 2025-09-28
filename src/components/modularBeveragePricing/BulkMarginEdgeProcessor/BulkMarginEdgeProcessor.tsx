import { useCSVDownloader } from "react-papaparse";
import { beverageSearchFilters } from "../../../constants/calculator";
import { useState, useRef, useEffect } from "react";
import type { ProcessedBeverageData } from "../../../interfaces/marginEdge";
import type { SearchFilter, SlidingScale } from "../../../interfaces/calculator";
import { bulkCsvRequest } from "../../../helpers/marginEdge/bulkCsvRequest";
import { BulkBeverageCard } from "../BulkBeverageCard/BulkBeverageCard";

export const BulkMarginEdgeProcessor = ({ markupMultiplier, costPercentage, ozPerPour, slidingScale }: { markupMultiplier: number, costPercentage: number, ozPerPour: number, slidingScale: SlidingScale }) => {
  const { CSVDownloader, Type } = useCSVDownloader();

  const filterCount = useRef<number>(0)
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedBeverageData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchFilter, setSearchFilter] = useState<SearchFilter>(beverageSearchFilters[0]);

  const handleCsvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCsvFile(e.target.files?.[0] || null);
  };

  const handleProcessData = async () => {
    if (csvFile) {
      const processedData = await bulkCsvRequest(csvFile, markupMultiplier, costPercentage, ozPerPour, slidingScale);
      setProcessedData(processedData as ProcessedBeverageData[]);
    }
  };

  const handleRemoveFile = () => {
    setCsvFile(null);
    setProcessedData([]);
    filterCount.current = 0;
    (document.getElementById("csvFileInput") as HTMLInputElement).value = "";
  };

  const handleSearch = (filter: SearchFilter, query: string) => {
    setSearchQuery(query)
    setSearchFilter(filter)
    filterCount.current = 0
  }

  return (
    <div>
    <h2>Upload Margin Edge CSV File and Process Data in Bulk</h2>
      <input id="csvFileInput" type="file" accept=".csv" onChange={(e) => handleCsvFileChange(e)} />
      <button onClick={() => handleRemoveFile()}>Remove File And Processed Data</button>
      <br />
      {
        csvFile && 
        <div>
          <h3>File Name: {csvFile.name}</h3>
          <h3>File Type: {csvFile.type}</h3>
          <h3>File Size: {csvFile.size}</h3>
        </div>
      }
      <br />
      <button onClick={() => handleProcessData()}>Process Data</button>
      {
        processedData.length > 0 &&
        <CSVDownloader
          type={Type.Button}
          filename={`${csvFile?.name}-processedData.csv`}
          bom /* helps Excel with UTF-8 */
          data={processedData}
        >
          Download CSV
        </CSVDownloader>
      }
      <br />
      <br />
      {
        processedData.length > 0 &&
        <div>
          <label>Search Filter:</label>
          {
            beverageSearchFilters.map((filter) => {
              return (
                <button 
                  key={filter.name}
                  onClick={() => handleSearch(filter, searchQuery)}
                  style={{
                    backgroundColor: searchFilter.name === filter.name ? "red" : "white",
                    color: searchFilter.name === filter.name ? "white" : "black",
                    border: "1px solid black",
                    borderRadius: "5px",
                    padding: "5px",
                    margin: "0 5px",
                  }}
                >{filter.description}</button>
              )
            })
          }
          <br /><br />
          <label>Search Product Name:</label>
          <input type="text" placeholder="Search" value={searchQuery} onChange={(e) => handleSearch(searchFilter, e.target.value)} />
        </div>
      }
      <br />
      <br />
      <div>
        {
          processedData.length > 0 &&
          <h3>Filtered Data: {filterCount.current} product{filterCount.current === 1 ? '' : 's'} match{filterCount.current === 1 ? 'es' : ''} the search criteria</h3>
        }
        {processedData.map((item: ProcessedBeverageData, index: number) => {
          const {name} = item
          if (item.name.toLowerCase().includes(searchQuery.toLowerCase()) && (searchFilter.name === item.success.name || searchFilter.name === 'all')) {
            filterCount.current++
          }
          return(
          <BulkBeverageCard
            key={name}
            processedData={item}
            setProcessedData={setProcessedData}
            index={index}
            searchQuery={searchQuery}
            searchFilter={searchFilter}
            slidingScale={slidingScale}
            filterRef={filterCount}
          />
        )})}
      </div>
    </div>
  )
}