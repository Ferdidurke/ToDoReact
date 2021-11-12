import {createSlice} from "@reduxjs/toolkit";
import {userApi} from "../../../services/UserService";


export interface IAuthUser {
    token: string | null
    isAuthenticated: boolean,
    isLoading: boolean,
    user: null | any
}

const initialState: IAuthUser = {
    token: '',
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
            state.token = null
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
                state.token = payload.token
                state.user = {
                    id: payload.userId,
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                }
                state.isAuthenticated = true
                state.isLoading = false
            }
        )
    },
})

export const {logout} = authReducer.actions