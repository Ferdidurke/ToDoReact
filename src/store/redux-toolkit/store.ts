import {configureStore} from "@reduxjs/toolkit";
import {todoReducer} from "./reducers/todoReducer";
import {blogApi} from "../../services/PostService";
import {userApi} from "../../services/UserService";
import {authReducer} from "./reducers/authReducer";
import {todoApi} from "../../services/TaskService";
import {logApi} from "../../services/LogService";


const persistedState = localStorage.ReduxStorage ? JSON.parse(localStorage.getItem('ReduxStorage')!) : {}


export const store = configureStore ({
    reducer: {
        auth: authReducer.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        [logApi.reducerPath]: logApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(blogApi.middleware).concat(userApi.middleware).concat(todoApi.middleware).concat(logApi.middleware),
    preloadedState: persistedState

})

console.log(store.getState())


store.subscribe(()=>{
    localStorage.setItem('ReduxStorage', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch