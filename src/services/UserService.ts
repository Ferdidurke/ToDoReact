import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPost} from "../Blog/Post/interfaces/interfaces";

export interface IParams {
    start: number,
    limit: number
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery ({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['User'],
    endpoints: (build) => ({
        registerUser: build.mutation<any, any>({
            query: (user) => ({
                url: `/api/auth/register`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: user,
            }),
            invalidatesTags: result => ['User']
        }),
        loginUser: build.mutation<any, any>({
            query: (user) => ({
                url: `/api/auth/login`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: user,
            }),
            invalidatesTags: result => ['User']
        }),
    })

})