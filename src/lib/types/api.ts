export interface School {
    id: number;
    name: string;
}

export interface Student {
    id: number;
    first_name: string;
    last_name: string;
    school_id: number;
}

export interface ApiResponse<T> {
    items: T[];
    total: number;
    page: number;
    size: number;
} 