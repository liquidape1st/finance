import { BlogPostEntityResponse } from '@/@types/schema.blog.post.respone'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { TableQueries } from '@/@types/common'
import { apiGetSystem } from '@/services/SalesService'
import { ApiResponse } from '@/@types/schema.common.response'

export const SLICE_NAME = 'salesBlogPostList'

export type BlogSliceState = {
    blogs: BlogPostEntityResponse[]
    tableData: TableQueries
}
const initialState: BlogSliceState = {
    blogs: [],
    tableData: {
        total: 0,
        query: '',
        sort: {
            key: '',
            order: 'desc',
        },
        pageSize: 10,
        pageIndex: 1,
    },
}

export const searchBlogPosts = createAsyncThunk(
    SLICE_NAME + '/searchBlogPosts',
    async () => {
        const response =
            await apiGetSystem<ApiResponse<BlogPostEntityResponse[]>>(
                'posts/search',
            )
        return response.data
    },
)

const slice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(searchBlogPosts.fulfilled, (state, action) => {
            state.blogs = action.payload.data
        })
    },
})
export default slice.reducer
