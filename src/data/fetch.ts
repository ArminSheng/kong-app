import { message } from "antd"

const API_HOST = 'api'

export const APIs = {
    routesPost: 'routes',
    consumersPost: 'consumers',
    pluginsPost: 'plugins',
    routes: 'schemas/routes',
    consumers: 'schemas/consumers',
    Plugins: 'schemas/plugins',
    validateRoutes: 'schemas/routes/validate',
    validateConsumers: 'schemas/consumers/validate',
    validatePlugins: 'schemas/plugins/validate',
}

export function fetchClient(input: RequestInfo, init?: RequestInit) {
    return () => fetch(`${API_HOST}/${input}`, init).then(res => res.json())
}

type ReturnData = {
    fields: {
        [key: string]: string | string[]
    },
    code: number,
    message: string
}

export function postClient(input: RequestInfo, init?: RequestInit) {
    return fetch(`${API_HOST}/${input}`, {
        ...init,
        method: 'POST',
        body: JSON.stringify(init?.body),
        headers: {
            "Content-Type": 'application/json'
        },
    }).then(res => res.json()).then(res => res as ReturnData)
}