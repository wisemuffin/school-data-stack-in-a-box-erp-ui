export interface MetricQuery {
    metrics: string[];
    group_by?: string[] | null;
    where?: string | null;
    start_time?: string | null;
    end_time?: string | null;
}

export interface MetricQueryResponse {
    sql: string;
    results: Record<string, any>[];
} 