import React, { useContext, useState } from 'react';
import { Tabs, Tab, Button } from 'react-bootstrap';
import { AppContext } from '../../../../context/AppContext';
import { Link } from 'react-router-dom';

import './TestCasesTabs.css';

const TestCasesTabs = ({ testCases, results, runTests, running }) => {
    const { user } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('testcases');

    return (
        <>
            <Button
                onClick={() => runTests()}
                className="run-tests-button my-3"
                disabled={running}>
                Run Tests
            </Button>
            {
                !user ? <p className='ms-3 d-inline'><Link to={'/login'}>Login to Submit</Link></p> : (
                    <Button
                        onClick={() => runTests(true)}
                        className="run-tests-button ms-1 my-3"
                        disabled={running}>
                        Submit
                    </Button>
                )
            }
            <div className="testcases-tabs">
                <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} className="mb-3">
                    <Tab eventKey="testcases" title="Test Cases">
                        {testCases?.map((testCase, index) => (
                            <div key={index} className="testcase-content">
                                <div><strong>Input:</strong> {testCase.input}</div>
                                <div><strong>Output:</strong> {testCase.output}</div>
                                <div><strong>Explanation:</strong> {testCase.explanation}</div>
                                <br />
                            </div>
                        ))}
                    </Tab>
                    <Tab eventKey="results" title={running ? "Running Test..." : "Results"}>
                        {
                            results?.length === 0 && <i>Click <b>Run Tests</b> to see results</i>
                        }

                        {results?.map((result, index) => (
                            <div key={index} className={result.passed ? 'result passed' : 'result failed'}>
                                <div><strong>Input:</strong> {result.input}</div>
                                <div><strong>Expected:</strong> {result.expectedOutput}</div>
                                <div><strong>Received:</strong> {result.actualOutput}</div>
                                <div><strong>Explanation:</strong> {result.explanation}</div>
                                <div><strong>Result:</strong> {result.result}</div>
                                <br />
                            </div>
                        ))}
                    </Tab>
                </Tabs>
            </div>
        </>
    );
};

export default TestCasesTabs;
