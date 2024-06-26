import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { setCookie } from '../../utils/cookies';
import { AppContext } from '../../context/AppContext';
import { apiRoutes } from '../../services/apiRoutes';
import SignupForm from '../molecules/SignupForm';
import API from '../../services/lib/api';
import { getErrorMessage } from '../../utils/helper';

const SignupPage = () => {

    const history = useHistory();

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(AppContext);

    const handleSignup = async (userData) => {
        try {
            setError();
            setLoading(true);
            const formData = new FormData();
            for (const key in userData) {
                formData.append(key, userData[key]);
            }
            const url = apiRoutes.signup;
            const res = await API.post(url, formData);
            if (res.status === 201) {
                const newUser = res.data;
                setCookie('user', JSON.stringify(newUser), 1);
                setUser(newUser);
                history.push('/');
            }
        } catch (err) {
            const errMssg = getErrorMessage(err)
            setError(errMssg);
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <div className="col-md-6">
                <h2 className='my-3'>Signup</h2>
                {error && <p className="text-danger">{error}</p>}
                <SignupForm onSignup={handleSignup} isLoading={loading} />
            </div>
        </div>
    );
};

export default SignupPage;
