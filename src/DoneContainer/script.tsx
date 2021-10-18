import {TaskForm} from "../task/script";
import './styles.sass'
import React, {ReactElement} from "react";
import {AppProps} from "../App";
import {ITask} from "../task/script";

const DoneTasks: React.FC<Partial<AppProps>> = (props) => {

    return (
        <div className="done-tasks">
            <div className="done-tasks__header">
                ВЫПОЛНЕННЫЕ ЗАДАЧИ
            </div>
            <div className="done-tasks__container"
            onDragEnter={props.handlerDragEnter}
            onDragOver={props.handlerDragOver}
            onDrop={props.handlerDrop}>
                {
                    props.toDoTaskList!.map((item: ITask) =>
                        (item.isChecked && !item.isMarkToDelete)? (
                            <TaskForm key={item.id} item={item}
                                      changeTaskStatus={props.changeTaskStatus}
                                      markTaskToDelete={props.markTaskToDelete}
                                        />
                        ) : <></>
                    )
                }
            </div>
        </div>
    )
}


export {DoneTasks}
















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