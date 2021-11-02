import React, {ReactElement, useState} from "react";
import {ITask, Task} from "../task/script";
import './styles.sass'
import {addTask, deadliner} from "../../store/redux-toolkit/reducers/todoReducer";
import {useDispatch} from "react-redux";
import {logging} from "../../store/redux-toolkit/reducers/todoReducer";


function ToDoHeader () : ReactElement {
    const [text, setTaskText] = useState('')
    const [deadlineDate, setDeadlineDate] = useState('')
    const dispatch = useDispatch()

    const createNewTask = (): void => {
        const task: ITask = new (Task as any)(text || '...', deadlineDate)
        dispatch(addTask(task))
        dispatch(deadliner())
        dispatch(logging(`Create new task with id: ${task.id} at ${new Date().toLocaleString()}. Deadline date: ${new Date(deadlineDate).toLocaleString()}`))
        setTaskText('')
        setDeadlineDate('')
    }

    const changeInputTaskText = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTaskText(e.currentTarget.value)
    }

    const changeInputTaskDeadline = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setDeadlineDate(e.currentTarget.value)
    }

    const downloadFiles = (key: string, name: string): void => {
        const tasks: any = JSON.parse(localStorage.getItem(`ReduxStorage`)!)
        const a = document.createElement('a');
        a.download = `${name}.txt`;
        const downloadFile = JSON.stringify(tasks[key])
        const blob = new Blob([downloadFile], {type: 'text/plain'})
        a.href = URL.createObjectURL(blob);
        a.click()
        URL.revokeObjectURL(a.href);
    }


    const handleDownloadLogsButton = (): void => downloadFiles('logs', 'logs')
    const handleDownloadTasksListButton = (): void => downloadFiles('tasks', 'tasks')


    return (
        <>
            <div className="todo__head">
                <h1 className="list-header">TO DO LIST</h1>
            </div>
            <div className="application">
                <div className="link-container">
                    <button data-testid = "downloadBtn" className="button download-button" onClick={handleDownloadLogsButton}>
                        DOWNLOAD LOGS
                    </button>
                </div>
                <div className="new-task__container">
                    <label className="task-form__label">Срок выполнения задачи:</label>
                    <input type="datetime-local" data-testid='dateInput' className="new-task-date"
                           value={deadlineDate}
                           onChange = {changeInputTaskDeadline}
                    />
                    <label className="task-form__label">Введите содержание задачи:</label>
                    <textarea className="new-task-text"
                              value={text}
                              onChange={changeInputTaskText}
                    />
                    <button data-testid='newTaskButton' className="button new-task__button" onClick={createNewTask}> NEW TASK</button>
                </div>
                <div className="link-container">
                    <button className="button download-button" onClick={handleDownloadTasksListButton}>
                        DOWNLOAD TASKS
                    </button>
                </div>
            </div>

        </>
    )
}



export {ToDoHeader}