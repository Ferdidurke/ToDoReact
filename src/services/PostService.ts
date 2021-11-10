import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPost, IUser} from "../Blog/Post/interfaces/interfaces";
import {IComment} from "../Blog/Post/interfaces/interfaces";
import {RootState} from "../store/redux-toolkit/store";
import {IParams} from "./UserService";

const baseURL = process.env.REACT_APP_BASE_URL

export const blogApi = createApi ({
    reducerPath: 'blogAPI',
    baseQuery: fetchBaseQuery ({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${ token }`)
            }
            return headers
        }}),
    tagTypes: ['Post', 'Comments'],
    endpoints: (build) => ({
        fetchPosts: build.query<any, IParams>({
            query: (params) => ({
                url: `/api/blog/posts`,
                params: {
                    limit: params.limit,
                    skip: params.skip,
                    sort: JSON.stringify(params.sort) || '{"date":"desc"}'
                }

            }),
            providesTags: result =>['Post']
        }),
        fetchAuthors: build.query<IUser[], any>({
            query: (params) => ({
                url: '/api/users',
            }),
        }),
        fetchComments: build.query<IComment[], string>({
            query: (id) => ({
                url: `/api/blog/comments/${id}`,
            }),
            providesTags: result =>['Comments']
        }),
        fetchSinglePost: build.query<IPost, string> ({
            query: (id) => ({
                url: `/api/blog/posts/${id}`
            }),
        }),
        addPost: build.mutation<any, any>({
            query: (post) => ({
                url: `/api/blog/posts`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: post,
            }),
            invalidatesTags: result => ['Post']
        }),
        deletePost: build.mutation<any, any>({
            query: (item) => ({
                url: `/api/blog/posts`,
                method: 'DELETE',
                body: item
            }),
            invalidatesTags: result => ['Post']
        }),
        addComment: build.mutation<any, any>({
            query: (comment) => ({
                url: `/api/blog/comments`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: comment,
            }),
            invalidatesTags: result => ['Comments']
        }),

    })

})