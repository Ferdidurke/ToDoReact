import React, {ReactElement, useState} from "react";
import './styles.sass'
import {Button, ButtonGroup} from "@mui/material";
import UserCard from "../../Blog/UserCard";


function ToDoHeader () : ReactElement {


    const downloadFiles = (key: string, name: string): void => {
        const tasks: any = JSON.parse(localStorage.getItem(`ReduxStorage`)!)
        const a = document.createElement('a');
        a.download = `${name}.txt`;
        const downloadFile = JSON.stringify(tasks[key])
        const blob = new Blob([downloadFile], {type: 'text/plain'})
        a.href = URL.createObjectURL(blob);
        a.click()
        URL.revokeObjectURL(a.href);
    }


    const handleDownloadLogsButton = (): void => downloadFiles('logs', 'logs')
    const handleDownloadTasksListButton = (): void => downloadFiles('tasks', 'tasks')


    return (
        <>
            <div className='header__user-container'>
                <div className="application">
                    <ButtonGroup sx={{height: 35,
                                        marginTop: '10px'}}>
                        <Button variant='contained' size='small' data-testid = "downloadBtn" className="button download-button" onClick={handleDownloadLogsButton}>
                            DOWNLOAD LOGS
                        </Button>
                        <Button variant='contained' size='small' className="button download-button" onClick={handleDownloadTasksListButton}>
                            DOWNLOAD TASKS
                        </Button>
                    </ButtonGroup>
                </div>
                <UserCard/>
            </div>

        </>
    )
}



export {ToDoHeader}