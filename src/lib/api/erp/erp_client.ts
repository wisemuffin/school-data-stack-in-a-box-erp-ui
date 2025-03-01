import { error } from '@sveltejs/kit';
import type { 
    School, 
    Student, 
    SchoolCreate, 
    StudentCreate,
    PaginationParams,
    CreateResponse,
    UpdateResponse,
    DeleteResponse,
    Geography,
    GeographyCreate,
    Class,
    ClassCreate,
    Attendance,
    AttendanceCreate,
    Enrolment,
    EnrolmentCreate,
    Incident,
    IncidentCreate,
    GetListResponse,
    GetOneResponse
} from './types/erp_api';

const base = 'http://127.0.0.1:8000';

interface SendOptions {
    method: string;
    path: string;
    data?: unknown;
    token?: string;
}

async function send<T>({ method, path, data, token }: SendOptions): Promise<T> {
    const opts: RequestInit = { method, headers: {} };

    if (data) {
        opts.headers = {
            ...opts.headers,
            'Content-Type': 'application/json'
        };
        opts.body = JSON.stringify(data);
    }

    if (token) {
        opts.headers = {
            ...opts.headers,
            'Authorization': `Token ${token}`
        };
    }

    const res = await fetch(`${base}/${path}`, opts);
    if (res.ok || res.status === 422) {
        const text = await res.text();
        return text ? JSON.parse(text) : {};
    }

    throw error(res.status);
}

// Students API
export function getAllStudents(params?: PaginationParams): Promise<GetListResponse<Student>> {
    const searchParams = new URLSearchParams();
    if (params) {
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.offset) searchParams.set('offset', params.offset.toString());
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.order) searchParams.set('order', params.order);
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return send<GetListResponse<Student>>({ method: 'GET', path: `students${query}` });
}

export function getStudentById(id: string): Promise<GetOneResponse<Student>> {
    return send<GetOneResponse<Student>>({ method: 'GET', path: `students/${id}` });
}

export function createStudent(data: StudentCreate): Promise<CreateResponse<Student>> {
    return send<CreateResponse<Student>>({ method: 'POST', path: 'students', data });
}

export function updateStudent(id: string, data: StudentCreate): Promise<UpdateResponse<Student>> {
    return send<UpdateResponse<Student>>({ method: 'PUT', path: `students/${id}`, data });
}

export function deleteStudent(id: string): Promise<DeleteResponse<Student>> {
    return send<DeleteResponse<Student>>({ method: 'DELETE', path: `students/${id}` });
}

// Schools API
export function getAllSchools(params?: PaginationParams): Promise<GetListResponse<School>> {
    const searchParams = new URLSearchParams();
    if (params) {
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.offset) searchParams.set('offset', params.offset.toString());
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.order) searchParams.set('order', params.order);
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return send<GetListResponse<School>>({ method: 'GET', path: `schools${query}` });
}

export function getSchoolById(id: string): Promise<GetOneResponse<School>> {
    return send<GetOneResponse<School>>({ method: 'GET', path: `schools/${id}` });
}

export function createSchool(data: SchoolCreate): Promise<CreateResponse<School>> {
    return send<CreateResponse<School>>({ method: 'POST', path: 'schools', data });
}

export function updateSchool(id: string, data: SchoolCreate): Promise<UpdateResponse<School>> {
    return send<UpdateResponse<School>>({ method: 'PUT', path: `schools/${id}`, data });
}

export function deleteSchool(id: string): Promise<DeleteResponse<School>> {
    return send<DeleteResponse<School>>({ method: 'DELETE', path: `schools/${id}` });
}

// Generic methods for backward compatibility
export function get<T>(path: string, token?: string): Promise<GetListResponse<T>> {
    return send<GetListResponse<T>>({ method: 'GET', path, token });
}

export function del<T>(path: string, token?: string): Promise<DeleteResponse<T>> {
    return send<DeleteResponse<T>>({ method: 'DELETE', path, token });
}

export function post<T>(path: string, data: unknown, token?: string): Promise<CreateResponse<T>> {
    return send<CreateResponse<T>>({ method: 'POST', path, data, token });
}

export function put<T>(path: string, data: unknown, token?: string): Promise<UpdateResponse<T>> {
    return send<UpdateResponse<T>>({ method: 'PUT', path, data, token });
}

// Geography API
export function getAllGeographies(params?: PaginationParams): Promise<GetListResponse<Geography>> {
    const searchParams = new URLSearchParams();
    if (params) {
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.offset) searchParams.set('offset', params.offset.toString());
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.order) searchParams.set('order', params.order);
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return send<GetListResponse<Geography>>({ method: 'GET', path: `geographies${query}` });
}

export function getGeographyById(id: string): Promise<GetOneResponse<Geography>> {
    return send<GetOneResponse<Geography>>({ method: 'GET', path: `geographies/${id}` });
}

export function createGeography(data: GeographyCreate): Promise<CreateResponse<Geography>> {
    return send<CreateResponse<Geography>>({ method: 'POST', path: 'geographies', data });
}

export function deleteGeography(id: string): Promise<DeleteResponse<Geography>> {
    return send<DeleteResponse<Geography>>({ method: 'DELETE', path: `geographies/${id}` });
}

// Class API
export function getAllClasses(params?: PaginationParams): Promise<GetListResponse<Class>> {
    const searchParams = new URLSearchParams();
    if (params) {
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.offset) searchParams.set('offset', params.offset.toString());
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.order) searchParams.set('order', params.order);
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return send<GetListResponse<Class>>({ method: 'GET', path: `classes${query}` });
}

export function getClassById(id: string): Promise<GetOneResponse<Class>> {
    return send<GetOneResponse<Class>>({ method: 'GET', path: `classes/${id}` });
}

export function createClass(data: ClassCreate): Promise<CreateResponse<Class>> {
    return send<CreateResponse<Class>>({ method: 'POST', path: 'classes', data });
}

export function updateClass(data: { id: number } & ClassCreate): Promise<UpdateResponse<Class>> {
    return send<UpdateResponse<Class>>({ method: 'PUT', path: `classes/${data.id}`, data });
}

export function deleteClass(id: string): Promise<DeleteResponse<Class>> {
    return send<DeleteResponse<Class>>({ method: 'DELETE', path: `classes/${id}` });
}

// Attendance API
export function getAllAttendances(params?: PaginationParams): Promise<GetListResponse<Attendance>> {
    const searchParams = new URLSearchParams();
    if (params) {
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.offset) searchParams.set('offset', params.offset.toString());
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.order) searchParams.set('order', params.order);
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return send<GetListResponse<Attendance>>({ method: 'GET', path: `attendances${query}` });
}

export function getAttendanceById(id: string): Promise<GetOneResponse<Attendance>> {
    return send<GetOneResponse<Attendance>>({ method: 'GET', path: `attendances/${id}` });
}

export function createAttendance(data: AttendanceCreate): Promise<CreateResponse<Attendance>> {
    return send<CreateResponse<Attendance>>({ method: 'POST', path: 'attendances', data });
}

export function updateAttendance(data: { id: number } & AttendanceCreate): Promise<UpdateResponse<Attendance>> {
    return send<UpdateResponse<Attendance>>({ method: 'PUT', path: `attendances/${data.id}`, data });
}

export function deleteAttendance(id: string): Promise<DeleteResponse<Attendance>> {
    return send<DeleteResponse<Attendance>>({ method: 'DELETE', path: `attendances/${id}` });
}

// Enrolment API
export function getAllEnrolments(params?: PaginationParams): Promise<GetListResponse<Enrolment>> {
    const searchParams = new URLSearchParams();
    if (params) {
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.offset) searchParams.set('offset', params.offset.toString());
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.order) searchParams.set('order', params.order);
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return send<GetListResponse<Enrolment>>({ method: 'GET', path: `enrolments${query}` });
}

export function getEnrolmentById(id: string): Promise<GetOneResponse<Enrolment>> {
    return send<GetOneResponse<Enrolment>>({ method: 'GET', path: `enrolments/${id}` });
}

export function createEnrolment(data: EnrolmentCreate): Promise<CreateResponse<Enrolment>> {
    return send<CreateResponse<Enrolment>>({ method: 'POST', path: 'enrolments', data });
}

export function updateEnrolment(data: { id: number } & EnrolmentCreate): Promise<UpdateResponse<Enrolment>> {
    return send<UpdateResponse<Enrolment>>({ method: 'PUT', path: `enrolments/${data.id}`, data });
}

export function deleteEnrolment(id: string): Promise<DeleteResponse<Enrolment>> {
    return send<DeleteResponse<Enrolment>>({ method: 'DELETE', path: `enrolments/${id}` });
}

// Incident API
export function getAllIncidents(params?: PaginationParams): Promise<GetListResponse<Incident>> {
    const searchParams = new URLSearchParams();
    if (params) {
        if (params.page) searchParams.set('page', params.page.toString());
        if (params.limit) searchParams.set('limit', params.limit.toString());
        if (params.offset) searchParams.set('offset', params.offset.toString());
        if (params.sort) searchParams.set('sort', params.sort);
        if (params.order) searchParams.set('order', params.order);
    }
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return send<GetListResponse<Incident>>({ method: 'GET', path: `incidents${query}` });
}

export function getIncidentById(id: string): Promise<GetOneResponse<Incident>> {
    return send<GetOneResponse<Incident>>({ method: 'GET', path: `incidents/${id}` });
}

export function createIncident(data: IncidentCreate): Promise<CreateResponse<Incident>> {
    return send<CreateResponse<Incident>>({ method: 'POST', path: 'incidents', data });
}

export function updateIncident(data: { id: number } & IncidentCreate): Promise<UpdateResponse<Incident>> {
    return send<UpdateResponse<Incident>>({ method: 'PUT', path: `incidents/${data.id}`, data });
}

export function deleteIncident(id: string): Promise<DeleteResponse<Incident>> {
    return send<DeleteResponse<Incident>>({ method: 'DELETE', path: `incidents/${id}` });
}

// Utility API endpoints
export function resetDatabase(): Promise<void> {
    return send<void>({ method: 'POST', path: 'reset' });
}

// Or if you prefer a more descriptive name:
export function resetDatabaseToInitialState(): Promise<void> {
    return send<void>({ method: 'POST', path: 'reset' });
}
