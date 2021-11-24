import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPost, IPostData, IUser} from "../Blog/Post/interfaces/interfaces";
import {IComment} from "../Blog/Post/interfaces/interfaces";
import {RootState} from "../store/redux-toolkit/store";
import {IParams} from "./UserService";

const baseURL = process.env.REACT_APP_BASE_URL

export const blogApi = createApi ({
    reducerPath: 'blogAPI',
    baseQuery: fetchBaseQuery ({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${ token }`)
            }
            return headers
        }}),
    tagTypes: ['Post', 'Comments'],
    endpoints: (build) => ({
        fetchPosts: build.query<IPostData, IParams>({
            query: (params) => ({
                url: `/api/blog/posts`,
                params: {
                    limit: params.limit,
                    skip: params.skip,
                    sort: JSON.stringify(params.sort) || '{"date":"desc"}'
                }

            }),
            providesTags: ['Post']
        }),
        fetchAuthors: build.query<IUser[], number>({
            query: () => ({
                url: '/api/users',
            }),
        }),
        fetchComments: build.query<IComment[], string>({
            query: (id) => ({
                url: `/api/blog/comments/${id}`,
            }),
            providesTags: ['Comments']
        }),
        fetchSinglePost: build.query<IPost, string> ({
            query: (id) => ({
                url: `/api/blog/posts/${id}`
            }),
        }),
        addPost: build.mutation<IPost, Partial<IPost>>({
            query: (post) => ({
                url: `/api/blog/posts`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: post,
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation<IPost, Partial<IPost>>({
            query: (post) => ({
                url: `/api/blog/posts`,
                method: 'DELETE',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        addComment: build.mutation<IComment, Partial<IComment>>({
            query: (comment) => ({
                url: `/api/blog/comments`,
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: comment,
            }),
            invalidatesTags: ['Comments']
        }),
        deleteComment: build.mutation<IComment, Partial<IComment>>({
            query: (comment) => ({
                url: `/api/blog/comments`,
                method: 'DELETE',
                body: comment,
            }),
            invalidatesTags: ['Comments']
        }),

    })

})