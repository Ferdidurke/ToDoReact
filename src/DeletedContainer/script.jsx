import {createTask} from "../task/script";
import './styles.sass'

let deletedTaskList = !localStorage.deletedTaskList ? [] : JSON.parse(localStorage.getItem('deletedTaskList'))

function deletedTaskMaker() {
    let deletedTasks = document.querySelector('.deleted__tasks__container')
    deletedTasks.innerHTML = '';
    if (deletedTaskList.length > 0) {
        deletedTaskList.forEach(function (item) {
            deletedTasks.innerHTML += createTask(item);
        })
    }
}

export {deletedTaskMaker, deletedTaskList}