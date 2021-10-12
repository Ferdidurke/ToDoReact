import {doneTaskMaker} from "../DoneContainer/script";
import {taskMaker} from "../UndoneContainer/script";
import {dragEnabler} from "../task/script";
import {doneTask} from "../DoneContainer/script";
import {doneTaskList} from "../DoneContainer/script";
import {toDoTaskList} from "../UndoneContainer/script";


const doneTaskContainer = document.querySelector('.done-tasks');
const unDoneTaskContainer = document.querySelector('.undone-tasks');
const containers = [doneTaskContainer, unDoneTaskContainer]

containers.forEach(container => {
    container.addEventListener('dragenter', function (event) {
        event.preventDefault()
    })
    container.addEventListener('dragover', function (event) {
        event.preventDefault()
    })
})


unDoneTaskContainer.addEventListener('drop', function (event) {
    let id = Number(event.dataTransfer.getData('id'))
    let targetIndex = doneTaskList.findIndex(item => item.id === Number(id))
    let targetItem = doneTaskList[targetIndex] || undefined
    if (targetItem && targetItem.checked) {
        doneTask(id)
        storageRefresh()
        doneTaskMaker()
        taskMaker()
        dragEnabler()
    }
})

doneTaskContainer.addEventListener('drop', function (event){
    let id = Number(event.dataTransfer.getData('id'))
    let targetIndex = toDoTaskList.findIndex(item => item.id === Number(id))
    let targetItem = toDoTaskList[targetIndex] || undefined
    if (targetItem && !targetItem.checked) {
        doneTask(id)
        storageRefresh()
        doneTaskMaker()
        taskMaker()
        dragEnabler()
    }
})