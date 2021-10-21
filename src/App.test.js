import React from "react";
import {render, screen, fireEvent, queryByText, waitFor} from "@testing-library/react";
import '@testing-library/jest-dom'
import App from "./App";
import {store} from "./store/store";
import {Provider} from "react-redux";
import {ToDoHeader} from "./Header/script";
import {UndoneTasks} from "./UndoneContainer/script";
import {DoneTasks} from "./DoneContainer/script";
import {DeletedTasks} from "./DeletedContainer/script";

import {createStore} from "redux";
import {reducer} from "./store/reducer";
import {Task, TaskForm} from "./task/script";


const renderWithRedux = (
    component,
        {initialState, store = createStore(reducer, initialState)} = {}
) => {
        return {
            ...render(<Provider store={store}>{component}</Provider>),
            store
        }
}

describe('Redux testing', () => {
    it('check initial state', () => {
        const { queryByText } = renderWithRedux(<UndoneTasks/>)
        expect(queryByText("Дата выполнения задачи")).toBeNull
    })


})


describe('render header', () => {
    it('render main', () => {
        render(
            <Provider store={store}>
                <App/>
            </Provider>
        )
        expect(screen.getByText(/TO DO LIST/i)).toBeInTheDocument();

    })

    it('render header', () => {
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

describe('render undoneTasksContainer', () => {
    it('render undoneTasksContainer', () => {
        render(
            <Provider store={store}>
                <UndoneTasks/>
            </Provider>
        )
        expect(screen.queryByText(/Невыполненные задачи/i)).toBeInTheDocument();
    })

    it ('delete tasks', () => {
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

describe('render doneTasksContainer', () => {
        it('render doneTasksContainer', () => {
            render(
                <Provider store={store}>
                    <DoneTasks/>
                </Provider>
            )
            expect(screen.queryByText(/Выполненные задачи/i)).toBeInTheDocument();
        })

})

describe('render deletedTasksContainer', () => {

    it ('render deletedTasksContainer',  () => {
            render(
                <Provider store={store}>
                     <DeletedTasks/>
                </Provider>
            )
            expect(screen.getByTestId('extendedBtn')).toBeInTheDocument();
    })

    it ('render extended deleteTasksContainer',  () => {
            const { container } = render(
                <Provider store={store}>
                    <DeletedTasks/>
                </Provider>
            )
            fireEvent.click(screen.getByTestId('extendedBtn'))
           expect((container.firstChild.nextSibling.className === 'deleted__tasks__container extended')).toBe(true)
    })
    it ('check for delete task', async () => {
        const { container } = render(
            <Provider store={store}>
                <DeletedTasks />
            </Provider>
        )
        window.confirm = jest.fn(() => true)
        fireEvent.click(screen.getByTestId('deletedButton'))
        expect(window.confirm).toBeCalledWith('Are you right?')
        //console.log(container.firstChild.nextSibling.firstChild.className)
        await waitFor (() => expect(container.firstChild.nextSibling.firstChild).toBe(null))
    })

})


describe('renders task', () => {
    it ('renders tasks',  () => {
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

    it ('check task for input',  () => {
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

