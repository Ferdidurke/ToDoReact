import './styles.sass'
import React from "react";
import {CreateTask} from "../task/script";
import {Task} from "../task/script";






function UndoneTasksRender (props: any) {



    const changeStatus = (id: number) => {
        props.changeStatus(id)
    }

    const markToDelete = (id: number) => {
        props.markToDelete(id)
    }

    const ascSort = () => {
        props.ascSort()
    }

    const descSort = () => {
        props.descSort()
    }

    const changeInput = (obj: any) => {
        props.changeInput(obj)
    }

    const handlerDragEnter = (event: any) => {
        props.handlerDragEnter(event)
    }

    const handlerDragOver = (event: any) => {
        props.handlerDragOver(event)
    }

    const handlerDrop = (event:any) => {
        props.handlerDrop(event)
    }


    return (
        <div className="undone-tasks">
            <div className="undone-tasks__header">
                <div className="undone-tasks-text">НЕВЫПОЛНЕННЫЕ ЗАДАЧИ</div>
                <div className="sorting-buttons__container">
                    <button className="asc-button"><img
                        src="https://cdn-icons-png.flaticon.com/512/814/814031.png" className="button-image" onClick={ascSort}/></button>
                    <button className="desc-button"><img
                        src="https://cdn-icons-png.flaticon.com/512/814/814055.png" className="button-image" onClick={descSort} /></button>
                </div>
            </div>
            <div className="undone-tasks__container"
                 onDragEnter={handlerDragEnter}
                 onDragOver={handlerDragOver}
                 onDrop={handlerDrop}>
                {
                    props.toDoList.map((item: any) =>
                        (item.checked === false && item.markToDelete === false) ? (
                            <CreateTask key={item.id} item={item}
                                        changeStatus={changeStatus}
                                        markToDelete={markToDelete}
                                        changeInput={changeInput}

                                        />
                         ) : <></>
                    )
                }
            </div>
        </div>
    )
}

export {UndoneTasksRender}




















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