import {createApi} from '@reduxjs/toolkit/query/react'
import type {BaseQueryFn} from '@reduxjs/toolkit/query'
import type {AxiosError, AxiosRequestConfig} from 'axios'
import BaseService from './BaseService'

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
        async (request) => {
            try {
                return BaseService(request)
            } catch (axiosError) {
                const err = axiosError as AxiosError
                return {
                    error: {
                        status: err.response?.status,
                        data: err.response?.data || err.message,
                    },
                }
            }
        }

const RtkQueryService = createApi({
    reducerPath: 'rtkApi',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
})

export default RtkQueryService