import React, { useEffect, useState } from 'react';
import { Spinner, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { apiRoutes } from '../../../services/apiRoutes';
import API from '../../../services/lib/api';
import './Home.css';


const Home = () => {
    const [challenges, setChallenges] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchChallenges = async () => {
            try {
                const res = await API.get(apiRoutes.getChallenges);
                if (res.status === 200) {
                    setChallenges(res.data.data);
                }
            } catch (error) {
                console.error('Error fetching challenges:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenges();
    }, []);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                </Spinner>
            </Container>
        );
    }

    return (
        <Container>
            <h1 className="my-4">Coding Challenges</h1>
            <div className="challenge-list">
                {challenges?.map((challenge) => (
                    <div className="mb-3">
                        <Link to={`/challenges/${challenge.codingProblemId}`} className="challenge-title">
                            {challenge.title}
                        </Link>
                        <p className="challenge-description">
                            {challenge.description.length > 100 ? `${challenge.description.substring(0, 100)}...` : challenge.description}
                        </p>
                        <hr />
                    </div>
                ))}
            </div>
        </Container>
    );
};

export default Home;
