import ApiService from './ApiService'

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
export async function apiUpdateSystem<T, U extends Record<string, unknown>>(
    endpoint: string,
    data: U,
    id: string,
) {
    return ApiService.fetchData<T>({
        url: `${endpoint}/${id}`,
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
export async function apiDeleteSystem<T>(
    endpoint: string,
) {
    return ApiService.fetchData<T>({
        url: endpoint,
        method: 'delete',
    })
}
export async function apiPostFormDataSystem<
    T,
    U extends FormData,
>(endpoint: string, data: U, onProgress?: (percent: number) => void) {
    return ApiService.fetchData<T>({
        url: endpoint,
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        data: data,
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const percent = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                )
                console.log(`upload percent: ${percent}`)
                onProgress?.(percent)
            }
        },
    })
}
export async function apiPutDataSystem<T, U extends Record<string, unknown>>(
    endpoint: string,
    data: U,
    id: string,
    onProgress?: (percent: number) => void,
) {
    return ApiService.fetchData<T>({
        url: `${endpoint}/${id}`,
        method: 'put',
        data: data,
        onUploadProgress: (progressEvent) => {
            if (progressEvent.total) {
                const percent = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                )
                console.log(`upload percent: ${percent}`)
                onProgress?.(percent)
            }
        },
    })
}

// export async function apiUpdateFileToPreUrl<T>(
//     endpoint: string,
//     file: Blob | File | ArrayBuffer,
// ) {
//     return ApiService.fetchData<T>({
//         url: `${endpoint}`,
//         method: 'put',
//         data: file as unknown as Record<string, unknown>,
//     })
// }
