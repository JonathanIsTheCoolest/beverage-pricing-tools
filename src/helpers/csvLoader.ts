export default async function loadCsvFromAssets(filename: string) {
  try {
    const response = await fetch(`src/assets/${filename}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const csvText = await response.text();

    return csvText;
  } catch (error) {
    console.error("Error fetching CSV:", error);
  }
}