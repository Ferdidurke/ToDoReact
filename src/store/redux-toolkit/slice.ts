import {ITask} from "../../task/script";
import {createSlice} from "@reduxjs/toolkit";



export const toolkitSlice = createSlice({
    name: 'toolkit',
    initialState: {
        tasks: <Array<ITask>>[],
        logs: <Array<string>>[]
    },
    reducers: {
        addTask: (state, action) => {
            state.tasks.push(action.payload)
        },

        changeStatus: (state, action) => {
            const index: number = state.tasks.findIndex((item: {id: number} ) => item.id === action.payload)
            let log = ''
            if (index !== -1)
                if (!state.tasks[index].isChecked) {
                    log = `Task with id:${state.tasks[index].id} moved to done at ${new Date().toLocaleString()}`
                } else {
                    log = `Task with id:${state.tasks[index].id} moved to do at ${new Date().toLocaleString()}`
                }
            state.tasks[index].isChecked = !state.tasks[index].isChecked
            state.tasks = [...state.tasks]
            console.log(log)


        },

        sortOnAsc: (state) => {
            state.tasks.sort((a: { taskDeadline: string }, b: { taskDeadline: string }) => Date.parse((a.taskDeadline)) - Date.parse(b.taskDeadline))
            state.tasks = [...state.tasks]
        },

        sortOnDesc: (state) => {
            state.tasks.sort((a: { taskDeadline: string }, b: { taskDeadline: string }) => Date.parse(b.taskDeadline) - Date.parse(a.taskDeadline))
            state.tasks = [...state.tasks]

        },

        changeTaskTextField: (state, action) => {
            const index: number = state.tasks.findIndex((item: {id: number}) => item.id === Number(action.payload.id))
            if (index !== -1) {
                state.tasks[index].taskText = action.payload.text
            }

        },

        markTaskOnDelete: (state, action) => {
            const index: number = state.tasks.findIndex((item: ITask) => item.id === action.payload)
            let log = ''
            if (index !== -1 && !state.tasks[index].isMarkToDelete) {
                state.tasks[index].isMarkToDelete = true
                state.tasks[index].deletedDate = new Date().toLocaleString()
                state.tasks.sort((a, b) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
                log = `Task with id:${state.tasks[index].id} replace in deleted container at ${new Date().toLocaleString()}`
                console.log(log)
                state.logs.push(log)
            }

        },

        deletingTask: (state, action) => {
            const index: number = state.tasks.findIndex((item: ITask) => item.id === action.payload)
            let log = ''
            log = `Task with id:${state.tasks[index].id} deleted at ${new Date().toLocaleString()}`
            state.tasks.splice(index, 1)
            console.log(log)
            state.logs.push(log)

        },

        logging: (state, action) => {
            console.log(action.payload)
            state.logs.push(action.payload)
        },

        deadliner: (state) => {
            state.tasks
        }
    }
})


export default toolkitSlice.reducer
export const {addTask, logging, markTaskOnDelete, changeTaskTextField, sortOnAsc, sortOnDesc, changeStatus, deletingTask, deadliner} = toolkitSlice.actions

