import './styles.sass'
import React, {useState} from "react";
import {TaskForm} from "../task/script";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {useSelector, useDispatch} from "react-redux";

import { RootState} from "../../store/redux-toolkit/store";
import {Box, Button, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {todoApi} from "../../services/TaskService";
import {IToDoParams} from "../../services/TaskService";


const UndoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const [todoparams, setTodoParams] = React.useState<IToDoParams> ({ sort : { deadlineDate: 'desc' } })
    const { data: tasks } = todoApi.useFetchTasksQuery(todoparams)

    const markTaskToDelete = () => {
        console.log(1)
    }

    const sortOnAsc = () => {
        console.log(1)
        setTodoParams({ sort : { deadlineDate: 'asc' } })
    }

    const sortOnDesc = () => {
        console.log(2)
        setTodoParams({ sort : { deadlineDate: 'desc' } })
    }


    // const markTaskToDelete = (id: number): void => {
    //     dispatch(markTaskOnDelete(id))
    // }


    return (
        <div className="undone-tasks">

            <div className="undone-tasks__header">
                <Box sx={{ backgroundColor: 'primary.dark'}}>
                <Typography sx={{
                    marginLeft: '5px',
                    fontWeight: '400',
                    fontFamily: 'Chilanka, cursive'
                }}
                            gutterBottom variant="h5" component="h5">
                    Tasks to do
                </Typography>
                </Box>
                <div className="sorting-buttons__container">
                    <Button size="small" className="asc-button" data-testid="ascSortButton" onClick={() => sortOnAsc()}> <ArrowDownward/> </Button>
                    <Button size="small" className="desc-button" data-testid="descSortButton" onClick={() => sortOnDesc()}> <ArrowUpward/> </Button>
                </div>
            </div>
            <div className="undone-tasks__container"
                 onDragEnter={props.handlerDragEnter}
                 onDragOver={props.handlerDragOver}
                 onDrop={props.handlerDrop}>

                {
                    tasks && tasks.map((item: ITask) =>
                        (!item.isChecked && !item.isMarkToDelete) ? (
                            <TaskForm key={item._id} item={item}
                                      markTaskToDelete={markTaskToDelete}/>
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