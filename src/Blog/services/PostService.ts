import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {Ipost, IUser} from "../Post/interfaces/interfaces";
import {IComment} from "../Post/comment";
import {createEntityAdapter} from "@reduxjs/toolkit";


export interface IParams {
    start: number,
    limit: number
}


const postsAdapter = createEntityAdapter<IUser>({
    sortComparer: (a, b) => a.name.localeCompare(b.name),
})

export const blogApi = createApi ({
    reducerPath: 'blogAPI',
    baseQuery: fetchBaseQuery ({baseUrl: 'https://jsonplaceholder.typicode.com/'}),
    tagTypes: ['Post', 'Comments'],
    endpoints: (build) => ({
        fetchPosts: build.query<Ipost[], IParams>({
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
            }),
        }),
        fetchComments: build.query<IComment[], IParams>({
            query: (params) => ({
                url: `/comments?_start=${params.start*5}&_limit=${params.limit*5}`,
            }),
            providesTags: result =>['Comments']
        }),

        fetchSinglePost: build.query<Ipost, number> ({
            query: (id) => ({
                url: `/posts/${id}`
            }),
        }),

        fetchSingleComment: build.query<IComment, IParams>({
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