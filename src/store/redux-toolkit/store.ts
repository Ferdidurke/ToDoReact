import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {toolkitSlice} from "./slice";
import {ITask} from "../../task/script";



const initialState = {
    tasks: <Array<ITask>>[],
    logs: <Array<string>>[]
}

const persistedState = localStorage.ReduxStorage ? JSON.parse(localStorage.getItem('ReduxStorage')!) : initialState

export const store = configureStore ({
    reducer: toolkitSlice.reducer,
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    preloadedState: persistedState

})


store.subscribe(()=>{
    localStorage.setItem('ReduxStorage', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch