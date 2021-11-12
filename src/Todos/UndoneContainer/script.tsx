import './styles.sass'
import React, {ReactElement, useEffect} from "react";
import {TaskForm} from "../task/script";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {Box, Button, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {todoApi} from "../../services/TaskService";
import {logApi} from "../../services/LogService";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {
    changeStatus,
    deadliner,
    markTaskOnDelete,
    setRequestParams
} from "../../store/redux-toolkit/reducers/todoReducer";

import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {logout} from "../../store/redux-toolkit/reducers/authReducer";


const UndoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const { id: userId } = useSelector((state: RootState)=> state.auth.user)
    const { tasks } = useSelector((state: RootState) => state.todo)
    const dispatch = useDispatch()
    const [changeTaskFields, { error: changeFieldsError }] = todoApi.useChangeTaskFieldsMutation()
    const [changeTaskColour, { error: changeColoursError }] = todoApi.useChangeTaskColourMutation()
    const [sendLog] = logApi.useAddLogEventMutation()

    if ((changeColoursError || changeFieldsError) && ((changeColoursError as FetchBaseQueryError).status === 401 || (changeFieldsError as FetchBaseQueryError).status === 401)) {
        dispatch(logout())
    }

    useEffect(() => {
        changeDeadlineColor()
    }, [tasks])

    const markTaskToDelete = (id: string): void => {

        const index: number = tasks.findIndex((item: ITask) => item._id === id)
        if (index !== -1 && !tasks[index].isMarkToDelete) {
                dispatch(markTaskOnDelete(index))
        }

        changeTaskFields({ id: id, isMarkToDelete: true })
        const log = `Task with id:${id} replace in deleted container at ${ new Date().toLocaleString() }`
        console.log(log)
        sendLog({ body: log })
    }


    const sortOnAsc = (): void => {
        dispatch(setRequestParams( { deadlineDate: 'asc' } ))
}

    const sortOnDesc = (): void => {
        dispatch(setRequestParams( { deadlineDate: 'desc' }  ))
}

    const changeDeadlineColor = () => {

        const changingTasks: Array<any> = []
        tasks && tasks.forEach(function (item, index) {
            const deadlineTime: number = Date.parse(item.deadlineDate)
            const currentTime: number = Date.now()
            if (item.isChecked && (item.deadlineColor === 'red' || item.deadlineColor === 'yellow')) {
                dispatch(deadliner({ index: index, deadlineColor: '' }))
                const currentTask = { id: item._id, deadlineColor: '' }
                changingTasks.push(currentTask)
            }

            if (deadlineTime - currentTime < 3600000 && deadlineTime - currentTime > 0 && item.deadlineColor === '' && !item.isChecked) {
                dispatch(deadliner({ index: index, deadlineColor: 'yellow' }))
                const currentTask = { id: item._id, deadlineColor: 'yellow' }
                changingTasks.push(currentTask)
            }
            if (deadlineTime - currentTime < 0 && (item.deadlineColor === '' || item.deadlineColor === 'yellow') && !item.isChecked) {
                dispatch(deadliner({ index: index, deadlineColor: 'red' }))
                const currentTask = { id: item._id, deadlineColor: 'red' }
                changingTasks.push(currentTask)
            }

        })
        changeTaskColour({ update: changingTasks })
    }




    const handlerDrop = (event: React.DragEvent<HTMLDivElement>) => {

        event.preventDefault()
        const id: string = event.dataTransfer.getData('id')
        const index: number = tasks.findIndex((item) => item._id === id)
        if (!tasks[index].isMarkToDelete) {
            dispatch(changeStatus(index))

            const droppableTask: ChildNode | null = document.getElementById(id)!.lastChild!.firstChild!.firstChild
            const isTaskChecked = (droppableTask as HTMLInputElement).checked
            if (isTaskChecked) {
                changeTaskFields({id: id, isChecked: false})
                const log = (`Task with id:${ id } moved to undone at ${ new Date().toLocaleString() }`)
                sendLog({ body: log })
            }
        }
    }





    return (
        <div className="undone-tasks">

            <div className="undone-tasks__header">
                <Box sx={{ backgroundColor: 'primary.dark'}}>
                <Typography sx={{
                    marginLeft: '5px',
                    fontWeight: '400',
                    fontFamily: 'Chilanka, cursive'
                }}
                            gutterBottom variant="h5" component="span">
                    Tasks to do
                </Typography>
                </Box>
                <div className="sorting-buttons__container">
                    <Button size="small" className="asc-button" data-testid="ascSortButton" onClick={ sortOnAsc }> <ArrowDownward/> </Button>
                    <Button size="small" className="desc-button" data-testid="descSortButton" onClick={ sortOnDesc }> <ArrowUpward/> </Button>
                </div>
            </div>
            <div className="undone-tasks__container"
                 onDragEnter={ props.handlerDragEnter }
                 onDragOver={ props.handlerDragOver }
                 onDrop={ handlerDrop }>

                {
                    tasks && tasks.map((item: ITask) => (!item.isChecked && !item.isMarkToDelete) ?
                         (
                            <TaskForm key={ item._id } item={ item }
                                      markTaskToDelete={ markTaskToDelete }
                                      />
                         ) : null
                    )
                }
            </div>
        </div>
    )
}

export {UndoneTasks}




















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