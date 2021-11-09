import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ITask} from "../Todos/task/script";

import {RootState} from "../store/redux-toolkit/store";


const baseURL = process.env.REACT_APP_BASE_URL

export interface IToDoParams {
    sort: {
        deadlineDate?: string
        deletedDate?: string
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
    tagTypes: ['Task', 'Logs'],
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
        changeTaskFields: build.mutation<any, any>({
            query: ({id, ...patch}) => ({
                url: `/api/todo/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: result => ['Task']
        }),
        deleteTask: build.mutation<any, any>({
            query: (id) => ({
                url: `/api/todo/`,
                method: 'DELETE',
                body: { id: id },
            }),
            invalidatesTags: result => ['Task']
        })
    })

})

