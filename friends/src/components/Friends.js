import React, { useState, useEffect } from 'react';
import { axiosWithAuth } from '../utils/axiosWithAuth';
import Loader from 'react-loader-spinner';

const initialFormValues = {
    name: '',
    age: '',
    email: ''
}

const Friends = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [friends, setFriends] = useState([]);
    const [formValues, setFormValues] = useState(initialFormValues);

    const addFriend = friend => {
        axiosWithAuth()
            .post('/api/friends', friend)
            .then(res => {
                setFriends(res.data);
            })
            .catch(err => {
                setError(err.response.data.error)
            });
    }
    
    const handleInputChange = e => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        addFriend(formValues);
        setFormValues(initialFormValues);
    }

    useEffect(() => {
        setIsLoading(true);
        axiosWithAuth()
            .get('/api/friends')
            .then(res => {
                setIsLoading(false);
                setError('');
                setFriends(res.data);
            })
            .catch(err => {
                setIsLoading(false);
                setError(err.response.data.error);
            })
    }, [])

    return (
        <div className='friends-container'>
            <h1>Friends</h1>
            {error && <p className='error'>{error}</p>}
            <div className='friends-list'>
                {isLoading ? <Loader type="ThreeDots" color='#000'/> : friends.map(friend => {
                    return (
                        <div className='friend' key={friend.id}>
                            <p>{friend.name}</p>
                            <p>Age: {friend.age}</p>
                            <p>{friend.email}</p>
                        </div>
                    )
                })}
            </div>
            <form onSubmit={handleSubmit}>
                <h2>Add a friend</h2>
                <label htmlFor='name'>Name:&nbsp;</label>
                <input 
                    type='text'
                    id='name'
                    name='name'
                    value={formValues.name}
                    onChange={handleInputChange}
                />
                <br/><br/>
                <label htmlFor='age'>Age:&nbsp;</label>
                <input 
                    type='number'
                    id='age'
                    name='age'
                    value={formValues.age}
                    onChange={handleInputChange}
                />
                <br/><br/>
                <label htmlFor='email'>Email:&nbsp;</label>
                <input 
                    type='email'
                    id='email'
                    name='email'
                    value={formValues.email}
                    onChange={handleInputChange}
                />
                <br/><br/>
                <button>Add friend</button>
            </form>
        </div>
    )
}

export default Friends;