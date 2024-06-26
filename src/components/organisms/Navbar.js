import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import { eraseCookie } from '../../utils/cookies';

const Navbar = () => {
    const { user, setUser } = useContext(AppContext);
    const history = useHistory();

    const handleLogout = () => {
        eraseCookie('accessToken');
        setUser(null);
        history.push('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/">Coding Platform</Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ml-auto">
                        {user ? (
                            <>
                                {user.userType === 'ADMIN' && (
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/create-challenge">Create Challenge</Link>
                                    </li>
                                )}
                                <li className="nav-item">
                                    <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/signup">Signup</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
