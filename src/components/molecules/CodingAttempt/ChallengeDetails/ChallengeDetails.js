import React from 'react';
import ExampleList from './ExampleList/ExampleList';
import './ChallengeDetails.css';

const ChallengeDetails = ({ challenge }) => {
    return (
        <div className="challenge-details">
            <h1>{challenge?.title}</h1>
            <p>{challenge?.description}</p>
            <h3>Constraints</h3>
            <ul>
                {challenge?.constraints?.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                ))}
            </ul>
            <h3>Examples</h3>
            <ExampleList examples={challenge?.examples} />
            <h3>Follow Up</h3>
            <ul>
                {challenge?.followUp?.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>
            <h3>Hints</h3>
            <ul>
                {challenge?.hints?.map((hint, index) => (
                    <li key={index}>{hint}</li>
                ))}
            </ul>
        </div>
    );
};

export default ChallengeDetails;
