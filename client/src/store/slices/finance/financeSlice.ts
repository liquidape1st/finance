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
    related_selected_blog_translation_list: BlogTranslationClient[];
    blog_translation: BlogTranslationClient[];
    home_page_featured_blog_list: BlogTranslationClient[];
    category_translation: CategoryTranslation[];
    tableData: TableQueries
    isLoadingSelectedBlogPost: boolean;
    isLoadingBlogPostList: boolean;
    isLoadingCategoryList: boolean;
    isLoadingRelatedBlogPosts: boolean;
    isLoadingFeaturedBlogList: boolean
}
const initState: FinanceState = {
    home_page_featured_blog_list: [],
    related_selected_blog_translation_list: [],
    selected_blog_translation: {
        author: "",
        category: {
            categoryId: "",
            id: "",
            langCode: "",
            name: ""
        },
        uiType: "LEARN",
        contentType: "",
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
    isLoadingSelectedBlogPost: false,
    isLoadingBlogPostList: false,
    isLoadingCategoryList: false,
    isLoadingRelatedBlogPosts: false,
    isLoadingFeaturedBlogList: false,
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
        category: "",
        uiType: ""
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
    async (uiType: string) => {
        const response = await apiGetSystem<ApiResponse<CategoryTranslation[]>>(
            `/category-translations/filter?uiType=${uiType}`,
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

export const getRelatedClientBlogTranslationList = createAsyncThunk(
    SLICENAME + '/getRelatedClientBlogTranslationList',
    async ({ uuid }: { uuid: string }) => {
        const response = await apiGetSystem<ApiResponse<BlogTranslationClient[]>>(
            `/blog-translations/${uuid}/related`
        )
        return response.data
    }
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
            state.isLoadingBlogPostList = false;
        })
        builder.addCase(getClientBlogTranslationPage.pending, (state) => {
            state.isLoadingBlogPostList = true;
        })
        builder.addCase(getListClientCategoryTranslation.fulfilled, (state, action) => {
            state.category_translation = action.payload.data
            state.isLoadingCategoryList = false;
        })
        builder.addCase(getListClientCategoryTranslation.pending, (state) => {
            state.isLoadingCategoryList = true;
        })
        builder.addCase(getDetailClientBlogTranslation.fulfilled, (state, action) => {
            state.selected_blog_translation = action.payload.data
            state.isLoadingSelectedBlogPost = false
        })
        builder.addCase(getDetailClientBlogTranslation.pending, (state) => {
            state.isLoadingSelectedBlogPost = true;
        })
        builder.addCase(getHomePageFeaturedBlogTranslationList.fulfilled, (state, action) => {
            state.home_page_featured_blog_list = action.payload.data
            state.isLoadingFeaturedBlogList = false;
        })
        builder.addCase(getHomePageFeaturedBlogTranslationList.pending, (state) => {
            state.isLoadingFeaturedBlogList = true;
        })
        builder.addCase(getRelatedClientBlogTranslationList.fulfilled, (state, action) => {
            state.related_selected_blog_translation_list = action.payload.data
            state.isLoadingRelatedBlogPosts = false;
        })
        builder.addCase(getRelatedClientBlogTranslationList.pending, (state) => {
            state.isLoadingRelatedBlogPosts = true;
        })
    }
})
export const { setTableData } = slice.actions
export default slice.reducer;