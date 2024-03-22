import { useState } from 'react';
import useAuthContext from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, error } = useAuthContext();
  
    const handleLogin = async (event) => {
        event.preventDefault();
        login({ email, password });
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-12">
                    <div className="card shadow-sm">
                        <div className="card-header"><strong>Login</strong></div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                                </div>
                                {error && <p className="text-danger">{error}</p>}
                                <button type="button" className="btn btn-primary btn-block" onClick={handleLogin}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
