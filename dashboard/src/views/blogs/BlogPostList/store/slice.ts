import { TableQueries } from '@/@types/common'
import { BlogResponse } from '@/@types/schema.blog.respone'
import { ApiResponse } from '@/@types/schema.common.response'
import { apiGetSystem, apiPostSystem } from '@/services/SalesService'
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Paginated } from '@/@types/schema.common.response'

export const SLICE_NAME = 'salesBlogPostList'

export type BlogSliceState = {
    blogs: BlogResponse[]
    tableData: TableQueries
    isOpenManageAttribute: boolean
    loading: boolean
    hasMore: boolean
    totalElements: number
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
    isOpenManageAttribute: false,
    loading: false,
    hasMore: true,
    totalElements: 0
}

export const searchBlogPosts = createAsyncThunk(
    SLICE_NAME + '/searchBlogPosts',
    async (tableData: TableQueries) => {
        const response =
            await apiPostSystem<ApiResponse<Paginated<BlogResponse>>, TableQueries>(
                'blogs/search',
                tableData
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
        appendBlogs: (state, action: PayloadAction<BlogResponse[]>) => {
            state.blogs = [...state.blogs, ...action.payload]
        },
        setIsOpenManageAttribute: (state, action: PayloadAction<boolean>) => {
            state.isOpenManageAttribute = action.payload
        },
        setTableData: (state, action: PayloadAction<TableQueries>) => {
            state.tableData = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        },
        resetBlogs: (state) => {
            state.blogs = []
            state.hasMore = true
            state.totalElements = 0
            state.tableData.pageIndex = 1
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(searchBlogPosts.pending, (state) => {
                state.loading = true
            })
            .addCase(searchBlogPosts.fulfilled, (state, action) => {
                const { content, totalElements, pageable } = action.payload.data
                const isFirstPage = pageable.pageNumber === 0
                
                if (isFirstPage) {
                    // Load mới: replace
                    state.blogs = content
                } else {
                    // Load thêm: append
                    state.blogs = [...state.blogs, ...content]
                }
                
                state.totalElements = totalElements
                state.hasMore = state.blogs.length < totalElements
                state.loading = false
            })
            .addCase(searchBlogPosts.rejected, (state) => {
                state.loading = false
            })
    },
})
export const { setBlogs, appendBlogs, setIsOpenManageAttribute, setTableData, setLoading, resetBlogs } = slice.actions
export default slice.reducer
