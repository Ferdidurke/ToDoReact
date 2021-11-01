import React, {useState} from "react";
import Header from "../../Header";
import {Button, TextField} from "@mui/material";

export default function LoginForm () {

const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
}

const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
}

const submitLogin = (event: any) => {
        event.preventDefault()
    const user = {
            email: email,
            password: password
    }
        setEmail('')
        setPassword('')
}


    return (
        <div>
            <Header/>
            <div className='login-form__container'>
                <form className='login__form' onSubmit={submitLogin}>

                    <label>Введите e-mail:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='E-mail'   type='email'
                                                             value={email}
                                                             onChange={handleChangeEmail} required/>
                    <label>Введите пароль:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='Password'  type='password' required
                                                             value={password}
                                                             onChange={handleChangePassword}/>
                    <Button variant='contained' type='submit'>Вход</Button>
                </form>
            </div>
        </div>
    );
}