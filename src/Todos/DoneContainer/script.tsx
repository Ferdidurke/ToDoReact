import {TaskForm} from "../task/script";
import './styles.sass'
import React from "react";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";

import {Box, Typography} from "@mui/material";
import {IToDoParams, todoApi} from "../../services/TaskService";
import {logApi} from "../../services/LogService";

const DoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const todoparams = {
        sort : {
            deadlineDate: 'desc'
        }
    }

    const { data: tasks } = todoApi.useFetchTasksQuery(todoparams)

    const [patchMarkedToDeleteTask] = todoApi.useChangeTaskFieldsMutation()
    const [sendLog] = logApi.useAddLogEventMutation()

    const markTaskToDelete = (id: string): void => {
        patchMarkedToDeleteTask({ id: id, isMarkToDelete: true })
        const log = `Task with id:${id} replace in deleted container at ${new Date().toLocaleString()}`
        console.log(log)
        sendLog({ body: log })
    }


    return (
        <div className="done-tasks">
            <div className="undone-tasks__header">
            <Box sx={{ backgroundColor: 'primary.dark'}}>
                <Typography sx={{
                    marginLeft: '5px',
                    fontWeight: '400',
                    fontFamily: 'Chilanka, cursive'
                }}
                            gutterBottom variant="h5" component="h5">
                    Done tasks
                </Typography>
            </Box>
            </div>


            <div className="done-tasks__container"
            onDragEnter={props.handlerDragEnter}
            onDragOver={props.handlerDragOver}
            onDrop={props.handlerDrop}>
                {
                    tasks && tasks.map((item: ITask) =>
                        (item.isChecked && !item.isMarkToDelete)? (
                            <TaskForm key={item._id} item={item}
                                      markTaskToDelete={markTaskToDelete}
                                      />
                        ) : null
                    )
                }
            </div>
        </div>
    )
}


export {DoneTasks}














