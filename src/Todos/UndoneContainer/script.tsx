import './styles.sass'
import React from "react";
import {TaskForm} from "../task/script";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {useSelector, useDispatch} from "react-redux";
import {sortOnAsc, sortOnDesc, markTaskOnDelete} from "../../store/redux-toolkit/todoReducer";
import { RootState} from "../../store/redux-toolkit/store";



const UndoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const { tasks }= useSelector((state:RootState) => state.todo);
    const dispatch = useDispatch()


    const markTaskToDelete = (id: number): void => {
        dispatch(markTaskOnDelete(id))
    }


    return (
        <div className="undone-tasks">
            <div className="undone-tasks__header">
                <div className="undone-tasks-text">НЕВЫПОЛНЕННЫЕ ЗАДАЧИ</div>
                <div className="sorting-buttons__container">
                    <button className="asc-button"><img data-testid="ascSortButton"
                        src="https://cdn-icons-png.flaticon.com/512/814/814031.png" className="button-image" onClick={() => dispatch(sortOnAsc())}/></button>
                    <button className="desc-button"><img data-testid="descSortButton"
                        src="https://cdn-icons-png.flaticon.com/512/814/814055.png" className="button-image" onClick={() => dispatch(sortOnDesc())} /></button>
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
                         ) : null
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