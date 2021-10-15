import {CreateTask} from "../task/script";
import './styles.sass'
import React from "react";

function DoneTasksRender (props: any) {
    const changeStatus = (id: number) => {
        props.changeStatus(id)
    }

    const markToDelete = (id: number) => {
        props.markToDelete(id)
    }

    const handlerDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
        props.handlerDragEnter(event)
    }

    const handlerDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        props.handlerDragOver(event)
    }

    const handlerDrop = (event: React.DragEvent<HTMLDivElement>) => {
        props.handlerDrop(event)
    }


    return (
        <div className="done-tasks">
            <div className="done-tasks__header">
                ВЫПОЛНЕННЫЕ ЗАДАЧИ
            </div>
            <div className="done-tasks__container"
            onDragEnter={handlerDragEnter}
            onDragOver={handlerDragOver}
            onDrop={handlerDrop}>
                {
                    props.doneList.map((item: any) =>
                        (item.checked === true && item.markToDelete === false)? (
                            <CreateTask key={item.id} item={item}
                                        changeStatus={changeStatus}
                                        markToDelete={markToDelete}

                                        />
                        ) : <></>
                    )
                }
            </div>
        </div>
    )
}


export {DoneTasksRender}
















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