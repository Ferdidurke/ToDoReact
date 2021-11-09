import './styles.sass'
import React from "react";
import {ITask, TaskForm} from "../task/script";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {todoApi} from "../../services/TaskService";
import {TodosProps} from "../Todos";
import {logApi} from "../../services/LogService";

const handleExtendedDeletedBlock = () => {
    const block: HTMLDivElement | null = document.querySelector('.deleted__tasks__container')
    block!.classList.toggle('extended')
}


const DeletedTasks: React.FC<Partial<TodosProps>> = (props) => {
    const todoparams = {
        sort : {
            deadlineDate: 'desc'
        }
    }

    const { data: tasks } = todoApi.useFetchTasksQuery(todoparams)
    const [deleteTask] = todoApi.useDeleteTaskMutation()
    const [sendLog] = logApi.useAddLogEventMutation()

    const markTaskToDelete = (id: string) => {
         const confirmation: boolean = window.confirm('Are you right?')
            if (confirmation) {
                const taskOnDelete: HTMLElement | null = document.getElementById(id)
                taskOnDelete!.classList.toggle('deleted')
                deleteTask(id)
                const log = `Task with id:${id} deleted at ${new Date().toLocaleString()}`
                console.log(log)
                sendLog({ body: log })
                //setTimeout(() => {}, 300)
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
                                item.isMarkToDelete ? (
                                    <TaskForm key={item._id} item={item}
                                              markTaskToDelete={markTaskToDelete}

                                              />
                                ) : null
                            )
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
        </div>
    )
}

export {DeletedTasks}


