import './styles.sass'
import React, {ReactElement} from "react";
import {TaskForm} from "../task/script";
import {AppProps} from "../App";
import {ITask} from "../task/script";


const UndoneTasks: React.FC<Partial<AppProps>> = (props) => {

    return (
        <div className="undone-tasks">
            <div className="undone-tasks__header">
                <div className="undone-tasks-text">НЕВЫПОЛНЕННЫЕ ЗАДАЧИ</div>
                <div className="sorting-buttons__container">
                    <button className="asc-button"><img
                        src="https://cdn-icons-png.flaticon.com/512/814/814031.png" className="button-image" onClick={props.sortTasksOnAsc}/></button>
                    <button className="desc-button"><img
                        src="https://cdn-icons-png.flaticon.com/512/814/814055.png" className="button-image" onClick={props.sortTasksOnDesc} /></button>
                </div>
            </div>
            <div className="undone-tasks__container"
                 onDragEnter={props.handlerDragEnter}
                 onDragOver={props.handlerDragOver}
                 onDrop={props.handlerDrop}>
                {
                    props.toDoTaskList!.map((item: ITask) =>
                        (!item.isChecked && !item.isMarkToDelete) ? (
                            <TaskForm key={item.id} item={item}
                                      changeTaskStatus={props.changeTaskStatus}
                                      markTaskToDelete={props.markTaskToDelete}
                                      changeTaskText={props.changeTaskText}

                                        />
                         ) : <></>
                    )
                }
            </div>
        </div>
    )
}

export {UndoneTasks}




















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