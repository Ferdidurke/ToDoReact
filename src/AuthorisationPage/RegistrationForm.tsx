import React, {ReactElement, useState} from 'react';
import './styles.sass'
import {Button, CircularProgress, TextField} from "@mui/material";
import {IUserRegister, userApi} from "../services/UserService";
import Header from "../Header";
import {useHistory} from "react-router-dom";




function RegistrationForm(): ReactElement {
    const [userFirstName, setUserFirstName] = useState('')
    const [userLastName, setUserLastName] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [password, setPassword] = useState('')
    const [registerNewUser, { isLoading, isSuccess } ] = userApi.useRegisterUserMutation()
    const history = useHistory()

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

    const submitRegister = (event: React.FormEvent) => {
        event.preventDefault()
        const user: IUserRegister = {
            firstName: userFirstName,
            lastName: userLastName,
            email: userEmail,
            password: password
        }
        setUserFirstName('')
        setUserLastName('')
        setUserEmail('')
        setPassword('')
        registerNewUser(user)
    }

    if (isSuccess) {
        alert('Register Success!')
        history.push('/main')
    }

    return (
        <div>
            <Header/>

                    <div className='registration-form__container'>
                        {
                     isLoading ? (<div style={{
                             height: '300px',
                             display: 'flex',
                             justifyContent: 'center',
                             margin: '0 auto',
                             background: 'white',
                              }}>
                             <CircularProgress />
                         </div>) :
                        (<form className='registration__form' onSubmit={ submitRegister }>
                        <label>Enter your first name:</label><TextField sx={{ backgroundColor: 'white' }}
                                                                        variant="filled"
                                                                        label='Firstname'
                                                                        required
                                                                        inputProps={{ 'data-testid': 'registration-first__name' }}
                                                                        value={ userFirstName }
                                                                        onChange={ handleChangeUserFirstName }/>
                        <label>Enter your last name:</label><TextField sx={{ backgroundColor: 'white' }}
                                                                       variant="filled"
                                                                       label='Lastname'
                                                                       required
                                                                       inputProps={{ 'data-testid': 'registration-last__name' }}
                                                                       value={ userLastName }
                                                                       onChange={ handleChangeUserLastName }/>
                        <label>Enter your e-mail:</label><TextField sx={{ backgroundColor: 'white' }}
                                                                    variant="filled"
                                                                    label='E-mail'
                                                                    type='email'
                                                                    inputProps={{ 'data-testid': 'registration-email' }}
                                                                    value={ userEmail }
                                                                    onChange={ handleChangeUserEmail } required/>
                        <label>Enter your password:</label><TextField sx={{ backgroundColor: 'white' }}
                                                                      variant="filled"
                                                                      label='Password'
                                                                      type='password' required
                                                                      value={ password }
                                                                      onChange={ handleChangePassword }/>
                        <Button variant='contained' type='submit'>Sign Up!</Button>
                    </form>)
                    }
                </div>




        </div>
    );
}

export default RegistrationForm;