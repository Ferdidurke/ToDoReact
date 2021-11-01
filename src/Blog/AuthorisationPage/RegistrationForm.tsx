import React, {useState} from 'react';
import './styles.sass'

import {Button, TextField} from "@mui/material";
import Header from "../../Header";
import {userApi} from "../../services/UserService";

function RegistrationForm() {
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerNewUser] = userApi.useRegisterUserMutation()

    const handleChangeUserFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserFirstName(event.currentTarget.value)
    }

    const handleChangeUserLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserLastName(event.currentTarget.value)
    }

    const handleChangeUserEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserEmail(event.currentTarget.value)
    }

    const handleChangePassword= (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setPassword(event.currentTarget.value)
    }

    const submitRegister = (event: any) => {
        event.preventDefault()
        const user = {
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            password: password
        }
        setUserFirstName('')
        setUserLastName('')
        setUserEmail('')
        setPassword('')
        console.log(user)
        registerNewUser(user)
    }

    return (
        <div>
        <Header/>
            <div className='registration-form__container'>
                <form className='registration__form' onSubmit={submitRegister}>
                    <label>Введите имя:</label><TextField inputProps={{'data-testid': 'registration-first__name'}}  sx={{backgroundColor: 'white'}} variant="filled" label='Имя' required
                                                          value={userFirstName}
                                                          onChange={handleChangeUserFirstName}/>
                    <label>Введите фамилию:</label><TextField inputProps={{'data-testid': 'registration-last__name'}}  sx={{backgroundColor: 'white'}} variant="filled" label='Фамилия' required
                                                                value={userLastName}
                                                                onChange={handleChangeUserLastName}/>
                    <label>Введите e-mail:</label><TextField inputProps={{'data-testid': 'registration-email'}} sx={{backgroundColor: 'white'}} variant="filled" label='E-mail'   type='email'
                                                             value={userEmail}
                                                             onChange={handleChangeUserEmail} required/>
                    <label>Введите пароль:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='Password' type='password' required
                                                   value={password}
                                                   onChange={handleChangePassword}/>
                    <Button variant='contained' type='submit'>Регистрация</Button>
                </form>
            </div>
        </div>
    );
}

export default RegistrationForm;