import { z } from 'zod';

// Schema for student LBOTE data
export const lboteSchema = z.object({
  school_code: z.string(),
  school_name: z.string(),
  srn: z.string(),
  family_nm: z.string(),
  first_nm: z.string(),
  scholastic_year: z.string(),
  grade_original: z.string(),
  stu_enroltype: z.string(),
  language_nm: z.string(),
  stu_english_at_home: z.string(),
  gender: z.string(),
  calyear: z.coerce.number()
});

// Schema for aggregate LBOTE data
export const lboteAggPivotSchema = z.object({
  school_code: z.string(),
  school_name: z.string(),
  language_nm: z.string(),
  calyear: z.coerce.number(),
  Kindergarten_M: z.coerce.number(),
  Kindergarten_F: z.coerce.number(),
  Year1_M: z.coerce.number(),
  Year1_F: z.coerce.number(),
  Year2_M: z.coerce.number(),
  Year2_F: z.coerce.number(),
  Year3_M: z.coerce.number(),
  Year3_F: z.coerce.number(),
  Year4_M: z.coerce.number(),
  Year4_F: z.coerce.number(),
  Year5_M: z.coerce.number(),
  Year5_F: z.coerce.number(),
  Year6_M: z.coerce.number(),
  Year6_F: z.coerce.number(),
  Year7_M: z.coerce.number(),
  Year7_F: z.coerce.number(),
  Year8_M: z.coerce.number(),
  Year8_F: z.coerce.number(),
  Year9_M: z.coerce.number(),
  Year9_F: z.coerce.number(),
  Year10_M: z.coerce.number(),
  Year10_F: z.coerce.number(),
  Year11_M: z.coerce.number(),
  Year11_F: z.coerce.number(),
  Year12_M: z.coerce.number(),
  Year12_F: z.coerce.number(),
  Total_Students: z.coerce.number()
});

// Define types based on the schemas
export type LboteData = z.infer<typeof lboteSchema>;
export type LboteAggPivotData = z.infer<typeof lboteAggPivotSchema>;

// Parse and validate CSV data
export function parseLboteData(data: any[]): LboteData[] {
  return data.map(item => lboteSchema.parse(item));
}

export function parseLboteAggPivotData(data: any[]): LboteAggPivotData[] {
  return data.map(item => lboteAggPivotSchema.parse(item));
} 