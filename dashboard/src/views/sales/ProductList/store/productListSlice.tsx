import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
    apiDeleteSystem,
    apiGetSystem,
    apiPostSystem,
} from '@/services/SalesService'
import type { TableQueries } from '@/@types/common'
import { CategoryEntityResponse } from '@/@types/schema.category.respone'
import { ProductEntityResponse } from '@/@types/schema.product.respone'
import { ApiResponse, Paginated } from '@/@types/schema.common.response'

type FilterQueries = {
    name: string
    category: string[]
    status: number[]
    productStatus: number
}

export type SalesProductListState = {
    loading: boolean
    openProductFormDialog: boolean
    deleteConfirmation: boolean
    selectedDialog: "CREATE" | "UPDATE"
    selectedProduct: ProductEntityResponse
    tableData: TableQueries
    filterData: FilterQueries
    productList: ProductEntityResponse[]
    categoryList: CategoryEntityResponse[]
}

type GetSalesProductsRequest = TableQueries & { filterData?: FilterQueries }

export const SLICE_NAME = 'salesProductList'

export const searchPageProducts = createAsyncThunk(
    SLICE_NAME + '/getProducts',
    async (data: GetSalesProductsRequest) => {
        const response = await apiPostSystem<
            ApiResponse<Paginated<ProductEntityResponse>>,
            GetSalesProductsRequest
        >('products/search', data)
        return response.data
    },
)

export const getCategories = createAsyncThunk(
    SLICE_NAME + '/getCategories',
    async () => {
        const response =
            await apiGetSystem<ApiResponse<CategoryEntityResponse[]>>(
                '/categories/search',
            )
        return response.data
    },
)

export const deleteProduct = async (data: { id: string | string[] }) => {
    const response = await apiDeleteSystem<boolean, { id: string | string[] }>(
        'products',
        data,
    )
    return response.data
}

export const initialTableData: TableQueries = {
    total: 0,
    pageIndex: 1,
    pageSize: 10,
    query: '',
    sort: {
        order: '',
        key: '',
    },
}

const initialState: SalesProductListState = {
    loading: false,
    deleteConfirmation: false,
    openProductFormDialog: false,
    selectedDialog: 'CREATE',
    selectedProduct: {
        code: '',
        name: '',
        stock: 0,
        rating: 0,
        category: {
            id: '',
            name: '',
            createdAt: '',
            updatedAt: ''
        },
        price: 0,
        images: [],
        description: '',
        soldCount: 0,
        createdAt: 0,
        updatedAt: 0,
    },
    productList: [],
    categoryList: [],
    tableData: initialTableData,
    filterData: {
        name: '',
        category: ['bags', 'cloths', 'devices', 'shoes', 'watches'],
        status: [0, 1, 2],
        productStatus: 0,
    },
}

const productListSlice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setFilterData: (state, action) => {
            state.filterData = action.payload
        },
        setSelectedDialog: (state, action) => {
            state.selectedDialog = action.payload
        },
        setOpenProductFormDialog: (state, action) => {
            state.openProductFormDialog = action.payload
        },
        toggleDeleteConfirmation: (state, action) => {
            state.deleteConfirmation = action.payload
        },
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchPageProducts.fulfilled, (state, action) => {
                console.log('action.payload.data')
                console.log(action.payload.data)
                state.productList = action.payload.data.content
                state.tableData.total = action.payload.data.totalElements
                state.loading = false
            })
            .addCase(searchPageProducts.pending, (state) => {
                state.loading = true
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.categoryList = action.payload.data
                state.loading = false
            })
            .addCase(getCategories.pending, (state) => {
                state.loading = true
            })
    },
})

export const {
    setTableData,
    setSelectedDialog,
    setFilterData,
    toggleDeleteConfirmation,
    setSelectedProduct,
    setOpenProductFormDialog,
} = productListSlice.actions

export default productListSlice.reducer
