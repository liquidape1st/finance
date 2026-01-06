import { TableQueries } from "@/@types/common"
import { ApiResponse, Paginated } from "@/@types/schema.common.response"
import { TagRequest } from "@/@types/schema.tag.request"
import { TagResponse } from "@/@types/schema.tag.respone"
import { apiDeleteSystem, apiPostSystem, apiPutDataSystem, apiUpdateSystem } from "@/services/SalesService"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { set } from "lodash"

export const SLICE_NAME = 'systemTagListManageSlice'

export type TagListState = {
    selectedTagObject: TagResponse,
    loading: boolean
    tags: TagResponse[]
    tableData: TableQueries
    actionMode: "CREATE" | "UPDATE" | "DELETE" | "SEARCH"
}
const initialState: TagListState = {
    selectedTagObject: {
        id: '',
        translations: [],
    },
    loading: false,
    tags: [],
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

export const searchTags = createAsyncThunk(
    SLICE_NAME + '/searchTags',
    async (data: TableQueries) => {
        const response =
            await apiPostSystem<ApiResponse<Paginated<TagResponse>>, TableQueries>(
                'tags/search',
                data
            )
        return response.data
    },
)

export const createTag = createAsyncThunk(
    SLICE_NAME + '/createTag',
    async (data: TagRequest) => {
        const response = await apiPostSystem<ApiResponse<TagResponse>, TagRequest>(
            'tags/create',
            data
        )
        return response.data
    },
)

export const updateTag = createAsyncThunk(
    SLICE_NAME + '/updateTag',
    async (data: TagRequest) => {
        const response = await apiUpdateSystem<ApiResponse<TagResponse>, TagRequest>(
            'tags/update',
            data,
            data.id
        )
        return response.data
    },
)

export const deleteTag = createAsyncThunk(
    SLICE_NAME + '/deleteTag',
    async (id: string) => {
        const response = await apiDeleteSystem<ApiResponse<TagResponse>>(
            `tags/delete/${id}`
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
        setSelectedTagObject: (state, action) => {
            state.selectedTagObject = action.payload
        },
        setActionMode: (state, action) => {
            state.actionMode = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchTags.fulfilled, (state, action) => {
            state.tags = action.payload.data.content
            state.tableData.total = action.payload.data.totalElements
            state.tableData.pageIndex = action.payload.data.pageable.pageNumber + 1
            state.tableData.pageSize = action.payload.data.pageable.pageSize
            state.tableData.total = action.payload.data.totalElements
        })
    },
})
export const {
    setTableData, setSelectedTagObject, setActionMode
} = slice.actions
export default slice.reducer