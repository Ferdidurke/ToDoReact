import React, {ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ITask, Task} from "../task/script";
import './styles.sass'
import {Button, CircularProgress, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";
import {RootState} from "../../store/redux-toolkit/store";
import {todoApi} from "../../services/TaskService";
import {logApi} from "../../services/LogService";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {logout} from "../../store/redux-toolkit/reducers/authReducer";




export function NewTaskForm () : ReactElement {
    const [text, setTaskText] = useState('')
    const { user } = useSelector((state: RootState) => state.auth)
    const [addNewTask, { isLoading, error }] = todoApi.useAddNewTaskMutation()
    const [deadlineDate, setDeadlineDate] = useState('')
    const [sendLog] =  logApi.useAddLogEventMutation()
    const dispatch = useDispatch()

    if (error && (error as FetchBaseQueryError).status === 401) {
        dispatch(logout())
    }

    const createNewTask = (e: React.FormEvent): void => {
        e.preventDefault()
        const task: ITask = new (Task as any)(user.id, text || '...', deadlineDate)
        addNewTask(task)
        const log = (`Create new task with at ${ new Date().toLocaleString() }. Deadline date: ${ new Date(deadlineDate).toLocaleString() }`)
        console.log(log)
        sendLog({ body: log })
        setTaskText('')
        setDeadlineDate('')
    }

    const changeInputTaskText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTaskText(e.currentTarget.value)
    }

    const changeInputTaskDeadline = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDeadlineDate(e.currentTarget.value)
    }
    return (

        <form className="new-task__container" onSubmit={ createNewTask }>
            {

                isLoading ? (<div style={{
                    display: 'flex',
                    margin: '0 auto',
                    justifyContent: 'center'
                }}>
                    <CircularProgress/>
                </div>
                ) : (
                    <>
                    <label className="task-form__label">Task Deadline:</label>
                    <TextField variant="outlined"
                               type="datetime-local"
                               data-testid="dateInput"
                               required={true}
                               value={deadlineDate}
                               onChange={changeInputTaskDeadline}
                    />
                    <br/>
                    <TextField variant="outlined"
                                label="Enter task text"
                                multiline
                                required={true}
                                rows={4}
                                value={text}
                                onChange={changeInputTaskText}
                    />
                    <Button variant='contained'
                            data-testid='newTaskButton'
                            type='submit'>
                                                    <AddCircleOutline/>
                    </Button>
                    </>
                )
            }
        </form>
    )
}