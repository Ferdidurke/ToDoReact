import './styles.sass'
import React from "react";
import {ITask, TaskForm} from "../task/script";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {IToDoParams, todoApi} from "../../services/TaskService";
import {TodosProps} from "../Todos";
import {logApi} from "../../services/LogService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";



const DeletedTasks: React.FC<Partial<TodosProps>> = () => {
    const { id: userId } = useSelector((state: RootState)=> state.auth.user)
    const params: IToDoParams = {
                                 sort: {
                                        deletedDate: 'asc'
                                        },
                                 filter: {
                                        userId: userId,
                                        isMarkToDelete: true
                                        }
                                }


    const { data: tasks } = todoApi.useFetchDeletedTasksQuery(params)

    const [deleteTask] = todoApi.useDeleteTaskMutation()
    const [sendLog] = logApi.useAddLogEventMutation()
    console.log(`delete`)
    const markTaskToDelete = (id: string) => {
         const confirmation: boolean = window.confirm('Are you right?')
            if (confirmation) {
                const taskOnDelete: HTMLElement | null = document.getElementById(id)
                taskOnDelete!.classList.toggle('deleted')
                deleteTask(id)
                const log = `Task with id:${id} deleted at ${new Date().toLocaleString()}`
                console.log(log)
                sendLog({ body: log })
            }
        }


    return (

        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>Deleted Tasks</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="deleted__tasks__container">
                        {
                            tasks && tasks.map((item: ITask) =>
                                (
                                    <TaskForm key={item._id} item={item}
                                              markTaskToDelete={markTaskToDelete}
                                              />
                                )
                            )
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export {DeletedTasks}


