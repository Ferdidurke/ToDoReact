import {TaskForm} from "../task/script";
import './styles.sass'
import React from "react";
import {TodosProps} from "../Todos";
import {ITask} from "../task/script";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";

import {Box, Typography} from "@mui/material";

const DoneTasks: React.FC<Partial<TodosProps>> = (props) => {
    const { tasks } = useSelector((state:RootState) => state.todo);
    const dispatch = useDispatch()
    const markTaskToDelete = (id: number): void => {
        console.log(1)
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
                                      markTaskToDelete={markTaskToDelete}/>
                        ) : null
                    )
                }
            </div>
        </div>
    )
}


export {DoneTasks}














