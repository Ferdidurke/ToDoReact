import './styles.sass'
import React, {ReactElement, useEffect} from "react";
import {TaskForm} from "../task/script";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {Box, Button, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {todoApi} from "../../services/TaskService";
import {IToDoParams} from "../../services/TaskService";
import {logApi} from "../../services/LogService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";


const UndoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const { id: userId } = useSelector((state: RootState)=> state.auth.user)
    const [params, setParams] = React.useState<IToDoParams>({
                                                                    sort: {
                                                                        deadlineDate: 'asc'
                                                                    },
                                                                    filter: {
                                                                        userId: userId,
                                                                        isChecked: false,
                                                                        isMarkToDelete: false
                                                                    } })


    const { data: tasks } = todoApi.useFetchUndoneTasksQuery(params)
    const [changeTaskFields] = todoApi.useChangeTaskFieldsMutation()
    const [sendLog] = logApi.useAddLogEventMutation()
    console.log(`undone`)
    useEffect(() => {
        changeDeadlineColor()
    }, [tasks])

    const markTaskToDelete = (id: string): void => {
        changeTaskFields({ id: id, isMarkToDelete: true })
        const log = `Task with id:${id} replace in deleted container at ${ new Date().toLocaleString() }`
        console.log(log)
        sendLog({ body: log })
    }


    const sortOnAsc = (): void => {
        setParams({
            sort: {
                deadlineDate: 'asc'
            },
            filter: {
                userId: userId,
                isChecked: false,
                isMarkToDelete: false
            } })
}

    const sortOnDesc = (): void => {
        setParams({
            sort: {
                deadlineDate: 'desc'
            },
            filter: {
                userId: userId,
                isChecked: false,
                isMarkToDelete: false
            } })
}

    const changeDeadlineColor = () => {
        tasks && tasks.forEach(function (item) {
            const deadlineTime: number = Date.parse(item.deadlineDate)
            const currentTime: number = Date.now()
            if (deadlineTime - currentTime < 3600000 && deadlineTime - currentTime > 0) {
                changeTaskFields({id: item._id, deadlineColor: 'yellow'})
            }
            if (deadlineTime - currentTime < 0) {
                changeTaskFields({id: item._id, deadlineColor: 'red'})
            }
        })
    }


    const handlerDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const id: string = event.dataTransfer.getData('id')
        console.log(id)
        const droppableTask: ChildNode | null = document.getElementById(id)!.lastChild!.firstChild!.firstChild
        const isTaskChecked = (droppableTask as HTMLInputElement).checked
        if (isTaskChecked) {
            changeTaskFields({ id: id, isChecked: false })
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
                    <Button size="small" className="asc-button" data-testid="ascSortButton" onClick={sortOnAsc}> <ArrowDownward/> </Button>
                    <Button size="small" className="desc-button" data-testid="descSortButton" onClick={sortOnDesc}> <ArrowUpward/> </Button>
                </div>
            </div>
            <div className="undone-tasks__container"
                 onDragEnter={ props.handlerDragEnter }
                 onDragOver={ props.handlerDragOver }
                 onDrop={ handlerDrop }>

                {
                    tasks && tasks.map((item: ITask) =>
                         (
                            <TaskForm key={ item._id } item={ item }
                                      markTaskToDelete={ markTaskToDelete }
                                      />
                         )
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