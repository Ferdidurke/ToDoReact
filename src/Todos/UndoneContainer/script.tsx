import './styles.sass'
import React from "react";
import {TaskForm} from "../task/script";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {Box, Button, Typography} from "@mui/material";
import {ArrowDownward, ArrowUpward} from "@mui/icons-material";
import {todoApi} from "../../services/TaskService";
import {IToDoParams} from "../../services/TaskService";
import {logApi} from "../../services/LogService";


const UndoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const [todoparams, setTodoParams] = React.useState<IToDoParams> ({ sort : { deadlineDate: 'desc' } })
    const { data: tasks } = todoApi.useFetchTasksQuery(todoparams)
    const [changeTaskFields] = todoApi.useChangeTaskFieldsMutation()
    const [sendLog] = logApi.useAddLogEventMutation()

    const markTaskToDelete = (id: string): void => {
        changeTaskFields({ id: id, isMarkToDelete: true })
        const log = `Task with id:${id} replace in deleted container at ${new Date().toLocaleString()}`
        console.log(log)
        sendLog({ body: log })
    }


    const sortOnAsc = () => {
        setTodoParams({ sort : { deadlineDate: 'asc' } })

    }

    const sortOnDesc = () => {
        setTodoParams({ sort : { deadlineDate: 'desc' } })
    }

    const changeDeadlineColor = () => {
        tasks && tasks.forEach(function (item) {
            const deadlineTime: number = Date.parse(item.deadlineDate)
            const currentTime: number = Date.now()
            if (item.isChecked) {
                changeTaskFields({ id: item._id, deadlineColor: '' })
            } else {
                if (deadlineTime - currentTime < 3600000 && deadlineTime - currentTime > 0) {
                changeTaskFields({ id: item._id, deadlineColor: 'yellow' })
            }
                if (deadlineTime - currentTime < 0) {
                 changeTaskFields({ id: item._id, deadlineColor: 'red' })
                }
            }
        })
    }

    //setInterval(changeDeadlineColor, 30000)




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
                                      markTaskToDelete={markTaskToDelete}
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