import {createSlice} from "@reduxjs/toolkit";
import {userApi} from "../../../services/UserService";


export interface IAuthUser {
    isAuthenticated: boolean,
    isLoading: boolean,
    user: null | any
}

const initialState: IAuthUser = {
    isAuthenticated: false,
    isLoading: false,
    user: null
}

export const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
            localStorage.removeItem('token')
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.loginUser.matchPending,
            (state) => {
              state.isLoading = true
        })
        builder.addMatcher(
            userApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
                localStorage.setItem('token', payload.token)
                state.isAuthenticated = true
                state.isLoading = false
            }
        )
        builder.addMatcher(
            userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
                state.user = {
                    id: payload.id,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                    email: payload.email
                }
                state.isAuthenticated = true
            }
        )
    },
})

export const {logout} = authReducer.actions