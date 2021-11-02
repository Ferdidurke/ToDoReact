import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPost} from "../Blog/Post/interfaces/interfaces";

export interface IParams {
    start: number,
    limit: number
}

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery ({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['User', 'Post'],
    endpoints: (build) => ({
        addPost: build.mutation<any, any>({
            query: (post) => ({
                url: `/api/blog/post`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: post,
            }),
            invalidatesTags: result => ['User']
        }),


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