import './styles.sass'
import React from "react";
import {ITask, TaskForm} from "../task/script";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {todoApi} from "../../services/TaskService";
import {TodosProps} from "../Todos";
import {logApi} from "../../services/LogService";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {deleteTaskFromDeletedBlock} from "../../store/redux-toolkit/reducers/todoReducer";
import {checkToken} from "../../CheckAuthToken/CheckAuthToken";



const DeletedTasks: React.FC<Partial<TodosProps>> = () => {
    const { tasks } = useSelector((state: RootState) => state.todo)
    const [deleteTaskFromServer] = todoApi.useDeleteTaskMutation()
    const [sendLog] = logApi.useAddLogEventMutation()
    const dispatch = useDispatch()
    checkToken()



    const deleteTaskOnRedux = (id: string) => {

        const confirmation: boolean = window.confirm('Are you right?')
            if (confirmation) {
                const index: number = tasks.findIndex((item: ITask) => item._id === id)
                dispatch(deleteTaskFromDeletedBlock(index))

                const taskOnDelete: HTMLElement | null = document.getElementById(id)
                taskOnDelete!.classList.toggle('deleted')
                deleteTaskFromServer(id)
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
                    <Typography component="div">Deleted Tasks</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <div className="deleted__tasks__container">
                        {
                            tasks && tasks.map((item: ITask) => (item.isMarkToDelete) ?
                                (
                                    <TaskForm key={item._id} item={item}
                                              markTaskToDelete={deleteTaskOnRedux}
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


