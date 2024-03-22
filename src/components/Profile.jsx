import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api/axios';
import useAuthContext from '../context/AuthContext';

function Profile() {
    const { user, getUser } = useAuthContext();
    const [editable, setEditable] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');

    useEffect(() => {
        if (!user) {
            getUser();
        } else {
            setName(user.name);
            setEmail(user.email);
            setAge(user.age ? user.age.toString() : '');
            setGender(user.gender || '');
        }
    }, [user]);

    const handleUpdateProfile = async () => {
        try {
            await axios.put('/api/user', { name, email, age, gender });
            getUser();
            setEditable(false);
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="container mt-5">
            {user ? (
                <div>
                    <h1 className="mb-4">Profile</h1>
                    {editable ? (
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name:</label>
                                <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">Age:</label>
                                <input type="text" className="form-control" id="age" value={age} onChange={(e) => setAge(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="gender" className="form-label">Gender:</label>
                                <select className="form-control" id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            <div className="d-flex">
                                <button type="button" className="btn btn-primary me-2" onClick={handleUpdateProfile}>Save</button>
                                <button type="button" className="btn btn-secondary" onClick={() => setEditable(false)}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {name}</p>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Age:</strong> {age}</p>
                            <p><strong>Gender:</strong> {gender}</p>
                            <button type="button" className="btn btn-primary" onClick={() => setEditable(true)}>Edit</button>
                        </div>
                    )}
                </div>
            ) : (
                <>
                    <Link className="btn btn-primary me-2" to="/Login">Login</Link>
                    <Link className="btn btn-primary" to="/Register">Register</Link>
                </>
            )}
        </div>
    );
}

export default Profile;
