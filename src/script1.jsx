/*import {taskMaker} from "./UndoneContainer/script";
import {doneTaskMaker} from "./DoneContainer/script";
import {deletedTaskMaker} from "./DeletedContainer/script";
import {deletedTaskList} from "./DeletedContainer/script";
import {toDoTaskList} from "./UndoneContainer/script";
import {doneTaskList} from "./DoneContainer/script";
import './toDo/styles.sass'
import './styles.css'
require('./index.html')


let logText = '';
let addTaskBtn = document.querySelector('.new-task__button')
let taskTextValue = document.querySelector('.new-task-text')
let taskDateDeadline = document.querySelector('.new-task-date')



let log = !localStorage.log ? [] : JSON.parse(localStorage.getItem('log'))


function dateFormat(date = new Date()) {
    return date ? date.toLocaleString() : new Date().toLocaleString()
}

//TASK CONSTRUCTOR
function Task(taskText, taskDeadline) {
    this.id = Date.now();
    this.taskText = taskText || '...';
    this.taskDeadline = dateFormat(taskDeadline);
    this.date = dateFormat();
    this.checked = false;
    this.color = '';
}

// UPDATE LOCALSTORAGE
function storageRefresh() {
    localStorage.setItem('toDoTaskList', JSON.stringify(toDoTaskList));
    localStorage.setItem('doneTaskList', JSON.stringify(doneTaskList));
    localStorage.setItem('deletedTaskList', JSON.stringify(deletedTaskList));
    localStorage.setItem('log', JSON.stringify(log))
}


// TASK REPLACER ON DELETE BLOCK AND DELETER
const deleter = function (id) {
    let deletedDate = Date.now()
    const currentItemIndex1 = toDoTaskList.findIndex(item => item.id === id)
    const currentItemIndex2 = doneTaskList.findIndex(item => item.id === id)
    const deletedItemIndex = deletedTaskList.findIndex(item => item.id === id)
    if (currentItemIndex1 !== -1) {
        toDoTaskList[currentItemIndex1].deletedDate = deletedDate;
        logText = `Task with id: ${toDoTaskList[currentItemIndex1].id} mark to delete at ${dateFormat()}`
        logger()
        deletedTaskList.push(toDoTaskList[currentItemIndex1]);
        toDoTaskList.splice(currentItemIndex1, 1)
    }
    if (currentItemIndex2 !== -1) {
        doneTaskList[currentItemIndex2].deletedDate = deletedDate;
        logText = `Task with id: ${doneTaskList[currentItemIndex2].id} mark to delete at ${dateFormat()}`
        logger()
        deletedTaskList.push(doneTaskList[currentItemIndex2]);
        doneTaskList.splice(currentItemIndex2, 1)
    }

    deletedTaskList.sort((a, b) => b.deletedDate - a.deletedDate)
    doneTaskMaker()
    taskMaker()
    deletedTaskMaker()
    storageRefresh()

    if (deletedItemIndex !== -1) {
        let confirmation = confirm('Are you right?')
        if (confirmation) {
            logText = `Task with id: ${deletedTaskList[deletedItemIndex].id} deleted at ${dateFormat()}`
            logger()
            deletedTaskList[deletedItemIndex].onDelete = true;
            const taskOnDelete = document.getElementById(deletedTaskList[deletedItemIndex].id)
            taskOnDelete.classList.toggle('deleted')
            setTimeout(() => {
                deletedTaskList = deletedTaskList.filter((item) => item.id !== id)
                deletedTaskList.sort((a, b) => b.deletedDate - a.deletedDate)
                deletedTaskMaker()
                storageRefresh()
            }, 300);
        }
    }
}


// Change TASK COLOR
function deadliner(array) {
    array.forEach(function (item) {
        let deadlineTime = Date.parse(item.taskDeadline)
        let currentTime = Date.parse(dateFormat())
        if (deadlineTime - currentTime < 3600000 && deadlineTime - currentTime > 0) {
            item.color = 'yellow'
            logText = `Deadline on task with id: ${item.id} will expired at ${item.taskDeadline}`
            logger()
        }
        if (deadlineTime - currentTime < 0) {
            item.color = 'red'
            logText = `Deadline on task with id: ${item.id} was expired at ${item.taskDeadline}`
            logger()
        }
    })
}


// TASK CREATOR



// CHANGE TASK STATUS



// FILTER ARRAYS
function arrayFilters() {
    toDoTaskList.forEach(function (item) {
        if (item.checked) {
            doneTaskList.push(item)
            toDoTaskList = toDoTaskList.filter((item) => !item.checked)
        }
    })
    doneTaskList.forEach(function (item) {
        if (!item.checked) {
            toDoTaskList.push(item)
            doneTaskList = doneTaskList.filter((item) => item.checked)
        }
    })
}


//SORTED FUNCTION
const ascSort = function () {
    toDoTaskList.sort((a, b) => Date.parse(a.taskDeadline) - Date.parse(b.taskDeadline))
    storageRefresh();
    taskMaker();
}
const descSort = function () {
    toDoTaskList.sort((a, b) => Date.parse(b.taskDeadline) - Date.parse(a.taskDeadline))
    storageRefresh();
    taskMaker();
}





function doneTask(id) {
    const currentItemIndex1 = toDoTaskList.findIndex(item => item.id === id)
    const currentItemIndex2 = doneTaskList.findIndex(item => item.id === id)
    if (currentItemIndex1 !== -1) {
        toDoTaskList[currentItemIndex1].checked = !toDoTaskList[currentItemIndex1].checked
        toDoTaskList[currentItemIndex1].color = '';
        //logText = `Task with id: ${id} moved to done at ${dateFormat()}`
        //logger()
    }
    if (currentItemIndex2 !== -1) {
        doneTaskList[currentItemIndex2].checked = !doneTaskList[currentItemIndex2].checked
        //logText = `Task with id: ${id} moved to undone at ${dateFormat()}`
        //logger()
    }
    arrayFilters()
    doneTaskMaker()
    taskMaker()
    storageRefresh()
}




//NEW TASK CREATOR
addTaskBtn.addEventListener('click', function () {
    toDoTaskList.push(new Task(taskTextValue.value, new Date(taskDateDeadline.value)))
    logText = `Created new task with id: ${Date.now()}, text: ${taskTextValue.value}, deadline Date: ${dateFormat(new Date(taskDateDeadline.value))} at ${dateFormat()}`
    storageRefresh();
    deadliner(toDoTaskList)
    taskMaker(toDoTaskList);
    logger()
    taskTextValue.value = '';
    taskDateDeadline.value = '';
})

// TASK REPLACER ON DELETE BLOCK AND DELETER


//CHANGE TEXT INPUT
document.addEventListener('click', function (event) {
    event.target.focus()
})
document.addEventListener('dblclick', textChanger)
document.addEventListener('keydown', function () {
    if (event.keyCode === 13) textChanger()
})

function textChanger() {
    if (event.target.className === 'task-text' && event.target.parentElement.parentElement.parentElement.className === 'undone-tasks__container') {
        let id = event.target.closest('.task').id;
        let targetIndex = toDoTaskList.findIndex(item => item.id === Number(id))
        event.target.style.display = 'none'
        let task = event.target.closest('.task')
        let input = document.createElement('input')
        input.value = toDoTaskList[targetIndex].taskText
        task.append(input)
        input.click()
            function doneChange () {
                toDoTaskList[targetIndex].taskText = input.value
                logText = `Text on task id =${toDoTaskList[targetIndex].id} was changed to ${toDoTaskList[targetIndex].taskText} at ${dateFormat()}`
                logger()
                if (toDoTaskList[targetIndex].taskText === '') toDoTaskList[targetIndex].taskText = '...'
                event.target.style.display = 'inline'
                taskMaker(toDoTaskList)
                storageRefresh()
            }
        input.addEventListener('blur', doneChange)
        input.addEventListener('keydown', function () {
            if (event.keyCode === 13) doneChange()
        })

    }
}
deadliner(toDoTaskList)
taskMaker()
doneTaskMaker()
deletedTaskMaker()

//KEYBOARD EVENTS





//LOGGER
function logger() {
    console.log(logText)
    log.push(logText)
}

//ACCORDEON OPEN
function openBlock() {
    const block = document.querySelector('.deleted__tasks__container')
    block.classList.toggle('extended')
}


// DRAG N DROP





//DOWNLOAD FUNCTIONS
function downloadTasks() {
    let a = document.createElement('a');
    a.download = 'tasks.txt';
    let tasks = new Blob(['Невыполненные задачи:', JSON.stringify(toDoTaskList), 'Выполненные задачи:', JSON.stringify(doneTaskList), 'Задачи на удаление:', JSON.stringify(deletedTaskList)], {type: 'text/plain'});
    a.href = URL.createObjectURL(tasks);
    a.click()
    URL.revokeObjectURL(a.href);
}

function downloadLogs() {
    let a = document.createElement('a');
    a.download = 'log.txt';
    let logs = new Blob([JSON.stringify(log)], {type: 'text/plain'});
    a.href = URL.createObjectURL(logs);
    a.click()
    URL.revokeObjectURL(a.href);
}

export {Task, doneTask}*/








