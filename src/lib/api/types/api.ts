// Base resource interfaces
export interface Student {
    id: number;
    first_name: string;
    last_name: string;
}

export interface School {
    id: number;
    name: string;
    geography_id: number;
}

export interface Geography {
    id: number;
    city: string;
    region: string;
}

export interface Class {
    id: number;
    name: string;
    scholastic_year_id: number;
}

export interface Attendance {
    id: number;
    student_id: number;
    class_id: number;
    present: boolean;
    attendance_date: string;
}

export interface Enrolment {
    id: number;
    student_id: number;
    start_date: string;
    end_date: string;
}

export interface Incident {
    id: number;
    student_id: number;
    incident_type: string;
    reported_datetime: string;
}

// Create DTOs (omit id field)
export type StudentCreate = Omit<Student, 'id'>;
export type SchoolCreate = Omit<School, 'id'>;
export type GeographyCreate = Omit<Geography, 'id'>;
export type ClassCreate = Omit<Class, 'id'>;
export type AttendanceCreate = Omit<Attendance, 'id'>;
export type EnrolmentCreate = Omit<Enrolment, 'id'>;
export type IncidentCreate = Omit<Incident, 'id'>;

// Response types
export interface ListResponse<T> {
    items: T[];
    total: number;
    next?: string | null;
}

export type SingleResponse<T> = T;

// Operation response types
export type GetListResponse<T> = ListResponse<T>;
export type GetOneResponse<T> = SingleResponse<T>;
export type CreateResponse<T> = SingleResponse<T>;
export type UpdateResponse<T> = SingleResponse<T>;
export type DeleteResponse<T> = SingleResponse<T>;

// Common query parameters
export interface PaginationParams {
    page?: number;
    limit?: number;
    offset?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

// Error types
export interface ValidationError {
    loc: (string | number)[];
    msg: string;
    type: string;
}

export interface ApiError {
    detail: ValidationError[];
} 