import React, {useState} from "react";
import Header from "../../Header";
import {Button, TextField} from "@mui/material";
import {userApi} from "../../services/UserService";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/redux-toolkit/store";
import {logout} from "../../store/redux-toolkit/reducers/authReducer";
import {Link, useHistory} from "react-router-dom";
import RegistrationForm from "./RegistrationForm";


export default function LoginForm () {
const history = useHistory()
const [email, setEmail] = useState('')
const [register, setRegister] = useState(false)
const [password, setPassword] = useState('')
const [login] = userApi.useLoginUserMutation()
const { user, isLoading, isAuthenticated } = useSelector((state: RootState) => state.auth)


const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value)
}

const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value)
}

const handleRegister = (event: React.MouseEvent) => {
        setRegister(true)
}


const submitLogin = (event: any) => {
        event.preventDefault()
    const user = {
            email: email,
            password: password
    }
    login(user)
    setEmail('')
    setPassword('')
}


    return (
        <div>
            <div className='login-form__container'>
                <form className='login__form' onSubmit={submitLogin}>

                    <label>Введите e-mail:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='E-mail'   type='email'
                                                             value={email}
                                                             onChange={handleChangeEmail} required/>
                    <label>Введите пароль:</label><TextField sx={{backgroundColor: 'white'}} variant="filled" label='Password'  type='password' required
                                                             value={password}
                                                             onChange={handleChangePassword}/>
                    <Button variant='contained' type='submit'>Вход</Button>
                    <Button variant='contained' onClick={handleRegister}>Регистрация</Button>
                </form>
            </div>
            {
                register ? (<RegistrationForm/>) : null
            }
        </div>
    );
}