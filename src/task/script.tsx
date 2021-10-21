import React, {ReactElement, useState} from "react";

import './styles.sass'
import {useDispatch} from "react-redux";
import {changeStatus, changeTaskTextField} from "../store/actions";

export interface ITask {
    id: number
    taskText: string
    taskDeadline: string
    date: string
    isChecked: boolean
    color: string
    isMarkToDelete: boolean
    deletedDate: string
}

export interface ITaskForm {
    item: ITask
    markTaskToDelete(id: number): void

}

function Task (this: ITask, taskText : string, taskDeadline : string): void {
    this.id = Date.now();
    this.taskText = taskText;
    this.taskDeadline = taskDeadline;
    this.date = dateFormat();
    this.isChecked = false;
    this.color = '';
    this.isMarkToDelete = false;
    this.deletedDate = '';
}

function dateFormat(date:Date | string = new Date()): string {
    return date ? date.toLocaleString() : new Date().toLocaleString()
}


function TaskForm (props: ITaskForm): ReactElement {
    const dispatch = useDispatch()
    const [input, setInput] = useState(false)
    const [textValue, setTextValue] = useState(props.item.taskText)
    const changeTaskStatus = (): void => {
        const id: number = props.item.id
        dispatch(changeStatus(id))
    }

    const markTaskToDelete = (): void => {
        const id: number = props.item.id
        props.markTaskToDelete(id)
    }

    const createInputForText = (event: React.FocusEvent | React.MouseEvent| any): void => {
        if (event.target.parentElement.nextElementSibling.lastChild.checked === false) setInput(true)
    }

    const changeTaskTextOnInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
       setTextValue(e.target.value)
    }

    const doneTaskTextChange = (e: React.ChangeEvent): void => {
        const id = (e.target as Element).id
        const obj = {id: id, text: textValue}
        dispatch(changeTaskTextField(obj))
        setInput(false)
    }


    const keyboardEvents = (event: React.KeyboardEvent | any): void => {
        if (event.keyCode === 69 && event.target.parentElement.className === 'undone-tasks__container') setInput(true)
        if (event.shiftKey && event.keyCode === 39 && event.target.parentElement.className === 'undone-tasks__container')  {
            const id = Number(event.target.id)
            dispatch(changeStatus(id))
            }
        if (event.shiftKey && event.keyCode === 37 && event.target.parentElement.className === 'done-tasks__container')  {
            const id = Number(event.target.id)
            dispatch(changeStatus(id))
        }
    }

    const handlerDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
        const { id }  = event.target as Element
        event.dataTransfer.setData('id', id)
    }

        return <div className="task"
                    data-testid="testTask"
                    id={props.item.id.toString()}
                    tabIndex={0}
                    style={{background : props.item.color}}
                    draggable="true"
                    onKeyDown={keyboardEvents}
                    onDragStart={handlerDragStart}
                    >
            <div className="closed-button__container">
                <button id={props.item.id.toString()} className="closed-button" data-testid='deletedButton' onClick={markTaskToDelete}>X</button>
            </div>
            <div className="task-date">
                <span className="create-date">Дата создания задачи: {props.item.date.toLocaleString()}</span>
            </div>
            <div className="task-deadline">
                <span className="deadline-date">Дата выполнения задачи: {new Date(props.item.taskDeadline).toLocaleString()} </span>
            </div>
            <div className="task-text__block">
                {
                    input ? (<input autoFocus data-testid='testInput'
                                        id={props.item.id.toString()}
                                        value={textValue}
                                        onChange={changeTaskTextOnInput}
                                        onBlur={doneTaskTextChange}
                            />):
                    (  <p className="task-text" tabIndex={0}
                          onDoubleClick={createInputForText}
                          onFocus={createInputForText}>{props.item.taskText}</p>)
                }
            </div>
            <div className="task-status">
                <span className="status-text">DONE:</span>
                <input type="checkbox" className="status-check" onChange={changeTaskStatus} checked={props.item.isChecked}/>
            </div>
        </div>
    }

export {TaskForm, Task}

