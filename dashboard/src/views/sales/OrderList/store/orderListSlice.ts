import {
    createAsyncThunk,
    createSlice,
    current,
    PayloadAction,
} from '@reduxjs/toolkit'
import { apiPostSystem } from '@/services/SalesService'
import {
    ApiResponse,
    OrderStatusEnum,
    Paginated,
} from '@/@types/schema.common.response'
import { OrderEntityResponse } from '@/@types/schema.order.response'
import { OrderTableQueries } from '@/@types/schema.order.item.request'

export type SalesOrderListState = {
    loading: boolean
    orderList: OrderEntityResponse[]
    tableData: OrderTableQueries
    deleteMode: 'single' | 'batch' | ''
    selectedRows: string[]
    selectedRow: string
}

export const SLICE_NAME = 'salesOrderList'

export const getOrders = createAsyncThunk(
    SLICE_NAME + '/getOrders',
    async (data: OrderTableQueries) => {
        const response = await apiPostSystem<
            ApiResponse<Paginated<OrderEntityResponse>>,
            OrderTableQueries
        >('/orders/search', data)
        return response.data
    },
)

export const deleteOrders = async (data: { id: string | string[] }) => {
    // const response = await apiDeleteSalesOrders<
    //     boolean,
    //     { id: string | string[] }
    // >(data)
    // return response.data
}

const initialState: SalesOrderListState = {
    loading: false,
    orderList: [],
    tableData: {
        total: 0,
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sort: {
            order: '',
            key: '',
        },
        status: '',
    },
    selectedRows: [],
    selectedRow: '',
    deleteMode: '',
}

const orderListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setOrderList: (state, action) => {
            state.orderList = action.payload
        },
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setSelectedRows: (state, action) => {
            state.selectedRows = action.payload
        },
        setSelectedRow: (state, action) => {
            state.selectedRow = action.payload
        },
        addRowItem: (state, { payload }) => {
            const currentState = current(state)
            if (!currentState.selectedRows.includes(payload)) {
                state.selectedRows = [...currentState.selectedRows, ...payload]
            }
        },
        removeRowItem: (state, { payload }: PayloadAction<string>) => {
            const currentState = current(state)
            if (currentState.selectedRows.includes(payload)) {
                state.selectedRows = currentState.selectedRows.filter(
                    (id) => id !== payload,
                )
            }
        },
        setDeleteMode: (state, action) => {
            state.deleteMode = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getOrders.fulfilled, (state, action) => {
                state.orderList = action.payload.data.content
                state.tableData.total = action.payload.data.totalElements
                state.loading = false
            })
            .addCase(getOrders.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setOrderList,
    setTableData,
    setSelectedRows,
    setSelectedRow,
    addRowItem,
    removeRowItem,
    setDeleteMode,
} = orderListSlice.actions

export default orderListSlice.reducer
