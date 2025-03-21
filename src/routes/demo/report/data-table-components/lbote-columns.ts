import type { ColumnDef } from "@tanstack/table-core";

// Define the type for LBOTE data
export type LboteData = {
  school_code: string;
  school_name: string;
  srn: string;
  family_nm: string;
  first_nm: string;
  scholastic_year: string;
  grade_original: string;
  stu_enroltype: string;
  language_nm: string;
  stu_english_at_home: string;
  gender: string;
  calyear: string;
};

// Define the columns for the LBOTE data table
export const lboteColumns: ColumnDef<LboteData>[] = [
  {
    accessorKey: "school_code",
    header: "School Code",
  },
  {
    accessorKey: "school_name",
    header: "School Name",
  },
  {
    accessorKey: "first_nm",
    header: "First Name",
  },
  {
    accessorKey: "family_nm",
    header: "Family Name",
  },
  {
    accessorKey: "scholastic_year",
    header: "Year",
  },
  {
    accessorKey: "language_nm",
    header: "Language",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "stu_english_at_home",
    header: "English at Home",
  }
];

// Define the type for LBOTE Aggregate Pivot data
export type LboteAggPivotData = {
  school_code: string;
  school_name: string;
  language_nm: string;
  calyear: string;
  Total_Students: string;
  [key: string]: string; // For all the grade columns
};

// Define the columns for the LBOTE Aggregate Pivot data table
export const lboteAggPivotColumns: ColumnDef<LboteAggPivotData>[] = [
  {
    accessorKey: "school_code",
    header: "School Code",
  },
  {
    accessorKey: "school_name",
    header: "School Name",
  },
  {
    accessorKey: "language_nm",
    header: "Language",
  },
  {
    accessorKey: "calyear",
    header: "Year",
  },
  {
    accessorKey: "Total_Students",
    header: "Total Students",
  }
]; 