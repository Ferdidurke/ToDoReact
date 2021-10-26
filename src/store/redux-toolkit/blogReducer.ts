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


export const blogReducer = createSlice({
    name: 'blogReducer',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getData.fulfilled, (state, action: PayloadAction<any>) => {
            state.posts = action.payload
        })
    }
})


export default blogReducer.reducer
