import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiDetailSystem, apiGetSystem } from '@/services/SalesService'
import { ApiResponse } from '@/@types/schema.common.response'
import { BlogCategory } from '@/@types/schema.blog.category.respone'
import { BlogResponse } from '@/@types/schema.blog.respone'
import { TagResponse } from '@/@types/schema.tag.respone'

export const SLICE_NAME = "blogFormSlice";

export type BlogFormState = {
    blogCategories: BlogCategory[]
    tags: TagResponse[]
    blog: BlogResponse
    loading: boolean
}

const initState: BlogFormState = {
    blogCategories: [],
    tags: [],
    blog: {
        image: "",
        category: {
            id: '',
        },
        author: '',
        contentType: "",
        uiType: "",
        enabled: false,
        publishedAt: 0,
        updatedAt: "",
        featured: false,
        estimatedReadTime: 5,
        translations: [],
        tags: [],
        id: ""
    },
    loading: false
}

export const getBlogDetail = createAsyncThunk(
    SLICE_NAME + '/getBlogDetail',
    async (uuid: string) => {
        const response = await apiDetailSystem<ApiResponse<BlogResponse>>(
            'blogs/detail',
            uuid
        )
        // API trả về response.data.data
        return response.data
    },
)

export const getBlogCategories = createAsyncThunk(
    SLICE_NAME + '/getBlogCategories',
    async () => {
        const response = await apiGetSystem<ApiResponse<BlogCategory[]>>(
            'categories/search'
        )
        // API trả về response.data.data
        return response.data
    },
)

export const getTags = createAsyncThunk(
    SLICE_NAME + '/getTags',
    async () => {
        const response = await apiGetSystem<ApiResponse<TagResponse[]>>(
            'tags/search'
        )
        // API trả về response.data.data
        return response.data
    },
)

const slice = createSlice({
    name: SLICE_NAME,
    initialState: initState,
    reducers: {
        resetBlog: (state) => {
            state.blog = initState.blog
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBlogDetail.pending, (state) => {
                state.loading = true
            })
            .addCase(getBlogDetail.fulfilled, (state, action) => {
                state.loading = false
                state.blog = action.payload.data
            })
            .addCase(getBlogDetail.rejected, (state) => {
                state.loading = false
            })
            .addCase(getBlogCategories.fulfilled, (state, action) => {
                state.blogCategories = action.payload.data
            })
            .addCase(getTags.fulfilled, (state, action) => {
                state.tags = action.payload.data
            })

    }
})

export const { resetBlog } = slice.actions
export default slice.reducer;