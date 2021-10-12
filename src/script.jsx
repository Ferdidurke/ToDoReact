import React from 'react'
import {render} from "react-dom"
require('./index.html')
import '../toDo/styles.sass'
import './styles.css'

const CreateTask = () => (
    <div className="todo__container">
        <div className="todo__head">
            <h1 className="list-header">TO DO LIST</h1>
        </div>
        <div className="application">
            <div className="link-container">
                <button className="button download-button" onClick="downloadTasks()">
                    DOWNLOAD JSON
                </button>
            </div>
            <div className="new-task__container">
                <label className="task-form__label">Срок выполнения задачи:</label>
                <input type="datetime-local" className="new-task-date" value="" required />
                    <label className="task-form__label">Введите содержание задачи:</label>
                    <textarea className="new-task-text" required></textarea>
                    <button className="button new-task__button"> NEW TASK</button>
            </div>
            <div className="link-container">
                <button className="button download-button" onClick="downloadLogs()">
                    DOWNLOAD LOG
                </button>
            </div>
        </div>
        <div className="todo__tasks">
            <div className="undone-tasks">
                <div className="undone-tasks__header">
                    <div className="undone-tasks-text">НЕВЫПОЛНЕННЫЕ ЗАДАЧИ</div>
                    <div className="sorting-buttons__container">
                        <button className="asc-button" onClick="ascSort()"><img
                            src="https://cdn-icons-png.flaticon.com/512/814/814031.png" className="button-image" />
                        </button>
                        <button className="desc-button" onClick="descSort()"><img
                            src="https://cdn-icons-png.flaticon.com/512/814/814055.png" className="button-image" />
                        </button>
                    </div>
                </div>
                <div className="undone-tasks__container">
                </div>
            </div>
            <div className="done-tasks">
                <div className="done-tasks__header">
                    ВЫПОЛНЕННЫЕ ЗАДАЧИ
                </div>
                <div className="done-tasks__container">
                    4444
                </div>
            </div>
        </div>
        <div className="deleted__tasks__button-container">
            <button className="button deleted-tasks__button" onClick="openBlock()">Open</button>
        </div>
        <div className="deleted__tasks__container">
        </div>
    </div>
)


render(<CreateTask />, document.body)