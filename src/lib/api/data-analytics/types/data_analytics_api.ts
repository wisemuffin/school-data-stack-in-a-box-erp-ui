// Base types for metrics and dimensions
type MetricName = 'total_enrollments' | 'total_students';

// Define specific time granularities
type TimeGranularity = 'day' | 'week' | 'month' | 'quarter' | 'year';
type TimeDimension = `metric_time__${TimeGranularity}` | 'metric_time';

// Other dimensions
type EntityDimension = 'school_id' | 'student_id';
type DimensionName = TimeDimension | EntityDimension;

// Query type
export type MetricQuery = {
    metrics: MetricName[];
    group_by?: DimensionName[];
    where: any | null;
    start_time: string;
    end_time: string;
};

// Helper type to infer the time value type based on dimension
type TimeValue<D extends TimeDimension> = string;
type DimensionValue<D extends DimensionName> = D extends TimeDimension 
    ? TimeValue<D> 
    : number;

// Helper type to construct result type based on query
type QueryResult<M extends MetricName[], D extends DimensionName[]> = {
    [K in M[number]]: number;
} & {
    [K in D[number]]: DimensionValue<K>;
};

// Response type with generic parameters
export type MetricQueryResponse<
    M extends MetricName[] = MetricName[],
    D extends DimensionName[] = DimensionName[]
> = {
    results: QueryResult<M, D>[];
};

// Example usage:
type ExampleQuery = {
    metrics: ['total_enrollments'],
    group_by: ['metric_time__day', 'school_id'],
    where: null,
    start_time: string,
    end_time: string
};

// This would result in:
type ExampleResult = {
    total_enrollments: number;
    metric_time__day: string;
    school_id: number;
};