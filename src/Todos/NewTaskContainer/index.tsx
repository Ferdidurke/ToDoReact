import React, {ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {ITask, Task} from "../task/script";
import './styles.sass'
import {Button, TextField} from "@mui/material";
import {AddCircleOutline} from "@mui/icons-material";
import {RootState} from "../../store/redux-toolkit/store";
import {todoApi} from "../../services/TaskService";
import {logging} from "../Todos";


export function NewTaskForm () : ReactElement {
    const [text, setTaskText] = useState('')
    const { user } = useSelector((state: RootState) => state.auth)
    const [addNewTask] = todoApi.useAddNewTaskMutation()
    const [deadlineDate, setDeadlineDate] = useState('')
    const dispatch = useDispatch()

    const createNewTask = (): void => {
        const task: ITask = new (Task as any)(user.id, text || '...', deadlineDate)
        //dispatch(addTask(task))
        //dispatch(deadliner())
        addNewTask(task)
        logging(`Create new task with id: ${task._id} at ${new Date().toLocaleString()}. Deadline date: ${new Date(deadlineDate).toLocaleString()}`)
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

        <div className="new-task__container">
            <label className="task-form__label">Task Deadline:</label>
            <TextField variant="outlined" type="datetime-local" data-testid='dateInput' className="new-task-date"
                   value={deadlineDate}
                   onChange={changeInputTaskDeadline}
            />
            <br/>
            <TextField variant="outlined"
                       label="Enter task text"
                       multiline
                       rows={4}
                       className="new-task-text"
                       value={text}
                       onChange={changeInputTaskText}
            />
            <Button variant='contained' data-testid='newTaskButton' className="button new-task__button"
                    onClick={createNewTask}><AddCircleOutline/></Button>
        </div>
    )
}