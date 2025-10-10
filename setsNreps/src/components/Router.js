import React from 'react';
import {BrowserRouter, Routes, Route, Navigate, useParams} from 'react-router-dom';
import NotFound from './NotFound';
import Login from './Login';
import HomePage from './HomePage';
import SessionDetails from './SessionDetails';
import Exercises from './Exercises';
import Register from './Register';

function isLoggedIn() {
    return localStorage.getItem('api-token') != null;
}

function ProtectedRoute({ children }) {
    return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

function SessionDetailsWrapper() {
    const { sessionId } = useParams();
    return <SessionDetails sessionId={sessionId} />;
}

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <HomePage/>
                    </ProtectedRoute>
                } />
                <Route path="/session/:sessionId" element={
                    <ProtectedRoute>
                        <SessionDetailsWrapper />
                    </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </BrowserRouter>
    );
}