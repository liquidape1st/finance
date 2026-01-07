import { TableQueries } from "@/@types/common"
import { ApiResponse, Paginated } from "@/@types/schema.common.response"
import { CategoryRequest } from "@/@types/schema.category.request"
import { CategoryResponse } from "@/@types/schema.category.respone"
import { apiDeleteSystem, apiPostSystem, apiPutDataSystem, apiUpdateSystem } from "@/services/SalesService"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { set } from "lodash"

export const SLICE_NAME = 'systemCategoryListManageSlice'

export type CategoryListState = {
    selectedCategoryObject: CategoryResponse,
    loading: boolean
    categories: CategoryResponse[]
    tableData: TableQueries
    actionMode: "CREATE" | "UPDATE" | "DELETE" | "SEARCH"
}
const initialState: CategoryListState = {
    selectedCategoryObject: {
        id: '',
        translations: [],
    },
    loading: false,
    categories: [],
    tableData: {
        total: 0,
        query: '',
        pageIndex: 1,
        pageSize: 10,
        sort: {
            key: '',
            order: 'desc',
        }
    },
    actionMode: "CREATE"
}

export const searchCategories = createAsyncThunk(
    SLICE_NAME + '/searchCategories',
    async (data: TableQueries) => {
        const response =
            await apiPostSystem<ApiResponse<Paginated<CategoryResponse>>, TableQueries>(
                'categories/search',
                data
            )
        return response.data
    },
)

export const createCategory = createAsyncThunk(
    SLICE_NAME + '/createCategory',
    async (data: CategoryRequest) => {
        const response = await apiPostSystem<ApiResponse<CategoryResponse>, CategoryRequest>(
            'categories/create',
            data
        )
        return response.data
    },
)

export const updateCategory = createAsyncThunk(
    SLICE_NAME + '/updateCategory',
    async (data: CategoryRequest) => {
        const response = await apiUpdateSystem<ApiResponse<CategoryResponse>, CategoryRequest>(
            'categories/update',
            data,
            data.id
        )
        return response.data
    },
)

export const deleteCategory = createAsyncThunk(
    SLICE_NAME + '/deleteCategory',
    async (id: string) => {
        const response = await apiDeleteSystem<ApiResponse<CategoryResponse>>(
            `categories/delete/${id}`
        )
        return response.data
    },
)



const slice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState: initialState,
    reducers: {
        setTableData: (state, action) => {
            state.tableData = action.payload
        },
        setSelectedCategoryObject: (state, action) => {
            state.selectedCategoryObject = action.payload
        },
        setActionMode: (state, action) => {
            state.actionMode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchCategories.fulfilled, (state, action) => {
            state.categories = action.payload.data.content
            state.tableData.total = action.payload.data.totalElements
            state.tableData.pageIndex = action.payload.data.pageable.pageNumber + 1
            state.tableData.pageSize = action.payload.data.pageable.pageSize
            state.tableData.total = action.payload.data.totalElements
        })
    },
})
export const {
    setTableData, setSelectedCategoryObject, setActionMode
} = slice.actions
export default slice.reducer