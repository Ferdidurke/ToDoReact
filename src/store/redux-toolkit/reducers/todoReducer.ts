import {ITask} from "../../../Todos/task/script";
import {createSlice} from "@reduxjs/toolkit";


export const initialState = {
    tasks: <Array<ITask>>[],
    logs: <Array<string>>[],
}

export const todoReducer = createSlice({
    name: 'todoReducer',
    initialState,
    reducers: {
        // addTask: (state, action) => {
        //     state.tasks.push(action.payload)
        // },
        //
        // changeStatus: (state, action) => {
        //     const index: number = state.tasks.findIndex((item: { _id: any } ) => item._id === action.payload)
        //     let log = ''
        //     if (index !== -1)
        //         if (!state.tasks[index].isChecked) {
        //             log = `Task with id:${state.tasks[index]._id} moved to done at ${new Date().toLocaleString()}`
        //         } else {
        //             log = `Task with id:${state.tasks[index]._id} moved to do at ${new Date().toLocaleString()}`
        //         }
        //     state.tasks[index].isChecked = !state.tasks[index].isChecked
        //     state.tasks = [...state.tasks]
        //     console.log(log)
        // },

        // sortOnAsc: (state) => {
        //     state.tasks.sort((a: { deadlineDate: string }, b: { deadlineDate: string }) => Date.parse((a.deadlineDate)) - Date.parse(b.deadlineDate))
        //     state.tasks = [...state.tasks]
        // },
        //
        // sortOnDesc: (state) => {
        //     state.tasks.sort((a: { deadlineDate: string }, b: { deadlineDate: string }) => Date.parse(b.deadlineDate) - Date.parse(a.deadlineDate))
        //     state.tasks = [...state.tasks]
        // },
        //
        // changeTaskTextField: (state, action) => {
        //     const index: number = state.tasks.findIndex((item: {_id: any}) => item._id === Number(action.payload._id))
        //     if (index !== -1) {
        //         state.tasks[index].taskText = action.payload.text
        //     }
        // },
        //
        // markTaskOnDelete: (state, action) => {
        //     const index: number = state.tasks.findIndex((item: ITask) => item._id === action.payload)
        //
        //     if (index !== -1 && !state.tasks[index].isMarkToDelete) {
        //         state.tasks[index].isMarkToDelete = true
        //         state.tasks[index].deletedDate = new Date().toLocaleString()
        //         state.tasks.sort((a, b) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
        //         const log = `Task with id:${state.tasks[index]._id} replace in deleted container at ${new Date().toLocaleString()}`
        //         console.log(log)
        //         state.logs.push(log)
        //     }
        // },
        //
        // deletingTask: (state, action) => {
        //     const index: number = state.tasks.findIndex((item: ITask) => item._id === action.payload)
        //     const log = `Task with id:${state.tasks[index]._id} deleted at ${new Date().toLocaleString()}`
        //     state.tasks.splice(index, 1)
        //     console.log(log)
        //     state.logs.push(log)
        // },
        //
        // logging: (state, action) => {
        //     console.log(action.payload)
        //     state.logs.push(action.payload)
        // },
        //
        // deadliner: (state) => {
        //     state.tasks.forEach(function (item) {
        //         const deadlineTime: number = Date.parse(item.deadlineDate)
        //         const currentTime: number = Date.now()
        //         if (item.isChecked) {
        //             item.deadlineColor = ''
        //         } else {
        //             if (deadlineTime - currentTime < 3600000 && deadlineTime - currentTime > 0) {
        //             item.deadlineColor = 'yellow'
        //         }
        //             if (deadlineTime - currentTime < 0) {
        //                 item.deadlineColor = 'red'
        //             }
        //         }
        //     })

    //     }
    }
})


export default todoReducer.reducer
// export const {addTask, logging, markTaskOnDelete, changeTaskTextField, sortOnAsc, sortOnDesc, changeStatus, deletingTask, deadliner} = todoReducer.actions

