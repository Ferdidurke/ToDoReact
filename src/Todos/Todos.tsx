import React, {ReactElement} from 'react';
import {useDispatch} from 'react-redux'
import './styles.sass';
import {ToDoHeader} from "./Header/script";
import {DeletedTasks} from "./DeletedContainer/script";
import {UndoneTasks} from "./UndoneContainer/script";
import {DoneTasks} from "./DoneContainer/script";
import {ITask} from "./task/script";
import {useSelector} from "react-redux";
import {RootState} from "../store/redux-toolkit/store";
import Header from "../Header";
import {NewTaskForm} from "./NewTaskContainer";
import {IToDoParams, todoApi} from "../services/TaskService";


export interface TodosProps {
    tasks: any[]
    logging(logText: string): any
    createNewTask(task: ITask): void
    sortTasksOnAsc(): void
    sortTasksOnDesc(): void
    changeTaskStatus(id: number): void
    markTaskToDelete(id: any): void
    changeTaskText (obj: {id: number | string, text: string}): void
    handlerDragEnter(event: React.DragEvent<HTMLDivElement>): void
    handlerDragOver(event: React.DragEvent<HTMLDivElement>): void
    handlerDrop(event: React.DragEvent<HTMLDivElement>): void
}



function Todos (): ReactElement {
    const todoparams = {
        sort : {
            deadlineDate: 'desc'
        }
    }
    const [changeTaskFields] = todoApi.useChangeTaskFieldsMutation()

    const { data: tasks } = todoApi.useFetchTasksQuery(todoparams)


const handlerDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
}

const handlerDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
}

const handlerDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const id: string = event.dataTransfer.getData('id')
    if (tasks) {
        const index: number = tasks.findIndex((item) => item._id === id)
        if (tasks[index].isChecked && event.currentTarget.className==='undone-tasks__container')
        {
            const id = tasks[index]._id
            changeTaskFields({ id: id, isChecked: false })
        }
        if (!tasks[index].isChecked && event.currentTarget.className==='done-tasks__container')
        {
            const id = tasks[index]._id
            changeTaskFields({ id: id, isChecked: true })
        }
    }


}



  return (
  <div className='todo__container'>
      <Header/>
          <ToDoHeader />
      <div className="todo__tasks">
          <UndoneTasks
                       handlerDragEnter={handlerDragEnter}
                       handlerDragOver={handlerDragOver}
                       handlerDrop={handlerDrop}


          />

          <NewTaskForm/>

          <DoneTasks
                       handlerDragEnter={handlerDragEnter}
                       handlerDragOver={handlerDragOver}
                       handlerDrop={handlerDrop}


                       />
      </div>

    <DeletedTasks
       />
  </div>
  )
}

export default Todos;

