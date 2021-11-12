// import React from "react";
// import {fireEvent, queryByRole, render, screen, waitFor} from "@testing-library/react";
// import '@testing-library/jest-dom'
// import {Provider} from "react-redux";
// import {store} from "./store/redux-toolkit/store";
// import {Blog} from "./Blog/Blog";
// import PostForm from "./Blog/Post";
// import SingleComment from "./Blog/Post/Comments/SingleComment";
// import {BrowserRouter, Route, Switch} from "react-router-dom";
// import Main from "./Main";
// import App from "./App";
//
//
// describe('check for render Blog', () => {
//     it('check for render page', () => {
//         render(
//             <BrowserRouter>
//                 <Provider store={store}>
//                     <Blog/>
//                 </Provider>
//             </BrowserRouter>
//         )
//         expect(screen.getAllByText(/BLOG/i)).toHaveLength(2)
//
//     })
//
// })
//
// describe('check for render posts', () => {
//     it('render posts in post container', async () => {
//         const {container} = render(
//             <BrowserRouter>
//                 <Provider store={store}>
//                     <Blog />
//                 </Provider>
//             </BrowserRouter>
//         )
//     })
//
// })
//
// describe('check for render postform', () => {
//     it('render post in postform, check for right user name', () => {
//         const item = {
//             id: 1,
//             userId: 1,
//             title: 'title',
//             body: 'example',
//             comments: []
//         }
//
//         const users = [{
//                         id: 1,
//                         name: 'right name'
//                         },
//                     {
//                         id: 2,
//                         name: 'wrong name'
//                     },
//
//         ]
//
//         render(
//             <BrowserRouter>
//                 <Provider store={store}>
//                     <PostForm item={item} users={users}/>
//                 </Provider>
//             </BrowserRouter>
//         )
//         expect(screen.queryByText('example')).toBeInTheDocument()
//         expect(screen.queryByText(/title/i)).toBeInTheDocument()
//         expect(screen.queryByText(/right name/i)).toBeInTheDocument()
//
//     })
// })
//
//
// describe('check for create comments', ()=> {
//     it('check for add textfield', function () {
//         const item = {
//             id: 2,
//             title: 'title',
//             body: 'example',
//         }
//         const user = {
//             name: 'example name'
//         }
//
//         render(
//             <BrowserRouter>
//                 <Provider store={store}>
//                     <PostForm item={item} user={user}/>
//                 </Provider>
//             </BrowserRouter>
//         )
//         fireEvent.click(screen.getByTestId('addCommentBtn'))
//
//         expect(screen.queryByRole('textbox')).toBeInTheDocument()
//         fireEvent.change(screen.getByRole('textbox'), {
//             target: {value: 'test comment'}
//         })
//         expect(screen.queryByText('test comment')).toBeInTheDocument()
//         fireEvent.click(screen.getByTestId('submitCommentBtn'))
//         expect(screen.queryByRole('textbox')).not.toBeInTheDocument()
//
//     });
//
//
// })
// describe('registration form check', () => {
//     it('should check for render registration form', function () {
//         render(
//             <BrowserRouter>
//                 <Provider store={store}>
//                         <App/>
//                 </Provider>
//             </BrowserRouter>
//         )
//         fireEvent.click(screen.getByTestId('test_register-btn'))
//         expect(screen.queryByText(/Введите имя/i)).toBeInTheDocument()
//         expect(screen.queryByText(/Введите фамилию/i)).toBeInTheDocument()
//         fireEvent.change(screen.getByTestId('registration-first__name'), {
//             target: {value: 'Ruslan'}
//         })
//         fireEvent.change(screen.getByTestId('registration-last__name'), {
//             target: {value: 'Mamedov'}
//         })
//         fireEvent.change(screen.getByTestId('registration-email'), {
//             target: {value: 'mamedov@gmail.com'}
//         })
//         screen.debug()
//         expect(screen.queryByText('Ruslan').toBeInTheDocument())
//         expect(screen.queryByText('Mamedov').toBeInTheDocument())
//         expect(screen.queryByText('mamedov@gmail.com').toBeInTheDocument())
//         fireEvent.click(screen.getByRole('button'))
//         expect(screen.getByTestId('registration-first__name').value).toBe('')
//         expect(screen.getByTestId('registration-last__name').value).toBe('')
//         expect(screen.getByTestId('registration-email').value).toBe('')
//     });
// })
//
//
//
