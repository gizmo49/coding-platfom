import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { apiRoutes } from '../../services/apiRoutes';
import { AppContext } from '../../context/AppContext';
import ChallengeForm from '../molecules/ChallengeForm/ChallengeForm';
import API from '../../services/lib/api';
import { getErrorMessage } from '../../utils/helper';

const CreateChallengePage = () => {
    const { user } = useContext(AppContext);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleCreateChallenge = async (challengeData) => {
        try {
            setError();
            setLoading(true);
            const url = apiRoutes.createChallenge;
            const res = await API.post(url, challengeData);
            if (res.status === 201) {
                history.push('/');
            }
        } catch (err) {
            const errMssg = getErrorMessage(err)
            setError(errMssg);
            setLoading(false);
        }
    };

    if (!user || user.userType !== 'ADMIN') {
        return <p>You do not have permission to view this page.</p>;
    }

    return (
        <Container>
            <h2 className='my-3'>Create New Challenge</h2>
            {error && <p className="text-danger">{error}</p>}
            <ChallengeForm onSubmit={handleCreateChallenge}  isLoading={loading} />
        </Container>
    );
};

export default CreateChallengePage;
