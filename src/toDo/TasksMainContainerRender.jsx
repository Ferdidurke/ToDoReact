import {UndoneTasksRender} from "../UndoneContainer/script";
import {DoneTasksRender} from "../DoneContainer/script";
import React from "react";
import './styles.sass'

export function TasksMainContainerRender () {
    return (
        <div className="todo__tasks">
            <UndoneTasksRender/>
            <DoneTasksRender/>
        </div>
    )
}