import React from "react";
import {render, screen, fireEvent, queryByText, waitFor, getByTestId, getByText} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Provider, useDispatch} from "react-redux";
import {store} from "./store/redux-toolkit/store";
import Sidebar from "./Blog/Sidebar";
import {Blog} from "./Blog/Blog";
import PostForm from "./Blog/Post";

describe('check for render Blog', () => {
    it('render sidebar', () => {
        render(
            <Provider store={store}>
                <Sidebar/>
            </Provider>
        )
        expect(screen.getByText(/login/i)).toBeInTheDocument();

    })
})

describe('check for render posts', () => {
    it('render posts in post container', async () => {
        const {container} = render(
            <Provider store={store}>
                <Blog />
            </Provider>
        )
        const postContainer = container.querySelector('.posts__container')
        await waitFor(() => expect(postContainer.childNodes.length > 50).toBe(true))
    })

})

describe('check for render postform', () => {
    it('render posts in postform', () => {
        const item = {
            id: 'Author ID',
            title: 'title',
            body: 'example',
            comment: ''
        }
        render(
            <Provider store={store}>
                <PostForm item={item}/>
            </Provider>
        )
        expect(screen.queryByText('example')).toBeInTheDocument()
        expect(screen.queryByText(/title/i)).toBeInTheDocument()
        expect(screen.queryByText(/Author ID/i)).toBeInTheDocument()
    })
})