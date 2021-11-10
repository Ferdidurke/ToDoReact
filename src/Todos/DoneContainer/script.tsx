import {TaskForm} from "../task/script";
import './styles.sass'
import React, {useEffect} from "react";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {Box, Typography} from "@mui/material";
import {IToDoParams, todoApi} from "../../services/TaskService";
import {logApi} from "../../services/LogService";

const DoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const { id: userId } = useSelector((state: RootState)=> state.auth.user)
    const params: IToDoParams = {
                                    sort: {
                                            deadlineDate: 'asc'
                                    },
                                    filter: {
                                            userId: userId,
                                            isChecked: true,
                                            isMarkToDelete: false
                                    }
                                }


    const { data: tasks } = todoApi.useFetchUndoneTasksQuery(params)
    const [changeTaskFields] = todoApi.useChangeTaskFieldsMutation()
    const [patchMarkedToDeleteTask] = todoApi.useChangeTaskFieldsMutation()
    const [sendLog] = logApi.useAddLogEventMutation()
    console.log(`done`)
    useEffect(() => {
        changeDeadlineColor()
    }, [tasks])

    const markTaskToDelete = (id: string): void => {
        patchMarkedToDeleteTask({ id: id, isMarkToDelete: true })
        const log = `Task with id:${ id } replace in deleted container at ${ new Date().toLocaleString() }`
        console.log(log)
        sendLog({ body: log })
    }

    const changeDeadlineColor = () => {
        tasks && tasks.forEach(function (item) {
            if (item.deadlineColor === 'yellow' || item.deadlineColor === 'red') {
                changeTaskFields({ id: item._id, deadlineColor: '' })
            }
        })
    }


    const handlerDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const id: string = event.dataTransfer.getData('id')
        console.log(id)
        const droppableTask: any = document.getElementById(id)!.lastChild!.firstChild!.firstChild
        const isTaskChecked = droppableTask.checked
        if (!isTaskChecked) {
            changeTaskFields({ id: id, isChecked: true })
        }

    }


    return (
        <div className="done-tasks">
            <div className="undone-tasks__header">
            <Box sx={{ backgroundColor: 'primary.dark' }}>
                <Typography sx={{
                    marginLeft: '5px',
                    fontWeight: '400',
                    fontFamily: 'Chilanka, cursive'
                }}
                            gutterBottom variant="h5" component={'span'}>
                    Done tasks
                </Typography>
            </Box>
            </div>


            <div className="done-tasks__container"
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


export {DoneTasks}














