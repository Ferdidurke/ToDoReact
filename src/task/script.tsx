import React from "react";
import './styles.sass'


function Task (this: any, id: number, taskText : string, taskDeadline : string, date: Date, checked: boolean, color: string) {
    this.id = Date.now();
    this.taskText = taskText || '...';
    this.taskDeadline = (taskDeadline);
    this.date = new Date();
    this.checked = false;
    this.color = '';
}


function CreateTask () {
        return <div className="task" tabIndex={0} draggable="true">
            <div className="closed-button__container">
                <button className="closed-button">X</button>
            </div>
            <div className="task-date">
                <span className="create-date">Дата создания задачи: </span>
            </div>
            <div className="task-deadline">
                <span className="deadline-date">Дата выполнения задачи: </span>
            </div>
            <div className="task-text__block">
                <p className="task-text" tabIndex={0}></p>
            </div>
            <div className="task-status">
                <span className="status-text">DONE:</span>
                <input type="checkbox" className="status-check"/>
            </div>
        </div>
    }

export {CreateTask, Task}













/*function dragEnabler () {
    const draggableTasks = document.querySelectorAll('.task')
    draggableTasks.forEach(dragItem => {
        dragItem.addEventListener('dragstart', function (event) {
            event.target.classList.add('task-dragged')
            event.dataTransfer.setData('id', event.target.id)
        })
        dragItem.addEventListener('dragend', function (event) {
            event.target.classList.remove('task-dragged')
        })
    })
}

dragEnabler()*/
