import ApiService from "@/services/ApiService";

export async function apiGetSystem<T>(endpoint: string) {
    return ApiService.fetchData<T>({
        url: endpoint,
        method: 'get',
    })
}
export async function apiPostSystem<T, U extends Record<string, unknown>>(
    endpoint: string,
    data: U,
) {
    return ApiService.fetchData<T>({
        url: endpoint,
        method: 'post',
        data,
    })
}
export async function apiPutSystem<T, U extends Record<string, unknown>>(
    endpoint: string,
    data: U,
    id?: string,
) {
    const url = id ? `${endpoint}/${id}` : endpoint
    return ApiService.fetchData<T>({
        url: url,
        method: 'put',
        data,
    })
}
export async function apiDetailSystem<T>(endpoint: string, id: string) {
    return ApiService.fetchData<T>({
        url: `${endpoint}/${id}`,
        method: 'get',
    })
}
export async function apiDeleteSystem<T, U extends Record<string, unknown> = Record<string, unknown>>(
    endpoint: string,
    data?: U,
    id?: string,
) {
    const url = id ? `${endpoint}/${id}` : endpoint
    return ApiService.fetchData<T>({
        url: url,
        method: 'delete',
        data,
    })
}