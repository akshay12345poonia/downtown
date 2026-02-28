import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false }) => {
    const { isLoggedIn, isAdmin, isAgent, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <div className="spinner" />
            </div>
        );
    }

    if (!isLoggedIn) {
        return <Navigate to="/signin" replace />;
    }

    if (adminOnly && !(isAdmin || isAgent)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;