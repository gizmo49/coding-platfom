import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
    const { user, loading } = useContext(AppContext);

    if (loading) return null; // Prevent rendering until loading is complete

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login" />
                )
            }
        />
    );
};

export default PrivateRoute;
