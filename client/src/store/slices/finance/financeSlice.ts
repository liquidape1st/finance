import { BlogTranslationClient } from "@/@types/blog.translation.client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TableQueries } from "@/@types/common";
import { apiPostSystem } from "@/services/SystemService";
import { ApiResponse } from "@/@types/common";
import { Paginated } from "@/@types/common";

export const SLICENAME = 'financeSlice'

export type FinanceState = {
    blog_translation: BlogTranslationClient[];
    tableData: TableQueries
}
const initState: FinanceState = {
    blog_translation: [],
    tableData: {
        pageIndex: 1,
        pageSize: 10,
        query: "",
        sort: {
            key: "",
            order: "asc"
        },
        total: 0
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

const slice = createSlice({
    name: SLICENAME,
    initialState: initState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getClientBlogTranslationPage.fulfilled, (state, action) => {
            state.blog_translation = action.payload.data.content
        })
    }
})
export default slice.reducer;