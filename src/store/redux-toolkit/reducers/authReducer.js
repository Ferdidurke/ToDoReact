import {createSlice, current} from "@reduxjs/toolkit";
import {action} from "typesafe-actions";
import {userApi} from "../../../services/UserService";


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export const authReducer = createSlice({
    name: 'authReducer',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state, action) => {
            state.user = null
            state.isAuthenticated = false
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            userApi.endpoints.loginUser.matchFulfilled,
            (state, { payload }) => {

                state.token = payload.token
                state.user = {
                    firstName: payload.firstName,
                    lastName: payload.lastName,
                }
                console.log(current(state))
            }
        )
    },

})

export const {login, logout} = authReducer.actions