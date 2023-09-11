import './TodoApp.css'
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import LogoutComponent from './LogoutComponent';
import ErrorComponent from './ErrorComponent';
import HeaderComponent from './HeaderComponent';
import TodosComponent from './ListTodosComponent';
import WelcomeComponent from './WelcomeComponent';
import LoginComponent from './LoginComponent';
import AuthProvider, { useAuth } from './security/AuthComponent';
import TodoComponent from './TodoComponent';
import CreateUserComponent from './CreateUserComponent';


function AuthenticatedRoute({ children }) {
    if (useAuth().isAuthenticated) {
        return children;
    } else {
        return <Navigate to="/login" />
    }
}
export default function TodoApp() {
    return (
        <div className="TodoApp">
            <AuthProvider>
                <BrowserRouter>
                    <HeaderComponent />
                    <Routes>
                        <Route path="/" element={<LoginComponent />} />
                        <Route path="/login" element={<LoginComponent />} />
                        <Route path="/new/user" element={<CreateUserComponent />} />
                        <Route path="/welcome/:username" element={
                            <AuthenticatedRoute>
                                <WelcomeComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/logout" element={
                            <AuthenticatedRoute>
                                <LogoutComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/todos" element={
                            <AuthenticatedRoute>
                                <TodosComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/todos/:id" element={
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="/new/todo" element={
                            <AuthenticatedRoute>
                                <TodoComponent />
                            </AuthenticatedRoute>
                        } />
                        <Route path="*" element={<ErrorComponent />} />

                    </Routes>
                </BrowserRouter>
            </AuthProvider>

        </div>
    )
}