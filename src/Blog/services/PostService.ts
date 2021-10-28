import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Ipost, IUser} from "../Post/interfaces/interfaces";
import {IComment} from "../Post/comment";

// interface ListResponce<T> {
//     page: number
//     perPage: number
//     total: number
//     totalPages: number
//     data: T[]
// }


export const blogApi = createApi ({
    reducerPath: 'blogAPI',
    baseQuery: fetchBaseQuery ({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchPosts: build.query<Ipost[], any>({
            query: (params) => ({
                url: `/posts?_start=${params.start}&_limit=${params.limit}`,
            }),
            providesTags: result =>['Post']
        }),
        fetchAuthors: build.query<IUser[], number>({
            query: (limit: number) => ({
                url: '/users',
                params: {
                    _limit: limit
                }
            })
        }),
        fetchComments: build.query<any, any>({
            query: (params) => ({
                url: `/comments?_start=${params.start*5}&_limit=${params.limit*5}`,
            }),
        }),

        fetchSinglePost: build.query<any, number> ({
            query: (id) => ({
                url: `/posts/${id}`
            }),
        }),

        fetchSingleComment: build.query<any, any>({
            query: (params) => ({
                url: `/comments?_start=${params.start}&_limit=${params.limit*5}`,
            }),
        }),


        addPost: build.mutation<any, any>({
            query: (post) => ({
                url: `/posts/`,
                method: 'POST',
                body: JSON.stringify(post),
            }),
            invalidatesTags: result => ['Post']
        }),

        deletePost: build.mutation<Ipost, Ipost>({
            query: (item) => ({
                url: `/posts/${item.id}`,
                method: 'DELETE',
                body: item
            }),
            invalidatesTags: result => ['Post']
        }),

    })

})