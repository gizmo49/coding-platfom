import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import "./ChallengeForm.css";

const ChallengeForm = ({ onSubmit, initialData }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        examples: [{ input: '', output: '', explanation: '' }],
        constraints: [''],
        followUp: [''],
        hints: [''],
        templates: [{ language: '', template: '' }],
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleArrayChange = (name, index, field, value) => {
        setFormData(prev => {
            const updatedArray = [...prev[name]];
            if (field) {
                updatedArray[index][field] = value;
            } else {
                updatedArray[index] = value;
            }
            return {
                ...prev,
                [name]: updatedArray,
            };
        });
    };

    const handleAddField = (name, fieldObject = '') => {
        setFormData(prev => ({
            ...prev,
            [name]: [...prev[name], fieldObject !== "" ? fieldObject : ''],
        }));
    };

    const handleRemoveField = (name, index) => {
        setFormData(prev => {
            const updatedArray = prev[name].filter((_, i) => i !== index);
            return {
                ...prev,
                [name]: updatedArray,
            };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <Form onSubmit={handleSubmit} className="challenge-form">
            <Form.Group controlId="formTitle" className='mb-3'>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter challenge title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formDescription" className='mb-3'>
                <Form.Label>Description</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter challenge description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            {formData.examples.map((example, index) => (
                <div key={index} className="mb-3">
                    <h6 className="mb-3">Example {index + 1}</h6>
                    <Form.Group controlId={`formExampleInput${index}`} className="mb-3">
                        <Form.Label>Input</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={`input`}
                                    value={example.input}
                                    onChange={(e) => handleArrayChange('examples', index, 'input', e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId={`formExampleOutput${index}`} className="mb-3">
                        <Form.Label>Output</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={`output`}
                                    value={example.output}
                                    onChange={(e) => handleArrayChange('examples', index, 'output', e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId={`formExampleExplanation${index}`} className="mb-3">
                        <Form.Label>Explanation</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={`explanation`}
                                    value={example.explanation}
                                    onChange={(e) => handleArrayChange('examples', index, 'explanation', e.target.value)}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant="danger" size="sm" onClick={() => handleRemoveField('examples', index)}>Delete</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </div>
            ))}

            <Button className='mb-2' variant="secondary" size="sm" onClick={() => handleAddField('examples', { input: '', output: '', explanation: '' })}>Add Example</Button>

            {formData.constraints.map((constraint, index) => (
                <Form.Group key={index} controlId={`formConstraint${index}`} className='mb-3'>
                    <Form.Label>Constraint {index + 1}</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder={`Enter constraint ${index + 1}`}
                                value={constraint}
                                onChange={(e) => handleArrayChange('constraints', index, null, e.target.value)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button variant="danger" size="sm" onClick={() => handleRemoveField('constraints', index)}>Delete</Button>
                        </Col>
                    </Row>
                </Form.Group>
            ))}

            <Button className='mb-2' variant="secondary" size="sm" onClick={() => handleAddField('constraints')}>Add Constraint</Button>

            {formData.followUp.map((item, index) => (
                <Form.Group key={index} controlId={`formFollowUp${index}`} className='mb-3'>
                    <Form.Label>Follow Up {index + 1}</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder={`Enter follow up ${index + 1}`}
                                value={item}
                                onChange={(e) => handleArrayChange('followUp', index, null, e.target.value)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button variant="danger" size="sm" onClick={() => handleRemoveField('followUp', index)}>Delete</Button>
                        </Col>
                    </Row>
                </Form.Group>
            ))}
            <Button className='mb-2' variant="secondary" size="sm" onClick={() => handleAddField('followUp')}>Add Follow Up</Button>

            {formData.hints.map((hint, index) => (
                <Form.Group key={index} controlId={`formHint${index}`} className='mb-3'>
                    <Form.Label>Hint {index + 1}</Form.Label>
                    <Row>
                        <Col>
                            <Form.Control
                                type="text"
                                placeholder={`Enter hint ${index + 1}`}
                                value={hint}
                                onChange={(e) => handleArrayChange('hints', index, null, e.target.value)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button variant="danger" size="sm" onClick={() => handleRemoveField('hints', index)}>Delete</Button>
                        </Col>
                    </Row>
                </Form.Group>
            ))}
            <Button className='mb-2' variant="secondary" size="sm" onClick={() => handleAddField('hints')}>Add Hint</Button>

            {formData.templates.map((template, index) => (
                <div key={index} className="mb-3">
                    <h6 className="mb-3">Template {index + 1}</h6>
                    <Form.Group controlId={`formTemplateLanguage${index}`} className="mb-3">
                        <Form.Label>Language</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    type="text"
                                    placeholder={`Language`}
                                    value={template.language}
                                    onChange={(e) => handleArrayChange('templates', index, 'language', e.target.value)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                    <Form.Group controlId={`formTemplateCode${index}`} className="mb-3">
                        <Form.Label>Template</Form.Label>
                        <Row>
                            <Col>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    placeholder={`Template`}
                                    value={template.template}
                                    onChange={(e) => handleArrayChange('templates', index, 'template', e.target.value)}
                                />
                            </Col>
                            <Col xs="auto">
                                <Button variant="danger" size="sm" onClick={() => handleRemoveField('templates', index)}>Delete</Button>
                            </Col>
                        </Row>
                    </Form.Group>
                </div>
            ))}

            <Button className='mb-2' variant="secondary" size="sm" onClick={() => handleAddField('templates', { language: '', template: '' })}>Add Template</Button>

            <br />
            <Button variant="primary" type="submit" block className='submit-button my-3'>
                {initialData ? 'Update Challenge' : 'Create Challenge'}
            </Button>
        </Form>
    );
};

export default ChallengeForm;
