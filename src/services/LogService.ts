import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";


import {RootState} from "../store/redux-toolkit/store";


const baseURL = process.env.REACT_APP_BASE_URL



export const logApi = createApi({
    reducerPath: 'logApi',
    baseQuery: fetchBaseQuery({
        baseUrl: baseURL,
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).auth.token
            if (token) {
                headers.set('Authorization', `Bearer ${ token }`)
            }
            return headers
        }}),
    tagTypes: ['Logs'],
    endpoints: (build) => ({
        fetchLogs: build.query<any, any>({
            query: () => ({
                url: `/api/logs`,
            }),
            providesTags: result =>['Logs']
        }),
        addLogEvent: build.mutation<any, any>({
            query: (log) => ({
                url: `/api/logs`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: log,
            }),
            invalidatesTags: result => ['Logs']
        }),
    })

})