import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";
// import {Ipost, PostsState} from "../../Blog/Post/interfaces/interfaces";
// import {AppDispatch} from "./store";
// import axios from "axios";
// import {action} from "typesafe-actions";
//
//
//
//
// export const fetchPosts = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(blogReducer.actions.postsFetching())
//         const response = await axios.get<Ipost[]>('https://jsonplaceholder.typicode.com/posts/')
//         dispatch(blogReducer.actions.postsFetchingSuccess(response.data))
//     }
//     catch (error) {
//         if (error instanceof Error) {
//             dispatch(blogReducer.actions.postsFetchingError(error.message))
//         }
//     }
// }
//
//
//
//
// const initialState: PostsState = {
//         posts: [],
//         isLoading: false,
//         error: ''
// }
//
//
// export const blogReducer = createSlice({
//     name: 'blogReducer',
//     initialState,
//     reducers: {
//         postsFetching(state) {
//             state.isLoading = true
//             state.error = ''
//         },
//
//         postsFetchingSuccess (state, action) {
//             state.isLoading = false,
//             state.posts = action.payload,
//                 state.error = ''
//         },
//
//         postsFetchingError (state, action) {
//             state.isLoading = false,
//             state.error = action.payload
//         }
//
//
//     },
//
//
// })
//
//
// export default blogReducer.reducer
