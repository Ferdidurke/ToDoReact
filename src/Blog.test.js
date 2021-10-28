import React, {useState} from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Provider} from "react-redux";
import {store} from "./store/redux-toolkit/store";
import Sidebar from "./Blog/Sidebar";
import {Blog} from "./Blog/Blog";
import PostForm from "./Blog/Post";
import {Pagination} from "./Blog/functions/pagination";
import PostsContainer from "./Blog/PostsContainer/AllPostsPage";
import Comment from "./Blog/Post/comment";


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
        await waitFor(() => expect(postContainer.childNodes.length > 5).toBe(true))
    })


})

describe('check for render postform', () => {
    it('render post in postform', () => {
        const item = {
            id: 1,
            title: 'title',
            body: 'example',
            comments: []
        }

        const user = {
            name: 'example name'
        }

        render(
            <Provider store={store}>
                <PostForm item={item} user={user}/>
            </Provider>
        )
        expect(screen.queryByText('example')).toBeInTheDocument()
        expect(screen.queryByText(/title/i)).toBeInTheDocument()
        expect(screen.queryByText(/example name/i)).toBeInTheDocument()

    })
})


describe('check for create pagination links', () => {
        const postsPerPage = 1
        const totalPosts = 20
        const {container} = render(
                <Pagination totalPosts={totalPosts}
                            postsPerPage={postsPerPage}
                            />

        )
        const paginationList = container.querySelector('.pagination__list')
        expect(paginationList.childNodes.length).toBe(20)
})

describe('check for create comments', ()=> {
    it('check for add textfield', function () {
        const item = {
            id: 2,
            title: 'title',
            body: 'example',
        }
        const user = {
            name: 'example name'
        }

        render(
            <Provider store={store}>
                <PostForm item={item} user={user}/>
            </Provider>
        )
        fireEvent.click(screen.getByTestId('addCommentBtn'))

        expect(screen.queryByRole('textbox')).toBeInTheDocument()
        fireEvent.change(screen.getByRole('textbox'), {
            target: {value: 'test comment'}
        })
        expect(screen.queryByText('test comment')).toBeInTheDocument()
        fireEvent.click(screen.getByTestId('submitCommentBtn'))
        expect(screen.queryByRole('textbox')).not.toBeInTheDocument()

    });

    it('check for render comment', () => {
        const comment = {
            name: 'test for comment text',
            date: 'EXAMPLE COMMENT TEXT'
        }
        render(

                <Comment comment={comment}
                         counter={0}/>

        )
        expect(screen.queryByText(/test for comment text/i)).toBeInTheDocument()
    })
})


