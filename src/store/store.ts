import {applyMiddleware, createStore} from 'redux';
import {initialState, reducer} from "./reducer";
import thunk from 'redux-thunk'

const persistedState = localStorage.ReduxStorage ? JSON.parse(localStorage.getItem('ReduxStorage')!) : initialState

export const store = createStore(reducer, persistedState, applyMiddleware(thunk));

store.subscribe(()=>{
    localStorage.setItem('ReduxStorage', JSON.stringify(store.getState()))
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

