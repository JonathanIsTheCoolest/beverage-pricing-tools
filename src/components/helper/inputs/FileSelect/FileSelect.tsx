export const FileSelect = ({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
  return (
    <span>
      <input hidden id="csvFileInput" type="file" accept=".csv" onChange={(e) => onChange(e)} />
      <button onClick={() => (document.getElementById("csvFileInput") as HTMLInputElement).click()}>
        Upload CSV
      </button>
    </span>
  );
};