import {ITask} from "../task/script";
import {logging} from "./actions";
import {ADD_TASK, CHANGE_TEXT, CHECK_TASK, DELETE_TASK, LOGGING, MARK_TASK_TO_DELETE, SORTED} from "./types";


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
            console.log(index)
            if (index !== -1 && !deletedTasks[index].isMarkToDelete) {
                deletedTasks[index].isMarkToDelete = true
                deletedTasks[index].deletedDate = new Date().toLocaleString()
                deletedTasks.sort((a, b) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
                console.log(deletedTasks)
                //logging(`Task with id:${toDoTaskList[index].id} replace in deleted container at ${new Date().toLocaleString()}`)
            }
            return (
                {
                    ...state,
                    tasks: [...deletedTasks]
                })
        }

        case DELETE_TASK: {
            const deletedTasks: Array<ITask> = state.tasks
            const index: number = deletedTasks.findIndex((item: ITask) => item.id === action.id)
            deletedTasks.splice(index, 1)
                return (
                    {
                        ...state,
                        tasks: [...deletedTasks]
                    })
        }


        case CHECK_TASK: {
            const checkedTasks: Array<ITask> = state.tasks
            const index: number = checkedTasks.findIndex((item: {id: number} ) => item.id === action.id)
            if (index !== -1)
                if (!checkedTasks[index].isChecked) {
                    logging(`Task with id:${checkedTasks[index].id} moved to done at ${new Date().toLocaleString()}`)
                } else {
                    logging(`Task with id:${checkedTasks[index].id} moved to do at ${new Date().toLocaleString()}`)
                }
                checkedTasks[index].isChecked = !checkedTasks[index].isChecked
            return (
                {
                    ...state,
                    tasks: [...checkedTasks]
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


        default: return state;
    }
}