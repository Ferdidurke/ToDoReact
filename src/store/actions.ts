import {ADD_TASK, CHANGE_TEXT, CHECK_TASK, DELETE_TASK, LOGGING, MARK_TASK_TO_DELETE, SORTED} from "./types";
import {ITask} from "../task/script";
import {Action, Dispatch} from "redux";
import {PayloadAction} from "typesafe-actions";

export const addTask = (task: ITask) => ({
    type: ADD_TASK,
    task
})

export const changeStatus = (id: number | string) => ({
    type: CHECK_TASK,
    id
})

export const toDoTasksSort = () => ({
    type: SORTED
})

export const changeTaskTextField = (obj: any)=> ({
    type: CHANGE_TEXT,
    obj
})

export const markTaskOnDelete = (id: number | string) => ({
    type: MARK_TASK_TO_DELETE,
    id
})

export const deletingTask = (id: number | string) => (
    function (dispatch: Dispatch<Action>) {
        setTimeout (() => { dispatch ({ type: DELETE_TASK, id}) }, 300)
    }
)


export const logging = (text: string) => ({
    type: LOGGING,
    text
})