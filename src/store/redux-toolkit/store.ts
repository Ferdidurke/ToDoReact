import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {todoReducer} from "./todoReducer";

import {blogReducer} from "./blogReducer";



const persistedState = localStorage.ReduxStorage ? JSON.parse(localStorage.getItem('ReduxStorage')!) : {}



export const store = configureStore ({
    reducer: {
        todo: todoReducer.reducer,
        blog: blogReducer.reducer,
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false
    }),
    preloadedState: persistedState

})

console.log(store.getState())


store.subscribe(()=>{
    localStorage.setItem('ReduxStorage', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch