// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import ARpage from "./components/menuAR";
import Login from "./components/login";
import Register from "./components/register";
import EscenasGuardadas from "./components/escenasGuardadas";

const PrivateRoute = ({ children }) => {
    const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));
    return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const storedAuth = JSON.parse(localStorage.getItem('isAuthenticated'));
        if (storedAuth) setIsAuthenticated(true);
    }, []);

    const handleAuthentication = (authenticated) => {
        localStorage.setItem('isAuthenticated', JSON.stringify(authenticated));
        setIsAuthenticated(authenticated);
    };

    // Mostrar la barra de navegación si el usuario está autenticado y no está en /login o /register
    const showNavbar = isAuthenticated && !['/login', '/register'].includes(location.pathname);

    return (
        <>
            {showNavbar && <Navbar />}
            <Routes>
                <Route path="/login" element={<Login handleAuthentication={handleAuthentication} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/menuAR" element={<PrivateRoute><ARpage /></PrivateRoute>} />
                <Route path="/escenasGuardadas" element={<PrivateRoute><EscenasGuardadas /></PrivateRoute>} />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </>
    );
}

export default function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}
