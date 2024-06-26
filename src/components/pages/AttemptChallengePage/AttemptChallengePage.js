import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import ChallengeDetails from '../../molecules/CodingAttempt/ChallengeDetails/ChallengeDetails';
import MonacoEditorComponent from '../../molecules/CodingAttempt/MonacoEditorComponent/MonacoEditorComponent';
import LanguageSelector from '../../molecules/CodingAttempt/LanguageSelector/LanguageSelector';
import TestCasesTabs from '../../molecules/CodingAttempt/TestCasesTabs/TestCasesTabs';
import { apiRoutes } from '../../../services/apiRoutes';
import API from '../../../services/lib/api';
import { getErrorMessage } from '../../../utils/helper';
import './AttemptChallengePage.css';


const AttemptChallengePage = ({ match }) => {
    const [challenge, setChallenge] = useState({});
    const [language, setLanguage] = useState('javascript');
    const [running, setRunning] = useState(false);
    const [code, setCode] = useState('');
    const [error, setError] = useState('');
    const [testCases, setTestCases] = useState([]);
    const [results, setTestResults] = useState([]);
    const [templates, setTemplates] = useState([]);

    const [loading, setLoading] = useState(true);

    const runTests = async (save) => {
        try {
            const { codingProblemId } = match.params;

            setError();
            setRunning(true)
            setTestResults([]);
            const { saveCodingSolution, runCodingSolution } = apiRoutes;
            const url = save ? saveCodingSolution : runCodingSolution;
            const res = await API.post(url, {
                codingProblemId,
                code,
                language
            });
            if (res.status === 201) {
                setRunning(false)
                setTestResults(res.data.data);
            }
        } catch (err) {
            const errMssg = getErrorMessage(err)
            setRunning(false)
            setError(errMssg);
        }
    }

    const handleEditor = (cp) => {
        setCode(cp)
    }

    const handleLangChange = (lang) => {
        setLanguage(lang);
        const template = templates.find((x) => x.language === lang)?.template;
        setCode(template);
    }

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const res = await API.get(apiRoutes.getChallengeById(match.params.codingProblemId));
                if (res.status === 200) {
                    const { examples, templates, solution } = res.data.data

                    setChallenge(res.data.data);
                    setTestCases(examples);
                    setTemplates(templates);

                    if(solution){
                        setLanguage(solution.language);
                        setCode(solution.code);
                    } else {
                        const template = templates.find((x) => x.language === "javascript")?.template;
                        setCode(template);
                    }

                }
            } catch (err) {
                const errMssg = getErrorMessage(err)
                setError(errMssg);
            } finally {
                setLoading(false);
            }
        };

        fetchChallenge();
    }, [match.params.codingProblemId]);

    if (loading) {
        return <div className="loader">Loading...</div>;
    }

    return (
        <Container>
            <div className="attempt-challenge-page">
                <Row>
                    <Col>
                        <ChallengeDetails challenge={challenge} />
                    </Col>
                    <Col>
                        <div className="code-editor-page">
                            <LanguageSelector language={language} setLanguage={handleLangChange} />
                            <MonacoEditorComponent
                                language={language}
                                onChange={handleEditor}
                                code={code}
                            />
                            {error && <p className="text-danger">{error}</p>}
                            <TestCasesTabs
                                testCases={testCases}
                                results={results}
                                runTests={runTests}
                                running={running}
                            />

                        </div>
                    </Col>
                </Row>
            </div>
        </Container>
    );
};

export default AttemptChallengePage;
