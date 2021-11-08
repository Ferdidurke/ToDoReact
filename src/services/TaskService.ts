import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ITask} from "../Todos/task/script";

import {RootState} from "../store/redux-toolkit/store";


const baseURL = process.env.REACT_APP_BASE_URL

export interface IToDoParams {
    sort: {
        deadlineDate: string
    }
}


export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${ token }`)
            }
            return headers
        }}),
    tagTypes: ['Task'],
    endpoints: (build) => ({
        fetchTasks: build.query<ITask[], IToDoParams>({
            query: (todoParams) => ({
                url: `/api/todo`,
                params: {
                    sort: JSON.stringify(todoParams.sort)
                }
            }),
            providesTags: result =>['Task']
        }),
        addNewTask: build.mutation<ITask, ITask>({
            query: (task) => ({
                url: `/api/todo`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: task,
            }),
            invalidatesTags: result => ['Task']
        }),
        changeStatus: build.mutation<any, any>({
            query: (id) => ({
                url: `/api/todo`,
                method: 'PATCH',
                body: id,
            }),
            invalidatesTags: result => ['Task']
        })
    })

})