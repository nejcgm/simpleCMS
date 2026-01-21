import React from 'react'
import {Navigate} from 'react-router-dom'
import {useSearchParams } from 'react-router-dom';

const protectedAdmin = ({ children }: { children: JSX.Element }) => {
    const [searchParams] = useSearchParams();
    const userId = searchParams.get('userId');
    
    
    const isAuthenticated = sessionStorage.getItem('authToken');
    const isAdmin = sessionStorage.getItem('permissionToken')

    return isAuthenticated && isAdmin==='admin' ? children : <Navigate to={`/editor?userId=${userId}`} />;


}

export default protectedAdmin