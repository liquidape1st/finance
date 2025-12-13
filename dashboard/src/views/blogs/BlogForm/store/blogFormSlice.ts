import { BlogPostEntityResponse } from '@/@types/schema.blog.post.respone'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { apiDetailSystem, apiGetSystem } from '@/services/SalesService'
import { ApiResponse } from '@/@types/schema.common.response'
import { BlogPostCategoryEntityResponse } from '@/@types/schema.blog.post.category.respone'

export const  SLICE_NAME = "blogFormSlice";

export type BlogFormState = {
    blogCategories: BlogPostCategoryEntityResponse[]
    blog: BlogPostEntityResponse
    loading: boolean
}

const initState: BlogFormState = {
    blogCategories: [],
    blog: {
        author: "",
        content: "",
        title: "",
        excerpt: "",
        createdAt: 0,
        image: "",
        slug: "",
        blogCategory: {
            id: '',
            name: ""
        },
        publishedAt: 0,
        updatedAt: 0,
        id: ""
    },
    loading: false
}

export const getBlogDetail = createAsyncThunk(
    SLICE_NAME + '/getBlogDetail',
    async (uuid: string) => {
        const response = await apiDetailSystem<ApiResponse<BlogPostEntityResponse>>(
            'posts/detail',
            uuid
        )
        // API trả về response.data.data
        return  response.data
    },
)

export const getBlogCategories = createAsyncThunk(
    SLICE_NAME + '/getBlogCategories',
    async () => {
        const response = await apiGetSystem<ApiResponse<BlogPostCategoryEntityResponse[]>>(
            'blog-categories/search'
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

    }
})

export const { resetBlog } = slice.actions
export default slice.reducer;