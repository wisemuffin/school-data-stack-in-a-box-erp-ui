import { error } from '@sveltejs/kit';

const base = 'http://127.0.0.1:8000';

interface SendOptions {
    method: string;
    path: string;
    data?: any;
    token?: string;
}

async function send({ method, path, data, token }: SendOptions): Promise<any> {
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

export function get(path: string, token?: string): Promise<any> {
    return send({ method: 'GET', path, token });
}

export function del(path: string, token?: string): Promise<any> {
    return send({ method: 'DELETE', path, token });
}

export function post(path: string, data: any, token?: string): Promise<any> {
    return send({ method: 'POST', path, data, token });
}

export function put(path: string, data: any, token?: string): Promise<any> {
    return send({ method: 'PUT', path, data, token });
}
