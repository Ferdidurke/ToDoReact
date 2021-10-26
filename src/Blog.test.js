import React, {useState} from "react";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Provider} from "react-redux";
import {store} from "./store/redux-toolkit/store";
import Sidebar from "./Blog/Sidebar";
import {Blog} from "./Blog/Blog";
import PostForm from "./Blog/Post";
import {Pagination} from "./Blog/functions/pagination";
import PostsContainer from "./Blog/PostsContainer";
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

    it ('check for sorting posts', () =>{
        const {container} = render(
            <Provider store={store}>
                <PostsContainer />
            </Provider>
        )
        const postContainer = container.querySelector('.posts__container')
        const ascBtn = screen.getByTestId('sortAuthorAsc')
        const descBtn = screen.getByTestId('sortAuthorDesc')
        fireEvent.click(ascBtn)
        expect(postContainer.firstChild.id).toBe('1')
        fireEvent.click(descBtn)
        expect(postContainer.firstChild.id).toBe('100')
    })

})

describe('check for render postform', () => {
    it('render post in postform', () => {
        const item = {
            id: 'Author ID',
            title: 'title',
            date: new Date(),
            body: 'example',
            comments: []
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
            date: new Date(),
            body: 'example',
            comments: []
        }

        render(
            <Provider store={store}>
                <PostForm item={item}/>
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
            text: 'test for comment text',
            date: new Date().toLocaleString()
        }
        render(

                <Comment text={comment.text}
                         date={comment.date}
                         counter={0}/>

        )
        expect(screen.queryByText(/test for comment text/i)).toBeInTheDocument()
    })
})


