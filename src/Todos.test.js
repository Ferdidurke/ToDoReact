import React from "react";
import {render, screen, fireEvent, queryByText, waitFor, getByTestId} from "@testing-library/react";
import '@testing-library/jest-dom'
import {store} from "./store/redux-toolkit/store";
import {Provider} from "react-redux";
import {ToDoHeader} from "./Todos/Header/script";
import {UndoneTasks} from "./Todos/UndoneContainer/script";
import {DoneTasks} from "./Todos/DoneContainer/script";
import {DeletedTasks} from "./Todos/DeletedContainer/script";
import {createStore} from "redux";
import {todoReducer} from "./store/redux-toolkit/todoReducer";
import {Task, TaskForm} from "./Todos/task/script";
import userEvent from '@testing-library/user-event'
import Todos from "./Todos/Todos";
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import {blogReducer} from "./store/redux-toolkit/blogReducer";


const renderWithRedux = (
    component,
    {
        store = configureStore({
            reducer: {
                todo: todoReducer.reducer,
                blog: blogReducer.reducer,
            },
        })
    } = {} ) => {
        return {
            ...render(<Provider store={store}>{component}</Provider>),
            store
        }
}

describe('Redux testing', () => {
    it('check initial state', () => {
        const { queryByText } = renderWithRedux(<UndoneTasks/>)
        expect(queryByText("Дата выполнения задачи")).toBeNull()
    })

})


describe('check for render Todos/Header', () => {
    it('render Todos', () => {
        render(
            <Provider store={store}>
                <Todos/>
            </Provider>
        )
        expect(screen.getByText(/TO DO LIST/i)).toBeInTheDocument();

    })



    it('render Header', () => {
        render(
            <Provider store={store}>
                <ToDoHeader/>
            </Provider>
        )

        expect(screen.getByText(/TO DO LIST/i)).toBeInTheDocument();
        fireEvent.change(screen.getByRole('textbox'), {
            target: {value: 'TEST'}
        })
        fireEvent.click(screen.getByTestId('newTaskButton'))
        expect(screen.getByRole('textbox').value).toBe('')
    })


})



describe('check render undoneTasksContainer', () => {
    it('check for render undoneTasksContainer', () => {
        render(
            <Provider store={store}>
                <UndoneTasks/>
            </Provider>
        )
        expect(screen.queryByText(/Невыполненные задачи/i)).toBeInTheDocument();
    })

    it ('check for replacing tasks in deletedTaskContainer', () => {
        const {container} = render(
            <Provider store={store}>
                <UndoneTasks />
            </Provider>
        )
        expect(container.firstChild.firstChild.nextSibling.firstChild.className).toBe('task')
        fireEvent.click(screen.getByTestId('deletedButton'))
        expect(container.firstChild.firstChild.nextSibling.firstChild).toBe(null)

    })

})

describe('check for render doneTasksContainer', () => {
        it('check for render doneTasksContainer', () => {
            render(
                <Provider store={store}>
                    <DoneTasks/>
                </Provider>
            )
            expect(screen.queryByText(/Выполненные задачи/i)).toBeInTheDocument();
        })

})

describe('check render deletedTasksContainer', () => {

    it ('check for render deletedTasksContainer',  () => {
            render(
                <Provider store={store}>
                     <DeletedTasks/>
                </Provider>
            )
            expect(screen.getByTestId('extendedBtn')).toBeInTheDocument();
    })

    it ('check for render extended deleteTasksContainer',  () => {
            const { container } = render(
                <Provider store={store}>
                    <DeletedTasks/>
                </Provider>
            )
            fireEvent.click(screen.getByTestId('extendedBtn'))
           expect((container.firstChild.nextSibling.className === 'deleted__tasks__container extended')).toBe(true)
    })
    it ('check for delete task from deleted container on confirm', async () => {
        const { container } = render(
            <Provider store={store}>
                <DeletedTasks />
            </Provider>
        )
        window.confirm = jest.fn(() => true)
        fireEvent.click(screen.getByTestId('deletedButton'))
        expect(window.confirm).toBeCalledWith('Are you right?')
        await waitFor (() => expect(container.firstChild.nextSibling.firstChild).toBe(null))
    })

})


describe('check render task', () => {
    it ('check for render TaskForm',  () => {
        const task = new Task ('ExampleTaskText', '10/10/2010')
        render(
            <Provider store={store}>
                <TaskForm item={task}/>
            </Provider>
        )
        expect(screen.getByRole('button')).toBeInTheDocument()
        expect(screen.getByText('ExampleTaskText')).toBeInTheDocument();
        expect(screen.getByRole('checkbox')).toBeInTheDocument();
    })

    it ('check task for creating input',  () => {
        const task = new Task ('ExampleTaskText', '10/10/2010')
        const {container} = render(
            <Provider store={store}>
                <TaskForm item={task}/>
            </Provider>
        )
        const taskTextField = container.firstChild.childNodes[3].lastChild
        fireEvent.dblClick(taskTextField)
        expect(screen.getByTestId('testInput')).toBeInTheDocument()

        fireEvent.change(screen.getByTestId('testInput'), {
            target: {value: 'test input value'}
        })
        fireEvent.blur(screen.getByTestId('testInput'))
        expect(screen.queryByTestId('testInput')).not.toBeInTheDocument()
    })


})



describe('check for render items on donetasks', () => {
    it('should check',  () => {
        const task = new Task('111', '222')
        task.isChecked = true
        const store = createStore(() => ({todo: {tasks: [task]}}))
        const {container} = renderWithRedux(<DoneTasks />, { store })
        expect(container.firstChild.firstChild.nextSibling.firstChild.className).toBe('task')
    });

})






describe('check for sort', () => {
    it ('check undone container for task sorting', () => {
        const { container } = render(
            <Provider store={store}>
                <Todos/>
            </Provider>
        )
        fireEvent.change(screen.getByTestId('dateInput'), {
            target: {value: '2021-10-21T16:00'}
        })
        fireEvent.change(screen.getByRole('textbox'), {
            target: {value: 'Task 1'}
        })
        fireEvent.click(screen.getByTestId('newTaskButton'))
        fireEvent.change(screen.getByTestId('dateInput'), {
            target: {value: '2021-10-21T17:00'}
        })
        fireEvent.change(screen.getByRole('textbox'), {
            target: {value: 'Task 2'}
        })
        fireEvent.click(screen.getByTestId('newTaskButton'))
        const undoneContainer = container.querySelector('.undone-tasks__container')

        expect(undoneContainer.firstChild.childNodes[3].lastChild.textContent).toBe('Task 1')
        const desc = screen.getByTestId('descSortButton')
        const asc = screen.getByTestId('ascSortButton')
        fireEvent.click(desc)
        expect(undoneContainer.firstChild.childNodes[3].lastChild.textContent).toBe('Task 2')
        fireEvent.click(asc)
        expect(undoneContainer.firstChild.childNodes[3].lastChild.textContent).toBe('Task 1')
    })
})



describe('check for replacing by keyboard event', () => {
    it ('check', () => {
        const { container } = render(
            <Provider store={store}>
                <Todos/>
            </Provider>
        )

        fireEvent.click(screen.getByTestId('newTaskButton'))
        const undoneContainer = container.querySelector('.undone-tasks__container')
        const taskCheckbox = undoneContainer.firstChild.childNodes[4].lastChild
        const doneContainer = container.querySelector('.done-tasks__container')
        const deletedContainer = container.querySelector('.deleted__tasks__container')
        fireEvent.click(taskCheckbox)
        expect(doneContainer.firstChild.className).toBe('task')
        const task = undoneContainer.firstChild
        task.focus()
        userEvent.keyboard('{del}')
        expect(deletedContainer.firstChild.className).toBe('task')

    })
})


describe('check for download files', () => {
    it('check for download logs.txt', () => {
        render(
            <Provider store={store}>
                <ToDoHeader/>
            </Provider>
        )
        const link = {
            click: jest.fn()
        };
        global.URL.createObjectURL = function () {}
        global.URL.revokeObjectURL = function () {}
        jest.spyOn(document, "createElement").mockImplementation(() => link);
        fireEvent.click(screen.getByTestId('downloadBtn'))
        expect(link.download).toEqual("logs.txt");
        expect(link.click).toHaveBeenCalledTimes(1)
    })

})

