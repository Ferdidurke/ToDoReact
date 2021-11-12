import {configureStore} from "@reduxjs/toolkit";
import {blogApi} from "../../services/PostService";
import {userApi} from "../../services/UserService";
import {authReducer} from "./reducers/authReducer";
import {todoApi} from "../../services/TaskService";
import {logApi} from "../../services/LogService";
import {todoReducer} from "./reducers/todoReducer";


const persistedState = localStorage.ReduxStorage ? JSON.parse(localStorage.getItem('ReduxStorage')!) : {}


export const store = configureStore ({
    reducer: {
        auth: authReducer.reducer,
        todo: todoReducer.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [todoApi.reducerPath]: todoApi.reducer,
        [logApi.reducerPath]: logApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat([blogApi.middleware, userApi.middleware, todoApi.middleware, logApi.middleware]),
    preloadedState: persistedState

})

console.log(store.getState())


store.subscribe(()=>{
    localStorage.setItem('ReduxStorage', JSON.stringify(store.getState().auth))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch