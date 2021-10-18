import React, {useState, useEffect, ReactElement} from 'react';

import './styles.css';
import {ToDoHeader} from "./Header/script";
import {DeletedTasks} from "./DeletedContainer/script";
import {UndoneTasks} from "./UndoneContainer/script";
import {DoneTasks} from "./DoneContainer/script";
import {ITask} from "./task/script";

export interface AppProps {
    toDoTaskList: Array<ITask> | []
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
const [toDoTaskList, setToDoTaskList] = useState<Array<any>>(JSON.parse(localStorage.getItem('toDoTaskList')!) || [])
const [log, setLog] = useState(JSON.parse(localStorage.getItem('log')!) || '')


useEffect(() => {
        localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
}, [toDoTaskList]);

useEffect(() => {
        localStorage.setItem('log', JSON.stringify(log));
}, [log]);


const logging = (text: string): void => {
    setLog([...log, text])
    console.log(text)

}

const createNewTask = (task: ITask): void => {
        setToDoTaskList([...toDoTaskList, task])
}

const sortTasksOnAsc = (): void => {
        toDoTaskList.sort((a: {taskDeadline: string}, b: {taskDeadline: string}) => Date.parse((a.taskDeadline)) - Date.parse(b.taskDeadline))
        setToDoTaskList([...toDoTaskList])

}
const sortTasksOnDesc = (): void => {
        toDoTaskList.sort((a: {taskDeadline: string}, b: {taskDeadline: string}) => Date.parse(b.taskDeadline) - Date.parse(a.taskDeadline))
        setToDoTaskList([...toDoTaskList])
}


const changeTaskStatus = (id: number): void => {
    const index: number = toDoTaskList.findIndex((item: {id: number} ) => item.id === id)
    if (index !== -1)
        if (!toDoTaskList[index].isChecked) {
            logging(`Task with id:${toDoTaskList[index].id} moved to done at ${new Date().toLocaleString()}`)
        } else {
            logging(`Task with id:${toDoTaskList[index].id} moved to do at ${new Date().toLocaleString()}`)
        }
        toDoTaskList[index].isChecked = !toDoTaskList[index].isChecked
        setToDoTaskList([...toDoTaskList])
}

const markTaskToDelete = (id: number): void => {
    const index: number = toDoTaskList.findIndex((item: {id: number}) => item.id === id)
    if (index !== -1 && toDoTaskList[index].isMarkToDelete === false) {
        toDoTaskList[index].isMarkToDelete = true
        toDoTaskList[index].deletedDate = new Date().toLocaleString()
        toDoTaskList.sort((a: {deletedDate: string}, b: {deletedDate: string}) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
        setToDoTaskList([...toDoTaskList])
        logging(`Task with id:${toDoTaskList[index].id} replace in deleted container at ${new Date().toLocaleString()}`)
        return
    }

    if (index !== -1 && toDoTaskList[index].isMarkToDelete === true) {
        const confirmation: boolean = window.confirm('Are you right?')
        if (confirmation) {
            const taskOnDelete: HTMLElement | null = document.getElementById(toDoTaskList[index].id)
            taskOnDelete!.classList.toggle('deleted')
            setTimeout (() => {
                logging(`Task with id:${toDoTaskList[index].id} deleted at ${new Date().toLocaleString()}`)
                toDoTaskList.splice(index, 1)
                setToDoTaskList([...toDoTaskList])
            }, 300)

        }
    }
}

const changeTaskText = (obj: {id: number | string, text: string}): void => {
    const index: number = toDoTaskList.findIndex((item: {id: number}) => item.id === Number(obj.id))
    if (index !== -1) {
        toDoTaskList[index].taskText = obj.text
        setToDoTaskList([...toDoTaskList])
    }

}

const handlerDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
}

const handlerDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
}

const handlerDrop = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
    const id = Number(event.dataTransfer.getData('id'))
    const index: number = toDoTaskList.findIndex((item: {id: number}) => item.id === id)
    if (toDoTaskList[index].isChecked && event.currentTarget.className==='undone-tasks__container')
        {
        changeTaskStatus(id)
        }
    if (!toDoTaskList[index].isChecked && event.currentTarget.className==='done-tasks__container')
        {
        changeTaskStatus(id)
        }

}



  return (
  <div className='todo__container'>
    <ToDoHeader toDoList={toDoTaskList}
                newTask={createNewTask}
                logging={logging}/>
      <div className="todo__tasks">
          <UndoneTasks toDoTaskList={toDoTaskList}
                       changeTaskStatus={changeTaskStatus}
                       markTaskToDelete={markTaskToDelete}
                       sortTasksOnAsc={sortTasksOnAsc}
                       sortTasksOnDesc={sortTasksOnDesc}
                       changeTaskText={changeTaskText}
                       handlerDragEnter={handlerDragEnter}
                       handlerDragOver={handlerDragOver}
                       handlerDrop={handlerDrop}
                             />
          <DoneTasks toDoTaskList={toDoTaskList}
                           changeTaskStatus={changeTaskStatus}
                           markTaskToDelete={markTaskToDelete}
                           handlerDragEnter={handlerDragEnter}
                           handlerDragOver={handlerDragOver}
                           handlerDrop={handlerDrop}
                           />
      </div>
    <DeletedTasks toDoTaskList={toDoTaskList}
                  markTaskToDelete={markTaskToDelete}/>
  </div>
  )
}

export default App;

