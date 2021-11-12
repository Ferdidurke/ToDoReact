import React, {ReactElement} from "react";
import './styles.sass'
import {Button, ButtonGroup} from "@mui/material";
import UserCard from "../../Blog/UserCard";
import {baseURL} from "../../services/TaskService";
import {useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";


function ToDoHeader () : ReactElement {
    const { token } = useSelector((state: RootState) => state.auth)
    const { id: userId } = useSelector( (state: RootState) => state.auth.user)

    const downloadFiles = async (key: string, name: string): Promise<void> => {
        fetch(`${ baseURL }api/todo/download/${name}/?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${ token as string }`
            }
        }).then(res => res.blob())
            .then(blob => {
                const a = document.createElement('a');
                a.download = `${name}.txt`;
                a.href = URL.createObjectURL(blob);
                a.click()
                a.remove()
                URL.revokeObjectURL(a.href);
            });


    }


    const handleDownloadLogsButton = (): Promise<void> => downloadFiles('logs', 'logs')
    const handleDownloadTasksListButton = (): Promise<void> => downloadFiles('tasks', 'tasks')


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