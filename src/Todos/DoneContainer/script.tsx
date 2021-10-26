import {TaskForm} from "../task/script";
import './styles.sass'
import React from "react";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {markTaskOnDelete} from "../../store/redux-toolkit/todoReducer";

const DoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const { tasks } = useSelector((state:RootState) => state.todo);
    const dispatch = useDispatch()
    const markTaskToDelete = (id: number): void => {
        dispatch(markTaskOnDelete(id))
    }

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
                    tasks && tasks.map((item: ITask) =>
                        (item.isChecked && !item.isMarkToDelete)? (
                            <TaskForm key={item.id} item={item}
                                      markTaskToDelete={markTaskToDelete}/>
                        ) : null
                    )
                }
            </div>
        </div>
    )
}


export {DoneTasks}














