import {ITask} from "../../../Todos/task/script";
import {createSlice} from "@reduxjs/toolkit";
import {userApi} from "../../../services/UserService";
import {IToDoParams, todoApi} from "../../../services/TaskService";



export const initialState = {
    tasks: <Array<ITask>>[],
    logs: <Array<string>>[],
    reqParams: <IToDoParams> {
        sort: {
            deadlineDate: 'asc',
        },
        filter: {
            userId: null
        },
    },
    isLoading: false
}


export const todoReducer = createSlice({
    name: 'todoReducer',
    initialState,
    reducers: {

        changeStatus: (state, action) => {
            const index = action.payload
            state.tasks[index].isChecked = !state.tasks[index].isChecked
            state.tasks = [...state.tasks]
        },

        changeTaskText: (state, action) => {
            const index: number = state.tasks.findIndex((item: ITask) => item._id === action.payload.id)
            if (index !== -1) {
                    state.tasks[index].taskText = action.payload.taskText
            }
        },


        deadliner: (state, action) => {
            state.tasks[action.payload.index].deadlineColor = action.payload.deadlineColor

        },

        deleteTaskFromDeletedBlock: (state, action) => {
            const index: number = action.payload
            state.tasks.splice(index, 1)
        },

        markTaskOnDelete: (state, action) => {
            const index = action.payload
            state.tasks[index].isMarkToDelete = true
            state.tasks[index].deletedDate = new Date().toLocaleString()
            state.tasks = [...state.tasks]

        },


        setRequestParams: (state, action) => {
            state.reqParams.sort = action.payload
        },



    },
    extraReducers: (builder) => {
            builder.addMatcher(
                todoApi.endpoints.fetchTasks.matchPending,
            (state) => {
                    state.isLoading = true
                }
            )

            builder.addMatcher(
                todoApi.endpoints.fetchTasks.matchFulfilled, (state, { payload }) => {
                    state.tasks = payload
                    state.isLoading = false
                }
            )
            builder.addMatcher(
                userApi.endpoints.getUser.matchFulfilled, (state, { payload }) => {
                    state.reqParams.filter = {
                        userId: payload.id,
                    }
                }
            )
    },
})





// export const todoReducer = createSlice({
//     name: 'todoReducer',
//     initialState,
//     reducers: {
//         addTask: (state, action) => {
//             state.tasks.push(action.payload)
//         },
//

//
//         changeTaskTextField: (state, action) => {
//             const index: number = state.tasks.findIndex((item: {_id: any}) => item._id === Number(action.payload._id))
//             if (index !== -1) {
//                 state.tasks[index].taskText = action.payload.text
//             }
//         },
//
//         markTaskOnDelete: (state, action) => {
//             const index: number = state.tasks.findIndex((item: ITask) => item._id === action.payload)
//
//             if (index !== -1 && !state.tasks[index].isMarkToDelete) {
//                 state.tasks[index].isMarkToDelete = true
//                 state.tasks[index].deletedDate = new Date().toLocaleString()
//                 state.tasks.sort((a, b) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
//                 const log = `Task with id:${state.tasks[index]._id} replace in deleted container at ${new Date().toLocaleString()}`
//                 console.log(log)
//                 state.logs.push(log)
//             }
//         },
//
//         deletingTask: (state, action) => {
//             const index: number = state.tasks.findIndex((item: ITask) => item._id === action.payload)
//             const log = `Task with id:${state.tasks[index]._id} deleted at ${new Date().toLocaleString()}`
//             state.tasks.splice(index, 1)
//             console.log(log)
//             state.logs.push(log)
//         },
//
//         logging: (state, action) => {
//             console.log(action.payload)
//             state.logs.push(action.payload)
//         },
//
//
//
//         }
//     }
// })
//
//
export default todoReducer.reducer
export const {setRequestParams, changeTaskText, changeStatus, markTaskOnDelete, deleteTaskFromDeletedBlock, deadliner} = todoReducer.actions

