import './styles.sass'
import React from "react";
import {TaskForm} from "../task/script";
import {AppProps} from "../App";
import {ITask} from "../task/script";
import {useSelector, useDispatch} from "react-redux";
import {markTaskOnDelete, toDoTasksSort} from "../store/actions";
import { RootState } from '../store/store';


const UndoneTasks: React.FC<Partial<AppProps>> = (props) => {
    const { tasks } = useSelector((state:RootState) => state);
    const dispatch = useDispatch()

    const markTaskToDelete = (id: number): void => {
        dispatch(markTaskOnDelete(id))
    }

    const sortTasksOnAsc = (): void => {
            tasks.sort((a: { taskDeadline: string }, b: { taskDeadline: string }) => Date.parse((a.taskDeadline)) - Date.parse(b.taskDeadline))
            dispatch(toDoTasksSort())

    }

    const sortTasksOnDesc = (): void => {
        if (tasks.length > 0) {
            tasks.sort((a: { taskDeadline: string }, b: { taskDeadline: string }) => Date.parse(b.taskDeadline) - Date.parse(a.taskDeadline))
            dispatch(toDoTasksSort())
        }

    }
    return (
        <div className="undone-tasks">
            <div className="undone-tasks__header">
                <div className="undone-tasks-text">НЕВЫПОЛНЕННЫЕ ЗАДАЧИ</div>
                <div className="sorting-buttons__container">
                    <button className="asc-button"><img
                        src="https://cdn-icons-png.flaticon.com/512/814/814031.png" className="button-image" onClick={sortTasksOnAsc}/></button>
                    <button className="desc-button"><img
                        src="https://cdn-icons-png.flaticon.com/512/814/814055.png" className="button-image" onClick={sortTasksOnDesc} /></button>
                </div>
            </div>
            <div className="undone-tasks__container"
                 onDragEnter={props.handlerDragEnter}
                 onDragOver={props.handlerDragOver}
                 onDrop={props.handlerDrop}>
                {
                    tasks && tasks.map((item: ITask) =>
                        (!item.isChecked && !item.isMarkToDelete) ? (
                            <TaskForm key={item.id} item={item}
                                      markTaskToDelete={markTaskToDelete}/>
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