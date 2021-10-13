import React from 'react';

import './styles.css';
import {TasksMainContainerRender} from "./toDo/TasksMainContainerRender";
import {ToDoHeaderRender} from "./Header/script";
import {DeletedTasksRender} from "./DeletedContainer/script";


function App() {

  return (
  <div className='todo__container'>
    <ToDoHeaderRender/>
    <TasksMainContainerRender/>
    <DeletedTasksRender/>
  </div>
  )
}

export default App;

