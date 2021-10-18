import './styles.sass'
import React, {ReactElement} from "react";
import {TaskForm} from "../task/script";
import {AppProps} from "../App";

const handleExtendedDeletedBlock = () => {
    const block: any = document.querySelector('.deleted__tasks__container')
    block.classList.toggle('extended')
}


const DeletedTasks: React.FC<Partial<AppProps>> = (props) => {

    return (
       <>
       <div className="deleted__tasks__button-container">
       <button className="button deleted-tasks__button" onClick={handleExtendedDeletedBlock}>Open</button>
       </div>
        <div className="deleted__tasks__container">
            {
                props.toDoTaskList!.map((item: any) =>
                    item.isMarkToDelete === true ? (
                    <TaskForm key={item.id} item={item} markTaskToDelete={props.markTaskToDelete} />
                    ) : <></>
                )
            }
        </div>
   </>)
}

export {DeletedTasks}


