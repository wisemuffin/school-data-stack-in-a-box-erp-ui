// Base types for metrics and dimensions
type MetricName = 'total_enrollments' | 'total_students';
type DimensionName = 'metric_time' | 'school_id' | 'student_id';

// Query type
export type MetricQuery = {
    metrics: MetricName[];
    group_by?: DimensionName[];
    where: any | null;
    start_time: string;
    end_time: string;
};

// Helper type to construct result type based on query
type QueryResult<M extends MetricName[], D extends DimensionName[]> = {
    [K in M[number] | D[number]]: K extends 'metric_time' ? string : number;
};

// Response type with generic parameters
export type MetricQueryResponse<
    M extends MetricName[] = MetricName[],
    D extends DimensionName[] = DimensionName[]
> = {
    results: QueryResult<M, D>[];
}; 