import React, { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import axios from "axios";

interface ProtectedRouteProps {
    childrenRoute?: React.ReactNode;
}

const ProtectedRouteEducator: React.FC<ProtectedRouteProps> = ({ childrenRoute }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [childrenIsAuthenticated, setChildrenIsAuthenticated] = useState<boolean | null>(null);

    const validateToken = async () => {
        const token = localStorage.getItem('token');
        console.log('Token:', token)
        const childrenToken = localStorage.getItem('childrenToken');
        console.log('Token children:', childrenToken)
        if (!token) {
            setIsAuthenticated(false);
            return;
        }



        try {
            const responseEducator = await axios.post('http://localhost:5000/api/auth/validate-token', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            console.log('Token validation response:', responseEducator.data)
            if (responseEducator.data.isValid) {
                console.log('Token is valid')
                setIsAuthenticated(true);
            } else {
                localStorage.removeItem('token');
                setIsAuthenticated(false);
            }

            const responseChildren = await axios.post('http://localhost:5000/api/auth/validate-token', {}, {
                headers: {
                    'Authorization': `Bearer ${childrenToken}`
                }
            });

            console.log('Token validation response:', responseChildren.data)
            if (responseChildren.data.isValid) {
                setChildrenIsAuthenticated(true);
            } else {
                localStorage.removeItem('tokenChildren');
                setChildrenIsAuthenticated(false);
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


    return isAuthenticated ?
        (childrenIsAuthenticated ? <Navigate to="/welcome"/> :
            (childrenRoute ? <>{childrenRoute}</> : <Outlet />) ):
                <Navigate to="/login" />;
};

export default ProtectedRouteEducator;
