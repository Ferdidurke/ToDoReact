import React, {ReactElement} from 'react';
import './styles.sass';
import {ToDoHeader} from "./Header/script";
import {DeletedTasks} from "./DeletedContainer/script";
import {UndoneTasks} from "./UndoneContainer/script";
import {DoneTasks} from "./DoneContainer/script";
import Header from "../Header";
import {NewTaskForm} from "./NewTaskContainer";
import {todoApi} from "../services/TaskService";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/redux-toolkit/store";
import {logout} from "../store/redux-toolkit/reducers/authReducer";




export interface TodosProps {
    handlerDragEnter(event: React.DragEvent<HTMLDivElement>): void
    handlerDragOver(event: React.DragEvent<HTMLDivElement>): void
}




function Todos (): ReactElement {
    const dispatch = useDispatch()
    const { reqParams: params } = useSelector((state: RootState) => state.todo)

    const { error }: any = todoApi.useFetchTasksQuery(params, {
        refetchOnMountOrArgChange: true
    })

    if (error && error.status === 401) {
        console.log((error as any).status)
        dispatch(logout())
    }


const handlerDragEnter = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
}

const handlerDragOver = (event: React.DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
}




  return (
  <div className='todo__container'>
      <Header/>
          <ToDoHeader />
      <div className="todo__tasks">
          <UndoneTasks
                       handlerDragEnter={ handlerDragEnter }
                       handlerDragOver={ handlerDragOver }
          />

          <NewTaskForm/>

          <DoneTasks
                       handlerDragEnter={ handlerDragEnter }
                       handlerDragOver={ handlerDragOver }
                       />
      </div>

    <DeletedTasks
       />
  </div>
  )
}

export default Todos;

