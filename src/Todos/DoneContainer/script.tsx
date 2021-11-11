import {TaskForm} from "../task/script";
import './styles.sass'
import React, {useEffect} from "react";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {Box, Typography} from "@mui/material";
import {IToDoParams, todoApi} from "../../services/TaskService";
import {logApi} from "../../services/LogService";
import {changeStatus, markTaskOnDelete} from "../../store/redux-toolkit/reducers/todoReducer";
import {checkToken} from "../../CheckAuthToken/CheckAuthToken";

const DoneTasks: React.FC<Partial<TodosProps>> = (props) => {

    const { tasks } = useSelector((state: RootState) => state.todo)
    const [changeTaskFields] = todoApi.useChangeTaskFieldsMutation()
    const [patchMarkedToDeleteTask] = todoApi.useChangeTaskFieldsMutation()
    const [sendLog] = logApi.useAddLogEventMutation()
    const dispatch = useDispatch()
    checkToken()


    const markTaskToDelete = (id: string): void => {
        const index: number = tasks.findIndex((item: ITask) => item._id === id)
        if (index !== -1 && !tasks[index].isMarkToDelete) {
            dispatch(markTaskOnDelete(index))
        }

        patchMarkedToDeleteTask({ id: id, isMarkToDelete: true })
        const log = `Task with id:${ id } replace in deleted container at ${ new Date().toLocaleString() }`
        console.log(log)
        sendLog({ body: log })
    }



    const handlerDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        const id: string = event.dataTransfer.getData('id')
        const index: number = tasks.findIndex((item) => item._id === id)
        if (!tasks[index].isMarkToDelete) {
            dispatch(changeStatus(index))
            const droppableTask: any = document.getElementById(id)!.lastChild!.firstChild!.firstChild
            const isTaskChecked = droppableTask.checked
            if (!isTaskChecked) {
                changeTaskFields({ id: id, isChecked: true })
                const log = (`Task with id:${ id } moved to done at ${ new Date().toLocaleString() }`)
                sendLog({ body: log })
            }
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
                    tasks && tasks.map((item: ITask) => (item.isChecked && !item.isMarkToDelete) ?
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


export {DoneTasks}














