import {CreateTask} from "../task/script";
import './styles.sass'
import React from "react";

function DoneTasksRender () {
    return (
        <div className="done-tasks">
            <div className="done-tasks__header">
                ВЫПОЛНЕННЫЕ ЗАДАЧИ
            </div>
            <div className="done-tasks__container">
                4444
            </div>
        </div>
    )
}


export {DoneTasksRender}
















/*let doneTaskList = !localStorage.doneTaskList ? [] : JSON.parse(localStorage.getItem('doneTaskList'))

function doneTaskMaker() {
    let DoneTasks = document.querySelector('.done-tasks__container')
    DoneTasks.innerHTML = '';
    if (doneTaskList.length > 0) {
        doneTaskList.forEach(function (item) {
            DoneTasks.innerHTML += createTask(item);
        })
    }
}




export {doneTaskMaker, doneTaskList}*/