import './styles.sass'
import React from "react";
import {ITask, TaskForm} from "../task/script";
import {useSelector, useDispatch} from "react-redux";
import {deletingTask} from "../../store/redux-toolkit/reducers/todoReducer";
import {RootState} from "../../store/redux-toolkit/store";
import {Button} from "@mui/material";

const handleExtendedDeletedBlock = () => {
    const block: HTMLDivElement | null = document.querySelector('.deleted__tasks__container')
    block!.classList.toggle('extended')
}


const DeletedTasks: React.FC = () => {
    const { tasks }  = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch()
    const markTaskToDelete = (id: number) => {
        const index: number = tasks.findIndex((item: ITask) => id === item.id)
        if (index !== -1 && tasks[index].isMarkToDelete) {
            const confirmation: boolean = window.confirm('Are you right?')
            if (confirmation) {
                const taskOnDelete: HTMLElement | null = document.getElementById(tasks[index].id.toString())
                taskOnDelete!.classList.toggle('deleted')
                setTimeout(() => {dispatch(deletingTask(id))}, 300)
            }
        }
    }

    return (
       <>
       <div className="deleted__tasks__button-container">
       <Button variant='contained' data-testid ='extendedBtn' className="button deleted-tasks__button" onClick={handleExtendedDeletedBlock}>Open</Button>
       </div>
        <div className="deleted__tasks__container">
            {
                tasks && tasks.map((item: ITask) =>
                    item.isMarkToDelete ? (
                    <TaskForm key={item.id} item={item}
                              markTaskToDelete={markTaskToDelete}/>
                    ) : null
                )
            }
        </div>
   </>)
}

export {DeletedTasks}


