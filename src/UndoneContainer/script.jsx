import './styles.sass'
import React from "react";
import {CreateTask} from "../task/script";
import {toDoTaskList} from "../Header/script";


const handlerDescSort = () => {
    toDoTaskList.sort((a, b) => Date.parse(b.taskDeadline) - Date.parse(a.taskDeadline))
    //storageRefresh();
    console.log(toDoTaskList)
}

const handlerAscSort = () => {
    toDoTaskList.sort((a, b) => Date.parse(a.taskDeadline) - Date.parse(b.taskDeadline))
    //storageRefresh();
    console.log(toDoTaskList)
}


function UndoneTasksRender () {
    return (
        <div className="undone-tasks">
            <div className="undone-tasks__header">
                <div className="undone-tasks-text">НЕВЫПОЛНЕННЫЕ ЗАДАЧИ</div>
                <div className="sorting-buttons__container">
                    <button className="asc-button"><img
                        src="https://cdn-icons-png.flaticon.com/512/814/814031.png" className="button-image" onClick={handlerAscSort}/></button>
                    <button className="desc-button"><img
                        src="https://cdn-icons-png.flaticon.com/512/814/814055.png" className="button-image" onClick={handlerDescSort}/></button>
                </div>
            </div>
            <div className="undone-tasks__container">
                <CreateTask />
                <CreateTask />
                <CreateTask />
            </div>
        </div>
    )
}

export {UndoneTasksRender}




















/*import {createTask, dragEnabler} from "../task/script";


let toDoTaskList = !localStorage.toDoTaskList ? [] : JSON.parse(localStorage.getItem('toDoTaskList'))

function taskMaker() {
    let toDoTasks = document.querySelector('.undone-tasks__container')
    toDoTasks.innerHTML = '';
    if (toDoTaskList.length > 0) {
        toDoTaskList.forEach(function (item) {
            toDoTasks.innerHTML += createTask(item);
        })
    }
    dragEnabler()
}


export {taskMaker, toDoTaskList}*/