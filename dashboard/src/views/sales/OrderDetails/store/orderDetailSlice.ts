import { OrderEntityResponse } from '@/@types/schema.order.response'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    ApiResponse,
    OrderPaymentMethodEnum,
    OrderPaymentStatusEnum,
    OrderStatusEnum,
} from '@/@types/schema.common.response'
import { apiGetSystem, apiPostSystem } from '@/services/SalesService'
import { TableQueries } from '@/@types/common'
import { UpdateOrderStatusRequest } from '@/@types/schema.order.request'

export const SLICE_NAME = 'orderDetailSlice'

export type OrderDetailState = {
    loading: boolean
    order: OrderEntityResponse
    tableData: TableQueries
}
const initState: OrderDetailState = {
    loading: false,
    order: {
        code: '',
        paymentStatus: OrderPaymentStatusEnum.PENDING,
        total: 0,
        paymentMethod: OrderPaymentMethodEnum.CASH,
        createdAt: 0,
        customerAddress: '',
        customerDistrictId: '',
        customerEmail: '',
        customerName: '',
        customerPhone: '',
        customerProvinceId: '',
        subTotal: 0,
        customerWardCode: '',
        feeShip: 0,
        items: [],
        histories: [],
        status: OrderStatusEnum.PENDING,
        updatedAt: 0,
    },
    tableData: {
        total: 0,
        pageIndex: 0,
        pageSize: 10,
        sort: {
            order: 'asc',
            key: ""
        },
        query: ""
    },
}

export const getDetailOrder = createAsyncThunk(
    SLICE_NAME + '/getDetailOrder',
    async (code: string) => {
        const response = await apiGetSystem<ApiResponse<OrderEntityResponse>>(
            `orders/detail/${code}`,
        )
        return response.data
    },
)

export const updateOrderStatus = createAsyncThunk(
    SLICE_NAME + '/updateOrderStatus',
    async (data: UpdateOrderStatusRequest) => {
        const response = await apiPostSystem<ApiResponse<OrderEntityResponse>, UpdateOrderStatusRequest>(
            `orders/change-status`,
            data
        )
        return response.data
    },
)

const slice = createSlice({
    name: SLICE_NAME,
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getDetailOrder.fulfilled, (state, action) => {
            console.log("action.payload.data")
            console.log(action.payload.data)
            state.order = action.payload.data
            state.loading = false
        })
        builder.addCase(getDetailOrder.pending, (state) => {
            state.loading = true
        })
    },
})
export default slice.reducer
