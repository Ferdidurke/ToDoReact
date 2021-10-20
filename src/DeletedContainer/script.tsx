import './styles.sass'
import React from "react";
import {ITask, TaskForm} from "../task/script";
import {useSelector, useDispatch} from "react-redux";
import {deletingTask} from "../store/actions";

const handleExtendedDeletedBlock = () => {
    const block: any = document.querySelector('.deleted__tasks__container')
    block.classList.toggle('extended')
}



const DeletedTasks: React.FC = () => {
    const { tasks } = useSelector((state: any) => state);
    const dispatch = useDispatch()

    const markTaskToDelete = (id: number) => {
        const index: number = tasks.findIndex((item: ITask) => id === item.id)
        if (index !== -1 && tasks[index].isMarkToDelete) {
            const confirmation: boolean = window.confirm('Are you right?')
            if (confirmation) {
                const taskOnDelete: HTMLElement | null = document.getElementById(tasks[index].id.toString())
                taskOnDelete!.classList.toggle('deleted')
                dispatch(deletingTask(id))
            }
        }
    }

    return (
       <>
       <div className="deleted__tasks__button-container">
       <button className="button deleted-tasks__button" onClick={handleExtendedDeletedBlock}>Open</button>
       </div>
        <div className="deleted__tasks__container">
            {
                tasks && tasks.map((item: any) =>
                    item.isMarkToDelete === true ? (
                    <TaskForm key={item.id} item={item}
                              markTaskToDelete={markTaskToDelete}/>
                    ) : <></>
                )
            }
        </div>
   </>)
}

export {DeletedTasks}


