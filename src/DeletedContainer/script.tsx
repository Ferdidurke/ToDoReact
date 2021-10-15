import './styles.sass'
import React from "react";
import {CreateTask} from "../task/script";

const handleExtended = () => {
    const block: any = document.querySelector('.deleted__tasks__container')
    block.classList.toggle('extended')
}



function DeletedTasksRender (props: any) {

    const markToDelete = (id: number) => {
        props.markToDelete(id)
    }

    return (
       <>
       <div className="deleted__tasks__button-container">
       <button className="button deleted-tasks__button" onClick={handleExtended}>Open</button>
       </div>
        <div className="deleted__tasks__container">
            {
                props.deletedList.map((item: any) =>
                    item.markToDelete === true ? (
                    <CreateTask key={item.id} item={item} markToDelete={markToDelete} />
                    ) : <></>
                )
            }
        </div>
   </>)
}

export {DeletedTasksRender}







/*let deletedTaskList = !localStorage.deletedTaskList ? [] : JSON.parse(localStorage.getItem('deletedTaskList'))

function deletedTaskMaker() {
    let deletedTasks = document.querySelector('.deleted__tasks__container')
    deletedTasks.innerHTML = '';
    if (deletedTaskList.length > 0) {
        deletedTaskList.forEach(function (item) {
            deletedTasks.innerHTML += createTask(item);
        })
    }
}




export {deletedTaskMaker, deletedTaskList}*/