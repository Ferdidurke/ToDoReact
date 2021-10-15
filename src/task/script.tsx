import React, {useState} from "react";

import './styles.sass'


function Task (this: any, taskText : string, taskDeadline : string) {
    this.id = Date.now();
    this.taskText = taskText;
    this.taskDeadline = taskDeadline;
    this.date = dateFormat();
    this.checked = false;
    this.color = '';
    this.markToDelete = false;
    this.deletedDate = '';
}

function dateFormat(date:Date | string = new Date()): string {
    return date ? date.toLocaleString() : new Date().toLocaleString()
}


function CreateTask (props: any) {
    const [input, setInput] = useState(false)
    const [textValue, setTextValue] = useState(props.item.taskText)

    const changeStatus = (id: any) => {
        id = props.item.id
        props.changeStatus(id)
    }

    const markToDelete = (id: any) => {
        id = props.item.id
        props.markToDelete(id)
    }

    const changeText = (event: any) => {
        if (event.target.parentElement.nextElementSibling.lastChild.checked === false) setInput(true)
    }

    const changeInput = (e: any) => {
       setTextValue(e.target.value)
    }

    const doneChange = (e: any) => {
        const id = e.target.id
        const obj: object = {id: id, text: textValue}
        props.changeInput(obj)
        setInput(false)
    }


    const keyboardEvents = (event: any) => {
        if (event.keyCode === 69 && event.target.parentElement.className === 'undone-tasks__container') setInput(true)
        if (event.shiftKey && event.keyCode === 39 && event.target.parentElement.className === 'undone-tasks__container')  {
            const id = Number(event.target.id)
            props.changeStatus(id)
            }
        if (event.shiftKey && event.keyCode === 37 && event.target.parentElement.className === 'done-tasks__container')  {
            const id = Number(event.target.id)
            props.changeStatus(id)
            console.log('22')
        }
    }

    const handlerDragStart = (event: React.DragEvent<HTMLDivElement>) => {
        // @ts-ignore
        const { id } = event.target
        event.dataTransfer.setData('id', id)
    }

        return <div className="task"
                    id={props.item.id}
                    tabIndex={0}
                    style={{background : props.item.color}}
                    draggable="true"
                    onKeyDown={keyboardEvents}
                    onDragStart={handlerDragStart}
                    >
            <div className="closed-button__container">
                <button id={props.item.id} className="closed-button" onClick={markToDelete}>X</button>
            </div>
            <div className="task-date">
                <span className="create-date">Дата создания задачи: {props.item.date.toLocaleString()}</span>
            </div>
            <div className="task-deadline">
                <span className="deadline-date">Дата выполнения задачи: {dateFormat(props.item.taskDeadline)} </span>
            </div>
            <div className="task-text__block">
                {
                    input ? (<input autoFocus
                                        id={props.item.id}
                                        value={textValue}
                                        onChange={changeInput}
                                        onBlur={doneChange}
                            />):
                    (  <p className="task-text" tabIndex={0}
                          onDoubleClick={changeText}
                          onFocus={changeText}>{props.item.taskText}</p>)
                }
            </div>
            <div className="task-status">
                <span className="status-text">DONE:</span>
                <input type="checkbox" className="status-check" onChange={changeStatus} checked={props.item.checked}/>
            </div>
        </div>
    }

export {CreateTask, Task}













/*function dragEnabler () {
    const draggableTasks = document.querySelectorAll('.task')
    draggableTasks.forEach(dragItem => {
        dragItem.addEventListener('dragstart', function (event) {
            event.target.classList.add('task-dragged')
            event.dataTransfer.setData('id', event.target.id)
        })
        dragItem.addEventListener('dragend', function (event) {
            event.target.classList.remove('task-dragged')
        })
    })
}

dragEnabler()*/
