import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { setCookie } from '../../utils/cookies';
import { getErrorMessage } from '../../utils/helper';
import LoginForm from '../molecules/LoginForm';
import { AppContext } from '../../context/AppContext';
import { apiRoutes } from '../../services/apiRoutes';
import API from '../../services/lib/api';

const LoginPage = () => {
    const history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AppContext);

    const handleLogin = async (credentials) => {
        try {
            setError();
            setLoading(true);

            const url = await apiRoutes.login;
            const res = await API.post(url, { ...credentials });
            if (res.status === 201) {
                const { user, token: { accessToken, expiresIn } } = res.data.data;
                setCookie('accessToken', accessToken, expiresIn);
                setUser(user);
                history.push('/');
            }

        } catch (err) {
            const errMssg = getErrorMessage(err);
            setError(errMssg);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="col-md-6">
                <h2 className='my-3'>Login</h2>
                {error && <p className="text-danger">{error}</p>}
                <LoginForm onLogin={handleLogin} isLoading={loading} />
            </div>
        </div>
    );
};

export default LoginPage;
