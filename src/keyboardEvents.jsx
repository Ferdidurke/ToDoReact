import {doneTask} from "../DoneContainer/script";

const tasksNavigate = document.getElementsByClassName('task');
let navigateIndex = 0;
tasksNavigate[navigateIndex] ? tasksNavigate[navigateIndex].focus() : '';
document.addEventListener('keydown', function (event) {
    event = event || window.event;
    if (event.target.className === 'task') {
        let id = Number(event.target.id);
        switch (event.keyCode) {
            case 37:
                if (navigateIndex > 0) {
                    tasksNavigate[--navigateIndex].focus();
                }
                break
            case 38:
                if (navigateIndex > 0) {
                    tasksNavigate[--navigateIndex].focus();
                }
                break
            case 39:
                if (navigateIndex < tasksNavigate.length) {
                    tasksNavigate[++navigateIndex].focus();
                }
                break;
            case 40:
                if (navigateIndex < tasksNavigate.length) {
                    tasksNavigate[++navigateIndex].focus();
                }
                break;
            case 46: {
                deleter(id)
            }
                break
        }
        if (event.shiftKey && event.keyCode === 39 && event.target.parentElement.className === 'undone-tasks__container') {
            doneTask(id)
        }
        if (event.shiftKey && event.keyCode === 37 && event.target.parentElement.className === 'done-tasks__container') {
            doneTask(id)
        }
        if (event.keyCode === 69) {
            event.target.childNodes[7].firstElementChild.click()
        }
    }
})