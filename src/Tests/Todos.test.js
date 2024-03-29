import React from "react";
import {render, screen, fireEvent, queryByText, waitFor, getByTestId} from "@testing-library/react";
import '@testing-library/jest-dom'
import {store} from "../store/redux-toolkit/store";
import {Provider} from "react-redux";
import {ToDoHeader} from "../Todos/Header/script";
import {UndoneTasks} from "../Todos/UndoneContainer/script";
import {DoneTasks} from "../Todos/DoneContainer/script";
import {DeletedTasks} from "../Todos/DeletedContainer/script";
import {createStore} from "redux";
import {todoReducer} from "../store/redux-toolkit/reducers/todoReducer";
import {Task, TaskForm} from "../Todos/task/script";
import userEvent from '@testing-library/user-event'
import Todos from "../Todos/Todos";
import {applyMiddleware, configureStore} from "@reduxjs/toolkit";
import {blogApi} from "../services/PostService";
import {BrowserRouter} from "react-router-dom";
import {authReducer} from "../store/redux-toolkit/reducers/authReducer";
import {userApi} from "../services/UserService";
import {todoApi} from "../services/TaskService";
import {logApi} from "../services/LogService";
import App from "../App";


const initialState = {


}



const renderWithRedux = (
    component,
    {
        store = configureStore({
            reducer: {
                auth: authReducer.reducer,
                todo: todoReducer.reducer,
                [blogApi.reducerPath]: blogApi.reducer,
                [userApi.reducerPath]: userApi.reducer,
                [todoApi.reducerPath]: todoApi.reducer,
                [logApi.reducerPath]: logApi.reducer,
            },
            middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat([blogApi.middleware, userApi.middleware, todoApi.middleware, logApi.middleware]),
        })
    } = {} ) => {
        return {
            ...render(
                <BrowserRouter>
                    <Provider store={store}>{component}</Provider>
                </BrowserRouter>
            )
            ,
            store
        }
}


describe('check for render App', () => {
    it('render login form', () => {
        render(
            <BrowserRouter>
                <Provider store={store}>
                    <App/>
                </Provider>
            </BrowserRouter>
        )
        expect(screen.getByText(/sign in/i)).toBeInTheDocument();
        expect(screen.getByText(/sign up/i)).toBeInTheDocument()

    })
})


describe('check for render Todos', () => {
    it('render containers', () => {
        const params = {
            sort: {
                deadlineDate: 'asc'
            },
            filter: {
                userId: '123123123'
            }
        }

        const auth = {
            isAuthenticated: true,
            isLoading: false,
            user: {
                id: '123123123',
                firstName: 'Alexey',
                lastName: 'Ivanov',
            }
        }
        const todo = {
            reqParams: params
        }

        const store = createStore(() => ({auth: auth, todo: todo}))
        const {container} = renderWithRedux(<Todos/>, {store})
        expect(screen.getByText(/task to do/i)).toBeInTheDocument();
        expect(screen.getByText(/done tasks/i)).toBeInTheDocument();
        expect(screen.getByText(/deleted tasks/i)).toBeInTheDocument()

    })
})

describe('check for render Tasks', () => {
    it('should check',  () => {
        const auth = {
            isAuthenticated: true,
            isLoading: false,
            user: {
                id: '123123123',
                firstName: 'Alexey',
                lastName: 'Ivanov',
            }
        }

        const task = new Task(auth.user.id, 'Example task text', new Date().toLocaleString())
        const store = createStore(() => ({ auth: auth, todo: {tasks: [task, task]} }), applyMiddleware(todoApi.middleware, blogApi.middleware, userApi.middleware, logApi.middleware))
        renderWithRedux(<TaskForm item={task} />, { store })
        expect(screen.queryByText(/example task text/i)).toBeInTheDocument()
        userEvent.click(screen.getByText(/example task text/i))
        expect(screen.queryByTestId('testInput')).toBeInTheDocument()
        fireEvent.change(screen.getByTestId('testInput'), {
            target: {value: 'test input value'}
        })

    });

})


describe('check render undoneTasksContainer', () => {
    it('check for render undoneTasksContainer', () => {
        const auth = {
            isAuthenticated: true,
            isLoading: false,
            user: {
                id: '123123123',
                firstName: 'Alexey',
                lastName: 'Ivanov',
            }
        }
        const task = new Task(auth.user.id, 'Example task text', new Date().toLocaleString())
        const store = createStore(() => ({ auth: auth, todo: {tasks: [task, task]} }), applyMiddleware(todoApi.middleware, blogApi.middleware, userApi.middleware, logApi.middleware))
        const {container} = render(
                <Provider store={store}>
                    <UndoneTasks />
                </Provider>
            )

        screen.debug()
    })

    // it ('check for replacing tasks in deletedTaskContainer', () => {
    //     const {container} = render(
    //         <Provider store={store}>
    //             <UndoneTasks />
    //         </Provider>
    //     )
    //     expect(container.firstChild.firstChild.nextSibling.firstChild.className).toBe('task')
    //     fireEvent.click(screen.getByTestId('deletedButton'))
    //     expect(container.firstChild.firstChild.nextSibling.firstChild).toBe(null)
    //
    // })

})
//
// describe('check for render doneTasksContainer', () => {
//         it('check for render doneTasksContainer', () => {
//             render(
//                 <Provider store={store}>
//                     <DoneTasks/>
//                 </Provider>
//             )
//             expect(screen.queryByText(/Выполненные задачи/i)).toBeInTheDocument();
//         })
//
// })
//
// describe('check render deletedTasksContainer', () => {
//
//     it ('check for render deletedTasksContainer',  () => {
//             render(
//                 <Provider store={store}>
//                      <DeletedTasks/>
//                 </Provider>
//             )
//             expect(screen.getByTestId('extendedBtn')).toBeInTheDocument();
//     })
//
//     it ('check for render extended deleteTasksContainer',  () => {
//             const { container } = render(
//                 <Provider store={store}>
//                     <DeletedTasks/>
//                 </Provider>
//             )
//             fireEvent.click(screen.getByTestId('extendedBtn'))
//            expect((container.firstChild.nextSibling.className === 'deleted__tasks__container extended')).toBe(true)
//     })
//     it ('check for delete task from deleted container on confirm', async () => {
//         const { container } = render(
//             <Provider store={store}>
//                 <DeletedTasks />
//             </Provider>
//         )
//         window.confirm = jest.fn(() => true)
//         fireEvent.click(screen.getByTestId('deletedButton'))
//         expect(window.confirm).toBeCalledWith('Are you right?')
//         await waitFor (() => expect(container.firstChild.nextSibling.firstChild).toBe(null))
//     })
//
// })
//
//
// describe('check render task', () => {
//     it ('check for render TaskForm',  () => {
//         const task = new Task ('ExampleTaskText', '10/10/2010')
//         render(
//             <Provider store={store}>
//                 <TaskForm item={task}/>
//             </Provider>
//         )
//         expect(screen.getByRole('button')).toBeInTheDocument()
//         expect(screen.getByText('ExampleTaskText')).toBeInTheDocument();
//         expect(screen.getByRole('checkbox')).toBeInTheDocument();
//     })
//
//     it ('check task for creating input',  () => {
//         const task = new Task ('ExampleTaskText', '10/10/2010')
//         const {container} = render(
//             <Provider store={store}>
//                 <TaskForm item={task}/>
//             </Provider>
//         )
//         const taskTextField = container.firstChild.childNodes[3].lastChild
//         fireEvent.dblClick(taskTextField)
//         expect(screen.getByTestId('testInput')).toBeInTheDocument()
//
//         fireEvent.change(screen.getByTestId('testInput'), {
//             target: {value: 'test input value'}
//         })
//         fireEvent.blur(screen.getByTestId('testInput'))
//         expect(screen.queryByTestId('testInput')).not.toBeInTheDocument()
//     })
//
//
// })
//
//
//
// describe('check for render items on donetasks', () => {
//     it('should check',  () => {
//         const task = new Task('111', '222')
//         task.isChecked = true
//         const store = createStore(() => ({todo: {tasks: [task]}}))
//         const {container} = renderWithRedux(<DoneTasks />, { store })
//         expect(container.firstChild.firstChild.nextSibling.firstChild.className).toBe('task')
//     });
//
// })


    // describe('check for sort', () => {
    //     it('check undone container for task sorting', () => {
    //         const {container} = render(
    //             <BrowserRouter>
    //                 <Provider store={store}>
    //                     <Todos/>
    //                 </Provider>
    //             </BrowserRouter>
    //         )
    //         fireEvent.change(screen.getByTestId('dateInput'), {
    //             target: {value: '2021-10-21T16:00'}
    //         })
    //         fireEvent.change(screen.getByRole('textbox'), {
    //             target: {value: 'Task 1'}
    //         })
    //         fireEvent.click(screen.getByTestId('newTaskButton'))
    //         fireEvent.change(screen.getByTestId('dateInput'), {
    //             target: {value: '2021-10-21T17:00'}
    //         })
    //         fireEvent.change(screen.getByRole('textbox'), {
    //             target: {value: 'Task 2'}
    //         })
    //         fireEvent.click(screen.getByTestId('newTaskButton'))
    //         const undoneContainer = container.querySelector('.undone-tasks__container')
    //
    //         expect(undoneContainer.firstChild.childNodes[3].lastChild.textContent).toBe('Task 1')
    //         const desc = screen.getByTestId('descSortButton')
    //         const asc = screen.getByTestId('ascSortButton')
    //         fireEvent.click(desc)
    //         expect(undoneContainer.firstChild.childNodes[3].lastChild.textContent).toBe('Task 2')
    //         fireEvent.click(asc)
    //         expect(undoneContainer.firstChild.childNodes[3].lastChild.textContent).toBe('Task 1')
    //     })
    // })
    //
    //
    // describe('check for replacing by keyboard event', () => {
    //     it('check', () => {
    //         const {container} = render(
    //             <BrowserRouter>
    //                 <Provider store={store}>
    //                     <Todos/>
    //                 </Provider>
    //             </BrowserRouter>
    //         )
    //
    //         fireEvent.click(screen.getByTestId('newTaskButton'))
    //         const undoneContainer = container.querySelector('.undone-tasks__container')
    //         const taskCheckbox = undoneContainer.firstChild.childNodes[4].lastChild
    //         const doneContainer = container.querySelector('.done-tasks__container')
    //         const deletedContainer = container.querySelector('.deleted__tasks__container')
    //         fireEvent.click(taskCheckbox)
    //         expect(doneContainer.firstChild.className).toBe('task')
    //         const task = undoneContainer.firstChild
    //         task.focus()
    //         userEvent.keyboard('{del}')
    //         expect(deletedContainer.firstChild.className).toBe('task')
    //
    //     })
    // })
    //
    //
    // describe('check for download files', () => {
    //     it('check for download logs.txt', () => {
    //         render(
    //             <Provider store={store}>
    //                 <ToDoHeader/>
    //             </Provider>
    //         )
    //         const link = {
    //             click: jest.fn()
    //         };
    //         global.URL.createObjectURL = function () {
    //         }
    //         global.URL.revokeObjectURL = function () {
    //         }
    //         jest.spyOn(document, "createElement").mockImplementation(() => link);
    //         fireEvent.click(screen.getByTestId('downloadBtn'))
    //         expect(link.download).toEqual("logs.txt");
    //         expect(link.click).toHaveBeenCalledTimes(1)
    //     })
    //
    // })

