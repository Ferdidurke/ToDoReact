import React, {ReactElement, useState} from "react";

import './styles.sass'
import {useDispatch, useSelector} from "react-redux";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {Checkbox, TextField} from "@mui/material";
import Card from "@mui/material/Card";
import {RootState} from "../../store/redux-toolkit/store";
import {todoApi} from "../../services/TaskService";

export interface ITask {
    _id?: string | undefined
    userId: string
    taskText: string
    deadlineDate: string
    createDate: string
    isChecked: boolean
    deadlineColor: string
    isMarkToDelete: boolean
    deletedDate: string
}

export interface ITaskForm {
    item: ITask
    markTaskToDelete(id: any): void

}

function Task (this: ITask, userId: string, taskText : string, taskDeadline : string): void {
    this.userId = userId
    this.taskText = taskText;
    this.deadlineDate = taskDeadline;
    this.createDate = dateFormat();
    this.isChecked = false;
    this.deadlineColor = '';
    this.isMarkToDelete = false;
    this.deletedDate = '';
}

function dateFormat(date:Date | string = new Date()): string {
    return date ? date.toLocaleString() : new Date().toLocaleString()
}


function TaskForm (props: ITaskForm): ReactElement {
    const dispatch = useDispatch()
    const { user } = useSelector((state: RootState) => state.auth)
    const [changeStatus] = todoApi.useChangeStatusMutation()
    const [input, setInput] = useState(false)
    const [textValue, setTextValue] = useState(props.item.taskText)



    const changeTaskStatus = (e: React.ChangeEvent) => {
        const id = e.target.id
        console.log(id)
        changeStatus(id)
        const log = ''
        // if (index !== -1)
        //     if (!state.tasks[index].isChecked) {
        //         log = `Task with id:${state.tasks[index]._id} moved to done at ${new Date().toLocaleString()}`
        //     } else {
        //         log = `Task with id:${state.tasks[index]._id} moved to do at ${new Date().toLocaleString()}`
        //     }
        // state.tasks[index].isChecked = !state.tasks[index].isChecked
        // state.tasks = [...state.tasks]

    }


    const changeTaskTextField = () => {
        // const index: number = state.tasks.findIndex((item: {_id: any}) => item._id === Number(action.payload._id))
        // if (index !== -1) {
        //     state.tasks[index].taskText = action.payload.text
        // }
        console.log(1)
    }

    const markTaskOnDelete = () => {
        // if (index !== -1 && !state.tasks[index].isMarkToDelete) {
        //     state.tasks[index].isMarkToDelete = true
        //     state.tasks[index].deletedDate = new Date().toLocaleString()
        //     state.tasks.sort((a, b) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
        //     const log = `Task with id:${state.tasks[index]._id} replace in deleted container at ${new Date().toLocaleString()}`
        //     console.log(log)
        //     state.logs.push(log)
        // }
            console.log(1)
    }



    // const deadliner = () => {
    //     state.tasks.forEach(function (item) {
    //         const deadlineTime: number = Date.parse(item.deadlineDate)
    //         const currentTime: number = Date.now()
    //         if (item.isChecked) {
    //             item.deadlineColor = ''
    //         } else {
    //             if (deadlineTime - currentTime < 3600000 && deadlineTime - currentTime > 0) {
    //             item.deadlineColor = 'yellow'
    //         }
    //             if (deadlineTime - currentTime < 0) {
    //                 item.deadlineColor = 'red'
    //             }
    //         }
    //     })
    //
    //     }








    // const changeTaskStatus = (): void => {
    //     const id: number = props.item.id
    //     dispatch(changeStatus(id))
    // }

    // const markTaskToDelete = (): void => {
    //     const id: number = props.item.id
    //     props.markTaskToDelete(id)
    // }

    const createInputForText = (event: React.FocusEvent | React.MouseEvent| any): void => {
        if (event.target.parentElement.nextElementSibling.lastChild.firstChild.checked === false) setInput(true)
    }

    const changeTaskTextOnInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
       setTextValue(e.target.value)
    }

    const doneTaskTextChange = (e: React.ChangeEvent): void => {
        const id = (e.target as Element).id
        const obj = {id: id, text: textValue}
        changeTaskTextField()
        setInput(false)
    }


    const keyboardEvents = (event: React.KeyboardEvent | any): void => {

        if (event.keyCode === 69 && event.target.parentElement.className === 'undone-tasks__container') setInput(true)
        if (event.shiftKey && event.keyCode === 39 && event.target.parentElement.className === 'undone-tasks__container')  {
            console.log(event.target)
            const id = Number(event.target.id)
            //dispatch(changeStatus(id))
            }
        if (event.shiftKey && event.keyCode === 37 && event.target.parentElement.className === 'done-tasks__container')  {
            const id = Number(event.target.id)
            //dispatch(changeStatus(id))
        }

        if (event.keyCode === 46) {
            const id = Number(event.target.id)
            //props.markTaskToDelete(id)
        }
    }

    const handlerDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
        const { id }  = event.target as Element
        event.dataTransfer.setData('id', id)
    }

        //return  <div className="task"
        //             data-testid="testTask"
        //             id={props.item.id.toString()}
        //             tabIndex={0}
        //             style={{background : props.item.color}}
        //             draggable="true"
        //             onKeyDown={keyboardEvents}
        //             onDragStart={handlerDragStart}
        //             >
        //     <div className="closed-button__container">
        //         <button id={props.item.id.toString()} className="closed-button" data-testid='deletedButton' onClick={markTaskToDelete}>X</button>
        //     </div>
        //     <div className="task-date">
        //         <span className="create-date">Дата создания задачи: {props.item.date.toLocaleString()}</span>
        //     </div>
        //     <div className="task-deadline">
        //         <span className="deadline-date">Дата выполнения задачи: {new Date(props.item.taskDeadline).toLocaleString()} </span>
        //     </div>
        //     <div className="task-text__block">
        //         {
        //             input ? (<input autoFocus data-testid='testInput'
        //                                 id={props.item.id.toString()}
        //                                 value={textValue}
        //                                 onChange={changeTaskTextOnInput}
        //                                 onBlur={doneTaskTextChange}
        //                     />):
        //             (  <p className="task-text" tabIndex={0}
        //                   onDoubleClick={createInputForText}
        //                   onFocus={createInputForText}>{props.item.taskText}</p>)
        //         }
        //     </div>
        //     <div className="task-status">
        //         <span className="status-text">DONE:</span>
        //         <input type="checkbox" className="status-check" onChange={changeTaskStatus} checked={props.item.isChecked}/>
        //     </div>
        // </div>

    return <Card
        className="task"
        data-testid="testTask"
        id={props.item._id}
        tabIndex={0}
        draggable="true"
        onKeyDown={keyboardEvents}
        onDragStart={handlerDragStart}
        sx={{ width: '90%',
            minHeight: '240px',
            margin: '10px auto',
            backgroundColor: '#e1eff7',
            overflowY: 'auto',
            '&:focus': {
                    border: '2px solid'
                    }
                                }}>
             <CardHeader
                action={
                    <IconButton id={props.item._id}
                                sx={{ float: 'right' }}
                                className="closed-button" data-testid='deletedButton'
                                onClick={props.markTaskToDelete}>
                        <DeleteIcon/>
                    </IconButton>
                }
                title='Task'
                subheader= {user.firstName}
            />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                Сreate Date: {new Date(props.item.createDate).toLocaleString()}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Deadline Date: {new Date(props.item.deadlineDate).toLocaleString()}
            </Typography>
            {
                input ? (<TextField variant="filled" label="Set task text" autoFocus data-testid="testInput"
                                    id={props.item._id}
                                    value={textValue}
                                    onChange={changeTaskTextOnInput}
                                    onBlur={doneTaskTextChange}
                />) : (
                    <Typography sx={{
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                    }}
                                title={props.item.taskText}
                                tabIndex={0}
                                id={props.item._id}
                                onDoubleClick={createInputForText}
                                onFocus={createInputForText}>
                                {props.item.taskText}
                    </Typography>
                )
            }



        </CardContent>
        <CardActions disableSpacing sx={{
            display: 'flex',
            justifyContent: 'flex-end'
        }}>
            <Checkbox id={props.item._id} className="status-check" onChange={changeTaskStatus} checked={props.item.isChecked}/>
        </CardActions>

    </Card>





}

export {TaskForm, Task}

