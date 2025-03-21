import { readFileSync } from 'fs';
import Papa from 'papaparse';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
  try {
    // Read the CSV files
    const lboteAggPivotPath = 'src/routes/demo/report/lbote_01_agg_pivot.csv';
    const lbotePath = 'src/routes/demo/report/lbote_01.csv';
    
    const lboteAggPivotContent = readFileSync(lboteAggPivotPath, 'utf-8');
    const lboteContent = readFileSync(lbotePath, 'utf-8');
    
    // Parse the CSV data
    const lboteAggPivotData = Papa.parse(lboteAggPivotContent, {
      header: true,
      skipEmptyLines: true
    }).data;
    
    const lboteData = Papa.parse(lboteContent, {
      header: true,
      skipEmptyLines: true,
      preview: 100 // Limit to 100 rows for better performance
    }).data;
    
    return {
      lboteAggPivotData,
      lboteData
    };
  } catch (error) {
    console.error('Error loading LBOTE data:', error);
    return {
      lboteAggPivotData: [],
      lboteData: []
    };
  }
}; 