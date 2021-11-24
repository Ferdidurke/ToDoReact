import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


import {RootState} from "../store/redux-toolkit/store";


const baseURL = process.env.REACT_APP_BASE_URL

export interface ILog {
    body: string
}

export const logApi = createApi({
    reducerPath: 'logApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token')
            if (token) {
                headers.set('Authorization', `Bearer ${ token }`)
            }
            return headers
        }}),
    tagTypes: ['Logs'],
    endpoints: (build) => ({
        fetchLogs: build.query<ILog[], ILog>({
            query: () => ({
                url: `/api/logs`,
            }),
            providesTags: ['Logs']
        }),
        addLogEvent: build.mutation<ILog, ILog>({
            query: (log) => ({
                url: `/api/logs`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: log,
            }),
            invalidatesTags: ['Logs']
        }),
    })

})