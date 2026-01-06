import { TableQueries } from "@/@types/common"
import { ApiResponse } from "@/@types/schema.common.response"
import { TagResponse } from "@/@types/schema.tag.respone"
import { apiGetSystem } from "@/services/SalesService"
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const SLICE_NAME = 'systemTagListManageSlice'

export type TagListState = {
    selectedTagObject: TagResponse,
    loading: boolean
    tags: TagResponse[]
    tableData: TableQueries
}
const initialState: TagListState = {
    selectedTagObject: {} as TagResponse,
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
    }
}

export const searchTags = createAsyncThunk(
    SLICE_NAME + '/searchTags',
    async () => {
        const response =
            await apiGetSystem<ApiResponse<TagResponse[]>>(
                'tags/search',
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
    },
    extraReducers: (builder) => {
        builder.addCase(searchTags.fulfilled, (state, action) => {
            state.tags = action.payload.data
        })
    },
})
export const {
    setTableData,
} = slice.actions
export default slice.reducer