import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdminPage from './pages/AdminPage';
import Login from './pages/Login';
import './App.css';
import { AuthProvider } from './context/AuthContext';

function App() {
    return (
        <AuthProvider>
            <Router>
                <div className="App">
                    <Routes>
                        <Route path="/admin/*" element={<AdminPage />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
