import { TableQueries } from '@/@types/common'
import { BlogResponse } from '@/@types/schema.blog.respone'
import { ApiResponse } from '@/@types/schema.common.response'
import { apiGetSystem } from '@/services/SalesService'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const SLICE_NAME = 'salesBlogPostList'

export type BlogSliceState = {
    blogs: BlogResponse[]
    tableData: TableQueries
    isOpenManageAttribute: boolean
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
    isOpenManageAttribute: false
}

export const searchBlogPosts = createAsyncThunk(
    SLICE_NAME + '/searchBlogPosts',
    async () => {
        const response =
            await apiGetSystem<ApiResponse<BlogResponse[]>>(
                'blogs/search',
            )
        return response.data
    },
)

const slice = createSlice({
    name: `${SLICE_NAME}/state`,
    initialState: initialState,
    reducers: {
        setBlogs: (state, action: PayloadAction<BlogResponse[]>) => {
            state.blogs = action.payload
        },
        setIsOpenManageAttribute: (state, action: PayloadAction<boolean>) => {
            state.isOpenManageAttribute = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(searchBlogPosts.fulfilled, (state, action) => {
            state.blogs = action.payload.data
        })
    },
})
export const { setBlogs, setIsOpenManageAttribute } = slice.actions
export default slice.reducer
