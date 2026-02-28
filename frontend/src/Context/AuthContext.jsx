import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            try {
                setToken(storedToken);
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Invalid stored user data');
                localStorage.clear();
            }
        }

        setLoading(false);
    }, []);

    const login = (tokenVal, userData) => {
        localStorage.setItem('token', tokenVal);
        localStorage.setItem('user', JSON.stringify(userData));
        setToken(tokenVal);
        setUser(userData);
    };

    const logout = () => {
        localStorage.clear();
        setToken(null);
        setUser(null);
    };

    const isAdmin = user?.role === 'admin';
    const isAgent = user?.role === 'agent';
    const isLoggedIn = Boolean(token);

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            logout,
            isAdmin,
            isAgent,
            isLoggedIn,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return context;
};