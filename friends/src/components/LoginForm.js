import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const initialFormValues = {
    username: '',
    password: ''
}

const LoginForm = () => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();

    const handleChange = e => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const login = e => {
        e.preventDefault();
        setIsLoading(true);
        axios
            .post('http://localhost:5000/api/login', formValues)
            .then(res => {
                setIsLoading(false);
                setError('');
                localStorage.setItem('token', res.data.payload);
                history.push('/friends');
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.response.data.error)
            })
    }
    
    return (
        <div className='login-form-container'>
            <h1>Login</h1>
            <form onSubmit={login}>
                <label htmlFor='username'>Username:</label>&nbsp;
                <input 
                    type='text'
                    id='username'
                    name='username'
                    onChange={handleChange}
                    value={formValues.username}
                />
                <br /><br />
                <label htmlFor='password'>Password:</label>&nbsp;
                <input 
                    type='password'
                    id='password'
                    name='password'
                    onChange={handleChange}
                    value={formValues.password}
                />
                <br /><br />
                <button>{isLoading ? 'Loading...' : 'Login'}</button>
            </form>
            {error && <p className='error'>{error}</p>}
        </div>
    )
};

export default LoginForm;