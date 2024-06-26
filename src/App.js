import React, { useContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import AppContextProvider, { AppContext } from './context/AppContext';
import Navbar from './components/organisms/Navbar';
import Routes from './routes/Routes';
import 'bootstrap/dist/css/bootstrap.min.css';


const AppLayout = () => {
    const { loading } = useContext(AppContext);

    if (loading) {
        return (
            <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Spinner animation="border" role="status">
                </Spinner>
            </Container>
        );
    }
    return (
        <Router>
            <Navbar />
            <Routes />
        </Router>
    )
}


const App = () => {
    return (
        <AppContextProvider>
            <AppLayout />
        </AppContextProvider>
    );
};

export default App;
