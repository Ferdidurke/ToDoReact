import {createSlice, createAsyncThunk, PayloadAction} from "@reduxjs/toolkit";



export const getData = createAsyncThunk(
    'getData',
    async () => fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
)


const initialState = {
        posts: <Array<any>>[],
        isLoading: false
}
const randomDate = (start: Date, end: Date) => {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}




export const blogReducer = createSlice({
    name: 'blogReducer',
    initialState,
    reducers: {
        sortPostsOnAuthorDesc : (state, action) => {
            state.posts = [...action.payload]
        },
        sortPostsOnAuthorAsc : (state, action) => {
            state.posts = [...action.payload]
        },
        sortPostsOnDateAsc : (state, action) => {
            state.posts = [...action.payload]
        },
        sortPostsOnDateDesc : (state, action) => {
            state.posts = [...action.payload]
        },
        addNewComment : (state, action) => {
            const index = state.posts.findIndex((item) => item.id === action.payload.id)

            state.posts[index].comments.push({commentText: action.payload.text, commentDate: action.payload.date})
            state.posts = [...state.posts]
        }

    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
            state.posts = action.payload
            state.posts = state.posts.map(((item) => ({
                ...item,
                date: randomDate(new Date(2012, 0, 1), new Date()),
                comments: []
            })))

        })
    }
})


export default blogReducer.reducer
export const {sortPostsOnAuthorDesc, sortPostsOnAuthorAsc, sortPostsOnDateAsc, sortPostsOnDateDesc, addNewComment} = blogReducer.actions