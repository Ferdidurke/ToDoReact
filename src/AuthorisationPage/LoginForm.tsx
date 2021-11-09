import React, {useState} from "react";
import {Button, CircularProgress, TextField} from "@mui/material";
import {userApi} from "../services/UserService";
import {useSelector} from "react-redux";
import {RootState} from "../store/redux-toolkit/store";
import {useHistory} from "react-router-dom";




export default function LoginForm () {
const history = useHistory()
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [login, { isLoading, isError, error } ] = userApi.useLoginUserMutation()
const { user } = useSelector((state: RootState) => state.auth)


const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.currentTarget.value)
}

const handleChangePassword = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.currentTarget.value)
}

const handleRegister = (): void => {
        history.push('/register')
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
                {

                isLoading ? (<div style={{
                    height: '300px',
                    display: 'flex',
                    justifyContent: 'center',
                    margin: '0 auto',
                    background: 'white',
                }}>
                    <CircularProgress />
                </div>) : (
                    <form className='login__form' onSubmit={submitLogin}>

                        <label>Введите e-mail:</label><TextField sx={{ backgroundColor: 'white' }} variant="filled" label='E-mail'   type='email'
                                                                 value={email}
                                                                 onChange={handleChangeEmail} required/>
                        <label>Введите пароль:</label><TextField sx={{ backgroundColor: 'white' }} variant="filled" label='Password'  type='password' required
                                                                 value={password}
                                                                 onChange={handleChangePassword}/>
                        {
                            isError ? (<p style={{ color: 'red' }}>{ (error as any)!.data.message }</p>) : null
                        }

                        <Button sx={{ width: '30%',
                            margin: '0 auto' }}
                                variant='contained'
                                type='submit'>Sign in</Button>
                        <br/>
                        <Button sx={{ width: '30%',
                            margin: '0 auto' }}
                                variant='contained'
                                onClick={handleRegister}>Sign up</Button>
                    </form>
                )

                }
            </div>
        </div>
    );
}