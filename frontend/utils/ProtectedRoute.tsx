import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
    childrenRoute?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ childrenRoute }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    const validateToken = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setIsAuthenticated(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/auth/validate-token', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Token validation response:', response.data)
            if (response.data.isValid) {
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error('Error validating token:', error);
            localStorage.removeItem('token');
            setIsAuthenticated(false);
        }
    };

    useEffect(() => {
        console.log('Validating token...')
        validateToken();
    }, []);

    if (isAuthenticated === null) {
        return <div>Loading...</div>;
    }


    return isAuthenticated ? (childrenRoute ? <>{childrenRoute}</> : <Outlet />) : <Navigate to="/login" />;
};

export default ProtectedRoute;
