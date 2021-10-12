import React from "react";
import {doneTask} from "../source/script1";

import './styles.sass'

const createTask = (task) => {
    return `<div class="task" id="${task.id}" title = "${task.taskText}" style="background: ${task.color}" tabindex="0" draggable="true" onclick="focus()">
            <div class="closed-button__container">
                <button class="closed-button" onclick="deleter(${task.id})">X</button>
            </div>
            <div class="task-date">
                <span class="create-date">Дата создания задачи: ${task.date} </span>
            </div>
            <div class="task-deadline">
                <span class="deadline-date">Дата выполнения задачи: ${task.taskDeadline}</span>
            </div>
            <div class="task-text__block">
                <p class="task-text" tabindex="0">${task.taskText}</p>
            </div>
            <div class="task-status">
                <span class="status-text">DONE:</span>
                <input onclick='doneTask(${task.id})' type="checkbox" class="status-check" ${task.checked ? 'checked' : ''}>
            </div>
        </div>`
}



function dragEnabler () {
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

dragEnabler()

export {createTask, dragEnabler}