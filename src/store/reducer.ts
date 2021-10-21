import {ITask} from "../task/script";

import {ADD_TASK, CHANGE_TEXT, CHECK_TASK, DELETE_TASK, LOGGING, MARK_TASK_TO_DELETE, SORTED, DEADLINER} from "./types";



export const initialState = {
    tasks: <Array<ITask>>[],
    logs: <Array<string>>[]
}


export function reducer(state = initialState, action: any) {

    switch(action.type) {
        case ADD_TASK: {
            return (
                {
                    ...state,
                    tasks: [...state.tasks, action.task]
                })
        }
        case SORTED: {
            return (
                {
                    ...state,
                    tasks: [...state.tasks]
                })
        }

        case MARK_TASK_TO_DELETE: {
            const deletedTasks: Array<ITask> = state.tasks
            const index: number = deletedTasks.findIndex((item: ITask) => item.id === action.id)
            let log = ''
            if (index !== -1 && !deletedTasks[index].isMarkToDelete) {
                deletedTasks[index].isMarkToDelete = true
                deletedTasks[index].deletedDate = new Date().toLocaleString()
                deletedTasks.sort((a, b) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
                log = `Task with id:${deletedTasks[index].id} replace in deleted container at ${new Date().toLocaleString()}`
                console.log(log)
            }
            return (
                {
                    ...state,
                    tasks: [...deletedTasks],
                    logs: [...state.logs, log]
                })
        }

        case DELETE_TASK: {
            const deletedTasks: Array<ITask> = state.tasks
            const index: number = deletedTasks.findIndex((item: ITask) => item.id === action.id)
            let log = ''
            log = `Task with id:${deletedTasks[index].id} deleted at ${new Date().toLocaleString()}`
            deletedTasks.splice(index, 1)
            console.log(log)
                return (
                    {
                        ...state,
                        tasks: [...deletedTasks],
                        logs: [...state.logs, log]
                    })
        }


        case CHECK_TASK: {
            const checkedTasks: Array<ITask> = state.tasks
            const index: number = checkedTasks.findIndex((item: {id: number} ) => item.id === action.id)
            let log = ''
            if (index !== -1)
                if (!checkedTasks[index].isChecked) {
                    log = `Task with id:${checkedTasks[index].id} moved to done at ${new Date().toLocaleString()}`
                } else {
                    log = `Task with id:${checkedTasks[index].id} moved to do at ${new Date().toLocaleString()}`
                }
                checkedTasks[index].isChecked = !checkedTasks[index].isChecked
            console.log(log)
            return (
                {
                    ...state,
                    tasks: [...checkedTasks],
                    logs: [...state.logs, log]
                })
        }

        case CHANGE_TEXT: {
                const changingTasks: Array<ITask> = state.tasks
                const index: number = changingTasks.findIndex((item: {id: number}) => item.id === Number(action.obj.id))
                if (index !== -1) {
                    changingTasks[index].taskText = action.obj.text
                }
            return (
                {
                    ...state,
                    tasks: [...changingTasks]
                })

        }

        case LOGGING: {
            console.log(action.text)
            return ({
                    ...state,
                    logs: [...state.logs, action.text]
                }
            )
        }

        case DEADLINER: {
            const deadlineTasks: Array<ITask> = state.tasks
            deadlineTasks.forEach(function (item) {
                const deadlineTime: number = Date.parse(item.taskDeadline)
                const currentTime: number = Date.now()
                if (item.isChecked) {
                    item.color = ''
                } else {
                    if (deadlineTime - currentTime < 3600000 && deadlineTime - currentTime > 0) {
                    item.color = 'yellow'
                }
                    if (deadlineTime - currentTime < 0) {
                        item.color = 'red'
                    }
                }

            })

            return (
                {
                    ...state,
                    tasks: [...deadlineTasks]
                })
        }



        default: return state;
    }
}