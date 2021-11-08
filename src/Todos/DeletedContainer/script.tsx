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

const handleExtendedDeletedBlock = () => {
    const block: HTMLDivElement | null = document.querySelector('.deleted__tasks__container')
    block!.classList.toggle('extended')
}


const DeletedTasks: React.FC = () => {
    const { tasks }  = useSelector((state: RootState) => state.todo);
    const dispatch = useDispatch()
    const markTaskToDelete = (id: number) => {
        // const index: number = tasks.findIndex((item: ITask) => id === item._id)
        // if (index !== -1 && tasks[index].isMarkToDelete) {
        //     const confirmation: boolean = window.confirm('Are you right?')
        //     if (confirmation) {
        //         const taskOnDelete: HTMLElement | null = document.getElementById(tasks[index]._id.toString())
        //         taskOnDelete!.classList.toggle('deleted')
                // setTimeout(() => {}, 300)

            //}
    console.log(1)
        }


    return (
        <>
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
                                              markTaskToDelete={markTaskToDelete}/>
                                ) : null
                            )
                        }
                    </div>
                </AccordionDetails>
            </Accordion>
        </>
    )
}

export {DeletedTasks}


