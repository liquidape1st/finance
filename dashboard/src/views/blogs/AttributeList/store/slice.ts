import { ApiResponse } from '@/@types/schema.common.response'
import { TagResponse } from '@/@types/schema.tag.respone'
import { apiGetSystem } from '@/services/SalesService'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const SLICE_NAME = 'salesBlogAttributeList'

export type BlogAttributeSliceState = {
    tags: TagResponse[]
}
const initialState: BlogAttributeSliceState = {
    tags: [],
}

export const searchBlogTags = createAsyncThunk(
    SLICE_NAME + '/searchBlogTags',
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
  
    },
    extraReducers: (builder) => {
        builder.addCase(searchBlogTags.fulfilled, (state, action) => {
            state.tags = action.payload.data
        })
    },
})
export const {  } = slice.actions
export default slice.reducer
