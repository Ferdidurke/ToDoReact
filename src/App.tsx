import React, {ReactElement} from 'react';
import {useDispatch} from 'react-redux'
import './styles.css';
import {ToDoHeader} from "./Header/script";
import {DeletedTasks} from "./DeletedContainer/script";
import {UndoneTasks} from "./UndoneContainer/script";
import {DoneTasks} from "./DoneContainer/script";
import {ITask} from "./task/script";
import {changeStatus} from "./store/actions";
import {useSelector} from "react-redux";
import {RootState} from "./store/store";

export interface AppProps {
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

function App (): ReactElement {
    const { tasks } = useSelector((state:RootState) => state);
    const dispatch = useDispatch()



// const changeTaskStatus = (id: number): void => {
//     const index: number = toDoTaskList.findIndex((item: {id: number} ) => item.id === id)
//     if (index !== -1)
//         if (!toDoTaskList[index].isChecked) {
//             logging(`Task with id:${toDoTaskList[index].id} moved to done at ${new Date().toLocaleString()}`)
//         } else {
//             logging(`Task with id:${toDoTaskList[index].id} moved to do at ${new Date().toLocaleString()}`)
//         }
//         toDoTaskList[index].isChecked = !toDoTaskList[index].isChecked
//         setToDoTaskList([...toDoTaskList])
// }

//const markTaskToDelete = (id: number): void => {
    // const index: number = toDoTaskList.findIndex((item: {id: number}) => item.id === id)
    // if (index !== -1 && toDoTaskList[index].isMarkToDelete === false) {
    //     toDoTaskList[index].isMarkToDelete = true
    //     toDoTaskList[index].deletedDate = new Date().toLocaleString()
    //     toDoTaskList.sort((a: {deletedDate: string}, b: {deletedDate: string}) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
    //     setToDoTaskList([...toDoTaskList])
    //     logging(`Task with id:${toDoTaskList[index].id} replace in deleted container at ${new Date().toLocaleString()}`)
    //     return
    // }
    //
    // if (index !== -1 && toDoTaskList[index].isMarkToDelete === true) {
    //     const confirmation: boolean = window.confirm('Are you right?')
    //     if (confirmation) {
    //         const taskOnDelete: HTMLElement | null = document.getElementById(toDoTaskList[index].id)
    //         taskOnDelete!.classList.toggle('deleted')
    //         setTimeout (() => {
    //             logging(`Task with id:${toDoTaskList[index].id} deleted at ${new Date().toLocaleString()}`)
    //             toDoTaskList.splice(index, 1)
    //             setToDoTaskList([...toDoTaskList])
    //         }, 300)
    //
    //     }
    // }
//}



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
    <ToDoHeader
                />
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

export default App;

