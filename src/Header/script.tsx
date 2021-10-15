import React, {useState} from "react";
import {Task} from "../task/script";
import './styles.sass'



function ToDoHeaderRender (props: any) {
    const [text, setTaskText] = useState('')
    const [deadlineDate, setDeadlineDate] = useState('')

    const CreateNewTask = () => {
        const task: any = new (Task as any)(text || '...', new Date(deadlineDate))
        props.newTask(task)
        props.logging(`Create new task with id: ${task.id} at ${new Date().toLocaleString()}. Deadline date: ${new Date(deadlineDate).toLocaleString()}`)
        setTaskText('')
        setDeadlineDate('')
    }

    const textChange = (e: any) => {
        setTaskText(e.currentTarget.value)

    }

    const deadlineChange = (e: any) => {
        setDeadlineDate(e.currentTarget.value)
        console.log(deadlineDate)
    }

    const download = (key: string, name: string) => {
        const tasks = JSON.stringify(localStorage.getItem(`${key}`)!)
        let a = document.createElement('a');
        a.download = `${name}.txt`;
        let blob = new Blob([tasks], {type: 'text/plain'})
        a.href = URL.createObjectURL(blob);
        a.click()
        URL.revokeObjectURL(a.href);
    }

    const handleLogs = () => download('log', 'logs')
    const handleTasks = () => download('toDoTaskList', 'tasks')


    return (
        <>
            <div className="todo__head">
                <h1 className="list-header">TO DO LIST</h1>
            </div>
            <div className="application">
                <div className="link-container">
                    <button className="button download-button" onClick={handleLogs}>
                        DOWNLOAD LOGS
                    </button>
                </div>
                <div className="new-task__container">
                    <label className="task-form__label">Срок выполнения задачи:</label>
                    <input type="datetime-local" className="new-task-date"
                           value={deadlineDate}
                           onChange = {deadlineChange}
                    />
                    <label className="task-form__label">Введите содержание задачи:</label>
                    <textarea className="new-task-text"
                              value={text}
                              onChange={textChange}
                    />
                    <button className="button new-task__button" onClick={CreateNewTask}> NEW TASK</button>
                </div>
                <div className="link-container">
                    <button className="button download-button" onClick={handleTasks}>
                        DOWNLOAD TASKS
                    </button>
                </div>
            </div>

        </>
    )
}



export {ToDoHeaderRender}