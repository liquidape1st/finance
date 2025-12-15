import {combineReducers, Reducer, UnknownAction} from 'redux'
import RtkQueryService from '@/services/RtkQueryService'
import locale, {InitLocaleState} from "@/store/slices/locale";
import finance, { FinanceState } from "@/store/slices/finance";

export type RootState = {
    locale: InitLocaleState
    finance: FinanceState
    /* eslint-disable @typescript-eslint/no-explicit-any */
    [RtkQueryService.reducerPath]: any
}

export interface AsyncReducers {
    [key: string]: Reducer<any, UnknownAction>
}

const staticReducers = {
    locale,
    finance,
    [RtkQueryService.reducerPath]: RtkQueryService.reducer,
}

const rootReducer =
    (asyncReducers?: AsyncReducers) =>
        (state: RootState, action: UnknownAction) => {
            const combinedReducer = combineReducers({
                ...staticReducers,
                ...asyncReducers,
            })
            return combinedReducer(state, action)
        }

export default rootReducer