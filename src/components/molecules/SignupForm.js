import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SignupForm = ({ onSignup, isLoading }) => {
    const [request, updateRequest] = useState({})
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
  
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setImage(file);
  
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setImagePreview(null);
      }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        updateRequest((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onSignup({...request, image});
    };

  

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicImage" className='my-3'>
                <Form.Label>Profile Image</Form.Label>
                <Form.Control
                    type="file"
                    onChange={handleImageChange}
                    required
                />
                {imagePreview && (
                    <div
                        style={{
                            width: '100px',
                            height: '100px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            marginTop: '10px'
                        }}
                    >
                        <img
                            src={imagePreview}
                            alt="Preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                )}
            </Form.Group>
            <Form.Group controlId="formBasicFirstName" className='mb-3'>
                <Form.Label>First Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="First name"
                    name='firstName'
                    value={request?.firstName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicLastName" className='mb-3'>
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Last name"
                    name="lastName"
                    value={request?.lastName}
                    onChange={handleChange}
                    required
                />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className='mb-3'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={request?.email}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>User Type</Form.Label>
                <Form.Check
                    type="radio"
                    label="Admin"
                    name="userType"
                    value="ADMIN"
                    checked={request?.userType === 'ADMIN'}
                    onChange={handleChange}
                    required
                />
                <Form.Check
                    type="radio"
                    label="Default"
                    name="userType"
                    value="DEFAULT"
                    checked={request?.userType === 'DEFAULT'}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className='mb-3'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={request?.password}
                    onChange={handleChange}
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={isLoading} block>
                Signup
            </Button>
        </Form>
    );
};

export default SignupForm;
