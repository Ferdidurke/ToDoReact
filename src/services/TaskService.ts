import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {ITask} from "../Todos/task/script";
import {RootState} from "../store/redux-toolkit/store";

export const baseURL = process.env.REACT_APP_BASE_URL

export interface IToDoParams {
    sort: {
        deadlineDate: string
    }
    filter: {
        userId : null | string
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
            query: (params) => ({
                url: `/api/todo`,
                params: {
                    filter: JSON.stringify(params.filter),
                    sort: JSON.stringify(params.sort)
                }
            }),
            providesTags: ['Task']
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
            invalidatesTags: ['Task']
        }),
        changeTaskFields: build.mutation<ITask, Partial<ITask>>({
            query: ({ _id, ...patch }) => ({
                url: `/api/todo/${ _id }`,
                method: 'PATCH',
                body: patch,
            }),

        }),
        changeTaskColour: build.mutation<ITask, any>({
            query: (patch) => ({
                url: `/api/todo/`,
                method: 'PATCH',
                body: patch,
            }),

        }),
        deleteTask: build.mutation<ITask, string>({
            query: (id) => ({
                url: `/api/todo/`,
                method: 'DELETE',
                body: { id: id },
            }),

        })
    })

})

