import { useState } from 'react';
import './App.css';
import { Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Login from './components/Login';
import Register from './components/Register';
import useAuthContext from './context/AuthContext';
import PostFeed from './components/PostFeed';
import Profile from './components/Profile';

function App() {
  const { user, logout } = useAuthContext();
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleNavItemClick = () => {
    setIsCollapsed(true);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/" onClick={handleNavItemClick}>Dice</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded={!isCollapsed ? "true" : "false"} aria-label="Toggle navigation" onClick={() => setIsCollapsed(!isCollapsed)}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isCollapsed ? "" : "show"}`} id="navbarNav">
            <ul className="navbar-nav" onClick={handleNavItemClick}>
              {user ?
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/PostFeed">Post Feed</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Profile">Profile</Link>
                  </li>
                  <li className="nav-item d-flex justify-content-center">
                    <button className="nav-link" onClick={logout} style={{ color: 'red'}}>
                      Logout
                    </button>
                  </li>
                </>
                : <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/Register">Register</Link>
                  </li>
                </>}
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<PostFeed />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/PostFeed" element={<PostFeed />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
