import React, {useState, useEffect} from 'react';

import './styles.css';
import {ToDoHeaderRender} from "./Header/script";
import {DeletedTasksRender} from "./DeletedContainer/script";
import {UndoneTasksRender} from "./UndoneContainer/script";
import {DoneTasksRender} from "./DoneContainer/script";


function App() {
const [toDoTaskList, setToDoTaskList]:any = useState(JSON.parse(localStorage.getItem('toDoTaskList')!) || [])
const [log, setLog]: any = useState(JSON.parse(localStorage.getItem('log')!) || '')


useEffect(() => {
        localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
}, [toDoTaskList]);

useEffect(() => {
        localStorage.setItem('log', JSON.stringify(log));
}, [log]);


const logging = (text: string) => {
    setLog([...log, text])
    console.log(text)

}

const createTask = (task: any) => {
        setToDoTaskList([...toDoTaskList, task])

}

const ascSort = function () {
        toDoTaskList.sort((a: {taskDeadline: string}, b: {taskDeadline: string}) => Date.parse((a.taskDeadline)) - Date.parse(b.taskDeadline))
        setToDoTaskList([...toDoTaskList])

}
const descSort = function () {
        toDoTaskList.sort((a: {taskDeadline: string}, b: {taskDeadline: string}) => Date.parse(b.taskDeadline) - Date.parse(a.taskDeadline))
        setToDoTaskList([...toDoTaskList])
}


const changeTaskStatus = (id: number) => {
    const index = toDoTaskList.findIndex((item: {id: number} ) => item.id === id)
    console.log(index)
    if (index !== -1)
        if (!toDoTaskList[index].checked) {
            logging(`Task with id:${toDoTaskList[index].id} moved to done at ${new Date().toLocaleString()}`)
        } else {
            logging(`Task with id:${toDoTaskList[index].id} moved to do at ${new Date().toLocaleString()}`)
        }
        toDoTaskList[index].checked = !toDoTaskList[index].checked
        setToDoTaskList([...toDoTaskList])
}

const markToDelete = (id: number) => {
    const index: number = toDoTaskList.findIndex((item: {id: number}) => item.id === id)
    if (index !== -1 && toDoTaskList[index].markToDelete === false) {
        toDoTaskList[index].markToDelete = true
        toDoTaskList[index].deletedDate = new Date().toLocaleString()
        toDoTaskList.sort((a: {deletedDate: string}, b: {deletedDate: string}) => Date.parse(b.deletedDate) - Date.parse(a.deletedDate))
        setToDoTaskList([...toDoTaskList])
        logging(`Task with id:${toDoTaskList[index].id} replace in deleted container at ${new Date().toLocaleString()}`)
        return
    }

    if (index !== -1 && toDoTaskList[index].markToDelete === true) {
        const confirmation: boolean = window.confirm('Are you right?')
        if (confirmation) {
            const taskOnDelete: any = document.getElementById(toDoTaskList[index].id)
            taskOnDelete.classList.toggle('deleted')
            setTimeout (() => {
                logging(`Task with id:${toDoTaskList[index].id} deleted at ${new Date().toLocaleString()}`)
                toDoTaskList.splice(index, 1)
                setToDoTaskList([...toDoTaskList])
            }, 300)

        }
    }
}

const changeInput = (obj: any) => {
    console.log(obj)
    const index: number = toDoTaskList.findIndex((item: {id: number}) => item.id === Number(obj.id))
    if (index !== -1) {
        toDoTaskList[index].taskText = obj.text
        setToDoTaskList([...toDoTaskList])
    }

}

const handlerDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
}

const handlerDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
}

const handlerDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const id: number = Number(event.dataTransfer.getData('id'))
    const index: number = toDoTaskList.findIndex((item: {id: number}) => item.id === id)
    if (toDoTaskList[index].checked && event.currentTarget.className==='undone-tasks__container')
        {
        changeTaskStatus(id)
        }
    if (!toDoTaskList[index].checked && event.currentTarget.className==='done-tasks__container')
        {
        changeTaskStatus(id)
        }

}

/*const deadliner = () => {
    toDoTaskList.map((item: any) => {
        const deadlineDate = Date.parse(item.taskDeadline)
        const currentDate = Date.parse(new Date().toString())
        if (deadlineDate - currentDate < 3600000 && deadlineDate - currentDate > 0) {
            item.color = 'yellow'
        }
        if (deadlineDate - currentDate < 0) {
            item.color = 'red'

        }
        setToDoTaskList([...toDoTaskList])
    })
}*/




  return (
  <div className='todo__container'>
    <ToDoHeaderRender toDoList={toDoTaskList}
                      newTask={createTask}
                      logging={logging}/>
      <div className="todo__tasks">
          <UndoneTasksRender toDoList={toDoTaskList}
                             changeStatus={changeTaskStatus}
                             markToDelete={markToDelete}
                             ascSort={ascSort}
                             descSort={descSort}
                             changeInput={changeInput}
                             handlerDragEnter={handlerDragEnter}
                             handlerDragOver={handlerDragOver}
                             handlerDrop={handlerDrop}
                             />
          <DoneTasksRender doneList={toDoTaskList}
                           changeStatus={changeTaskStatus}
                           markToDelete={markToDelete}
                           handlerDragEnter={handlerDragEnter}
                           handlerDragOver={handlerDragOver}
                           handlerDrop={handlerDrop}
                           />
      </div>
    <DeletedTasksRender deletedList={toDoTaskList}
                        markToDelete={markToDelete}/>
  </div>
  )
}

export default App;

