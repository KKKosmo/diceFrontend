import { useState } from 'react';
import useAuthContext from '../context/AuthContext';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const {register, error} = useAuthContext();

    const handleRegister = async (event) => {
        event.preventDefault();
        register({ name, email, password, password_confirmation });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header"><strong>Register</strong></div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                                    <input type="password" className="form-control" id="password_confirmation" value={password_confirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} />
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <button type="button" className="btn btn-primary" onClick={handleRegister}>Register</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
