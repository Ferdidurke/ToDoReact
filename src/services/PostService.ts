import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IPost, IUser} from "../Blog/Post/interfaces/interfaces";
import {IComment} from "../Blog/Post/interfaces/interfaces";
import {RootState} from "../store/redux-toolkit/store";
import {IParams} from "../Blog/PostsContainer/AllPostsPage";

const isProd = process.env.NODE_ENV === 'production'
const baseURL = isProd ? process.env.REACT_APP_BASE_URL : process.env.REACT_APP_LOCAL_URL

export const blogApi = createApi ({
    reducerPath: 'blogAPI',
    baseQuery: fetchBaseQuery ({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers
        }}),
    tagTypes: ['Post', 'Comments'],
    endpoints: (build) => ({
        fetchPosts: build.query<any, IParams>({
            query: (params) => ({
                url: `/api/blog/posts?skip=${params.skip}&limit=${params.limit}`,

            }),
            providesTags: result =>['Post']
        }),
        fetchAuthors: build.query<IUser[], any>({
            query: (params) => ({
                url: '/api/users',
            }),
        }),
        fetchComments: build.query<IComment[], IParams>({
            query: (params) => ({
                url: `/api/blog/comments`,
            }),
            providesTags: result =>['Comments']
        }),
        fetchSinglePost: build.query<IPost, number> ({
            query: (id) => ({
                url: `/posts/${id}`
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
        deletePost: build.mutation<IPost, IPost>({
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