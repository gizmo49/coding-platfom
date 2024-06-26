import React from 'react';
import './ExampleList.css';

const ExampleList = ({ examples }) => {
    return (
        <div className="example-list">
            {examples?.map((example, index) => (
                <div key={index} className="example">
                    <h4>Example {index + 1}</h4>
                    <p><strong>Input:</strong> {example.input}</p>
                    <p><strong>Output:</strong> {example.output}</p>
                    <p><strong>Explanation:</strong> {example.explanation}</p>
                </div>
            ))}
        </div>
    );
};

export default ExampleList;
