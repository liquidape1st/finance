import { BlogTranslationClient } from "@/@types/blog.translation.client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableQueries } from "@/@types/common";
import { apiGetSystem, apiPostSystem } from "@/services/SystemService";
import { ApiResponse } from "@/@types/common";
import { Paginated } from "@/@types/common";
import { CategoryTranslation } from "@/@types/blog.category.client";
export const SLICENAME = 'financeSlice'

export type FinanceState = {
    selected_blog_translation: BlogTranslationClient;
    blog_translation: BlogTranslationClient[];
    home_page_featured_blog_list: BlogTranslationClient[];
    category_translation: CategoryTranslation[];
    tableData: TableQueries
}
const initState: FinanceState = {
    home_page_featured_blog_list: [],
    selected_blog_translation: {
        author: "",
        category: {
            categoryId: "",
            id: "",
            langCode: "",
            name: ""
        },
        content: "",
        createdAt: "",
        estimatedReadTime: 0,
        excerpt: "",
        featured: false,
        image: "",
        id: "",
        langCode: "",
        slug: "",
        title: "",
        updatedAt: "",
        view: 0
    },
    blog_translation: [],
    category_translation: [],
    tableData: {
        pageIndex: 1,
        pageSize: 10,
        query: "",
        sort: {
            key: "",
            order: "asc"
        },
        total: 0,
        category: ""
    }
}

export const getClientBlogTranslationPage = createAsyncThunk(
    SLICENAME + '/getClientBlogTranslationPage',
    async (query: TableQueries) => {
        const response = await apiPostSystem<ApiResponse<Paginated<BlogTranslationClient>>, TableQueries>(
            '/blog-translations/search',
            query
        )
        return response.data
    },
)

export const getListClientCategoryTranslation = createAsyncThunk(
    SLICENAME + '/getListClientCategoryTranslation',
    async () => {
        const response = await apiGetSystem<ApiResponse<CategoryTranslation[]>>(
            '/category-translations/search',
        )
        return response.data
    },
)

export const getDetailClientBlogTranslation = createAsyncThunk(
    SLICENAME + '/getDetailClientBlogTranslation',
    async ({ langCode, slug }: { langCode: string; slug: string }) => {
        const response = await apiGetSystem<ApiResponse<BlogTranslationClient>>(
            `/blog-translations/detail/${langCode}/${slug}`
        )
        return response.data
    }
)

export const getHomePageFeaturedBlogTranslationList = createAsyncThunk(
    SLICENAME + '/getHomePageFeaturedBlogTranslationList',
    async ({langCode}: {langCode: string}) => {
        const response = await apiPostSystem<ApiResponse<BlogTranslationClient[]>, Record<string, string | number>>(
            '/blog-translations/featured',
            {
                "langCode": langCode,
                "category": "",
                "seed": Math.floor(Date.now() / 1000)
            }
        )
        return response.data
    },
)

const slice = createSlice({
    name: SLICENAME,
    initialState: initState,
    reducers: {
        setTableData: (state, action: PayloadAction<TableQueries>) => {
            state.tableData = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getClientBlogTranslationPage.fulfilled, (state, action) => {
            state.blog_translation = action.payload.data.content
        })
        builder.addCase(getListClientCategoryTranslation.fulfilled, (state, action) => {
            state.category_translation = action.payload.data
        })
        builder.addCase(getDetailClientBlogTranslation.fulfilled, (state, action) => {
            state.selected_blog_translation = action.payload.data
        })
        builder.addCase(getHomePageFeaturedBlogTranslationList.fulfilled, (state, action) => {
            state.home_page_featured_blog_list = action.payload.data
        })
    }
})
export const { setTableData } = slice.actions
export default slice.reducer;