import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./todoReducer";


import {blogApi} from "../../services/PostService";
import {userApi} from "../../services/UserService";

const persistedState = localStorage.ReduxStorage ? JSON.parse(localStorage.getItem('ReduxStorage')!) : {}


export const store = configureStore ({
    reducer: {
        todo: todoReducer.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(blogApi.middleware).concat(userApi.middleware),
    preloadedState: persistedState

})

console.log(store.getState())


store.subscribe(()=>{
    localStorage.setItem('ReduxStorage', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch