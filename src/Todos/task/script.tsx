import React, {ReactElement, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import CardHeader from "@mui/material/CardHeader";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import {Checkbox, CircularProgress, createTheme, TextField, ThemeProvider} from "@mui/material";
import Card from "@mui/material/Card";
import {RootState} from "../../store/redux-toolkit/store";
import {todoApi} from "../../services/TaskService";
import {logApi} from "../../services/LogService";
import {changeStatus} from "../../store/redux-toolkit/reducers/todoReducer";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {logout} from "../../store/redux-toolkit/reducers/authReducer";


export interface ITask {
    _id?: string | undefined
    userId: string
    taskText: string
    deadlineDate: string
    createDate: string | Date
    isChecked: boolean
    deadlineColor: string
    isMarkToDelete: boolean
    deletedDate: string
}


export interface ITaskForm {
    item: ITask
    markTaskToDelete(id: string | undefined): void
}


function Task (this: ITask, userId: string, taskText : string, taskDeadline : string): void {
    this.userId = userId
    this.taskText = taskText;
    this.deadlineDate = taskDeadline;
    this.isChecked = false;
    this.deadlineColor = '';
    this.isMarkToDelete = false;
    this.deletedDate = '';
}



function TaskForm (props: ITaskForm): ReactElement {
    const { user } = useSelector((state: RootState) => state.auth)
    const { tasks } = useSelector((state: RootState) => state.todo)
    const [changeTaskFields, { isLoading: isChangeLoading, error: isChangeError } ] = todoApi.useChangeTaskFieldsMutation()
    const [input, setInput] = useState(false)
    const [deleteAnimation, setDeleteAnimation] = useState(false)
    const [textValue, setTextValue] = useState(props.item.taskText)
    const [sendLog] = logApi.useAddLogEventMutation()
    const dispatch = useDispatch()

    if (isChangeError && (isChangeError as FetchBaseQueryError).status === 401) {
        dispatch(logout())
    }


    const deletedTheme = createTheme({
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        opacity: 0
                    },
                },
            },
        },
    });

    const normalTheme = createTheme({
        components: {
            MuiCard: {
                styleOverrides: {
                    root: {
                        opacity: 1
                    },
                },
            },
        },
    });

    const deleteTask = () => {

        if (props.item.isMarkToDelete) {
            setDeleteAnimation(true)
        }

        props.markTaskToDelete(props.item._id)
    }


    const changeTaskStatus = () => {
        const id = props.item._id
        const index: number = tasks.findIndex((item) => item._id === id)
        dispatch(changeStatus(index))

        let isChecked = props.item.isChecked
        let log = ''
        if (!isChecked) {
            log = (`Task with id:${ id } moved to done at ${ new Date().toLocaleString() }`)
        }
        if (isChecked) {
            log = (`Task with id:${ id } moved to do at ${ new Date().toLocaleString() }`)
        }
        console.log(log)
        sendLog({ body: log })
        isChecked = !isChecked
        changeTaskFields({ id: id, isChecked: isChecked })
    }

    const createInputForText = (event: React.FocusEvent | React.MouseEvent| any): void => {
        if (event.target.parentElement.nextElementSibling.lastChild.firstChild.checked === false) setInput(true)
    }

    const changeTaskTextOnInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
       setTextValue(e.target.value)
    }

    const doneTaskTextChange = () : void => {
        changeTaskFields({ id: props.item._id, taskText: textValue })
        setInput(false)
    }

    const keyboardEvents = (event: React.KeyboardEvent | any): void => {
        if (event.keyCode === 69 && event.target.parentElement.className === 'undone-tasks__container') setInput(true)
        if (event.shiftKey && event.keyCode === 39 && event.target.parentElement.className === 'undone-tasks__container')  {
            changeTaskStatus()
            }
        if (event.shiftKey && event.keyCode === 37 && event.target.parentElement.className === 'done-tasks__container')  {
            changeTaskStatus()
        }

        if (event.keyCode === 46) {
            props.markTaskToDelete(props.item._id)
        }
    }

    const handlerDragStart = (event: React.DragEvent<HTMLDivElement>): void => {
        const { id }  = event.target as Element
        event.dataTransfer.setData('id', id)
    }


    return (
        <ThemeProvider theme={ deleteAnimation ? deletedTheme : normalTheme }>
            <Card
                className="task"
                data-testid="testTask"
                id={ props.item._id }
                tabIndex={0}
                draggable="true"
                onKeyDown={ keyboardEvents }
                onDragStart={ handlerDragStart }
                sx={{ width: '90%',
                    minHeight: '240px',
                    margin: '10px auto',
                    backgroundColor: (props.item.deadlineColor !== '') ? props.item.deadlineColor : '#e1eff7' ,
                    overflowY: 'auto',
                    transition: 'opacity 0.3s',
                    '&:focus': {
                            border: '2px solid'
                            }
                                        }}>
                       <CardHeader
                        action={
                            <IconButton id={ props.item._id }
                                        sx={{ float: 'right' }}
                                        className="closed-button"
                                        data-testid='deletedButton'
                                        onClick={ deleteTask }>
                                <DeleteIcon/>
                            </IconButton>
                        }
                        title='Task'
                        subheader= { user.firstName }
                        />
                        <CardContent>
                            {
                                    isChangeLoading  ?  (<div style={{
                                                        display: 'flex',
                                                        margin: '0 auto',
                                                        justifyContent: 'center' }}>
                                                                                    <CircularProgress />
                                                 </div>)
                                        : ( <>
                                        <Typography variant="body2" color="text.secondary" component="div">
                                                Сreate Date: { new Date(props.item.createDate).toLocaleString() }
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" component="div">
                                            Deadline Date: { new Date(props.item.deadlineDate).toLocaleString() }
                                        </Typography>
                                            {
                                                input ? (<TextField variant="filled" label="Set task text" autoFocus data-testid="testInput"
                                                                   id={ props.item._id }
                                                                   value={ textValue }
                                                                   onChange={ changeTaskTextOnInput }
                                                                   onBlur={ doneTaskTextChange }
                                                        />) :
                                                    (<Typography sx={{
                                                        whiteSpace: 'nowrap',
                                                        overflow: 'hidden',
                                                        textOverflow: 'ellipsis'
                                                    }}
                                                                 title={ props.item.taskText }
                                                                 tabIndex={0}
                                                                 id={ props.item._id }
                                                                 onDoubleClick={ createInputForText }
                                                                 onFocus={ createInputForText }
                                                                 component="div">
                                                        { props.item.taskText }
                                                    </Typography>)
                                            }

                                            </>)
                            }

                        </CardContent>
                        <CardActions disableSpacing sx={{
                                                        display: 'flex',
                                                        justifyContent: 'flex-end'
                                                         }}>
                                                            <Checkbox id={ props.item._id } className="status-check"
                                                                      onChange={ changeTaskStatus }
                                                                      checked={ props.item.isChecked }
                                                                      disabled={ props.item.isMarkToDelete }  />
                        </CardActions>

            </Card>
        </ThemeProvider>
    )



}

export {TaskForm, Task}

