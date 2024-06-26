import React, { createContext, useEffect, useState } from 'react';
import API from '../services/lib/api';
import { apiRoutes } from '../services/apiRoutes';

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const fetchUserProfile = async () => {
        try {
            setLoading(true);

            const url = apiRoutes.getProfile;
            const res = await API.get(url);
            if (res.status === 200) {
                setUser(res.data.data)
            }
        } catch (error) {
            console.error('Error fetching user profile', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        <AppContext.Provider value={{ user, setUser, loading }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
