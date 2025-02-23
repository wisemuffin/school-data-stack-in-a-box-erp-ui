import type { MetricQuery, MetricQueryResponse } from './types/data_analytics_api';

const API_URL = 'http://localhost:8001';

export async function queryMetrics(query: MetricQuery): Promise<MetricQueryResponse> {
    const response = await fetch(`${API_URL}/query`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(query)
    });

    if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
    }

    return await response.json();

} 