import React, {useState} from "react";
import {Task} from "../task/script";
import './styles.sass'

export let toDoTaskList: Array<object>;
if (!localStorage.toDoTaskList) {
    toDoTaskList  = [];
} else {
     toDoTaskList = JSON.parse(localStorage.getItem('toDoTaskList')!)
}

function ToDoHeaderRender () {
    const [Text, setTaskText] = useState('')
    const [DeadlineDate, setDeadlineDate] = useState('')

    const handleClick = () => {
        let task = new (Task as any)(Text, DeadlineDate)
        toDoTaskList.push(task)
        localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
        console.log(task)
        console.log(toDoTaskList)
    }

    const textChange = (e: any) => {
        setTaskText(e.currentTarget.value)

    }

    const deadlineChange = (e: any) => {
        setDeadlineDate(e.currentTarget.value)

    }


    return (
        <>
            <div className="todo__head">
                <h1 className="list-header">TO DO LIST</h1>
            </div>
            <div className="application">
                <div className="link-container">
                    <button className="button download-button">
                    </button>
                </div>
                <div className="new-task__container">
                    <label className="task-form__label">Срок выполнения задачи:</label>
                    <input type="datetime-local" className="new-task-date"
                           value={DeadlineDate}
                           onChange = {deadlineChange}
                    />
                    <label className="task-form__label">Введите содержание задачи:</label>
                    <textarea className="new-task-text"
                              value={Text}
                              onChange={textChange}
                    ></textarea>
                    <button className="button new-task__button" onClick={handleClick}> NEW TASK</button>
                </div>
                <div className="link-container">
                    <button className="button download-button" >
                        DOWNLOAD LOG
                    </button>
                </div>
            </div>

        </>
    )
}



export {ToDoHeaderRender}