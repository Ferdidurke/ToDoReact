import React, {ReactElement} from 'react';
import {useDispatch} from 'react-redux'
import './styles.sass';
import {ToDoHeader} from "./Header/script";
import {DeletedTasks} from "./DeletedContainer/script";
import {UndoneTasks} from "./UndoneContainer/script";
import {DoneTasks} from "./DoneContainer/script";
import {ITask} from "./task/script";
import {changeStatus} from "../store/redux-toolkit/reducers/todoReducer";
import {useSelector} from "react-redux";
import {RootState} from "../store/redux-toolkit/store";
import Header from "../Header";


export interface TodosProps {
    logging(text: string): void
    createNewTask(task: ITask): void
    sortTasksOnAsc(): void
    sortTasksOnDesc(): void
    changeTaskStatus(id: number): void
    markTaskToDelete(id: number): void
    changeTaskText (obj: {id: number | string, text: string}): void
    handlerDragEnter(event: React.DragEvent<HTMLDivElement>): void
    handlerDragOver(event: React.DragEvent<HTMLDivElement>): void
    handlerDrop(event: React.DragEvent<HTMLDivElement>): void
}

function Todos (): ReactElement {
    const { todo: {tasks} } = useSelector((state:RootState) => state);
    const dispatch = useDispatch()


const handlerDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
}

const handlerDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
}

const handlerDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    const id = Number(event.dataTransfer.getData('id'))
    const index: number = tasks.findIndex((item: {id: number}) => item.id === id)
    if (tasks[index].isChecked && event.currentTarget.className==='undone-tasks__container')
        {
        dispatch(changeStatus(id))
        }
    if (!tasks[index].isChecked && event.currentTarget.className==='done-tasks__container')
        {
        dispatch(changeStatus(id))
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
          <DoneTasks
                       handlerDragEnter={handlerDragEnter}
                       handlerDragOver={handlerDragOver}
                       handlerDrop={handlerDrop}
                       />
      </div>
    <DeletedTasks />
  </div>
  )
}

export default Todos;

