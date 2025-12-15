import { BlogTranslationClient } from "@/@types/blog.translation.client";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableQueries } from "@/@types/common";
import { apiGetSystem, apiPostSystem } from "@/services/SystemService";
import { ApiResponse } from "@/@types/common";
import { Paginated } from "@/@types/common";
import { CategoryTranslation } from "@/@types/blog.category.client";
export const SLICENAME = 'financeSlice'

export type FinanceState = {
    blog_translation: BlogTranslationClient[];
    category_translation: CategoryTranslation[];
    tableData: TableQueries
}
const initState: FinanceState = {
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
    }
})
export const { setTableData } = slice.actions
export default slice.reducer;