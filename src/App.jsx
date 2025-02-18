import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './App.css'
import CreateAccount from './CreateAccount'
import Login from './Login'
import WelcomePage from './WelcomePage';
import FillBio from './FillBio';
import Hobbies from './Hobbies';
import AddImages from './AddImages';
import People from './People';
import Logout from './Logout';
import Messages from './Messages';

function App() {
    // user can only access the route if authenticated
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        setIsAuthenticated(!!token); // Set true if token exists
    }, []);

    return <>
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />

                <Route path="/fill-in-bio" element={isAuthenticated ? <FillBio /> : <Navigate to="/" />} />
                <Route path='/select-hobbies' element={isAuthenticated ? <Hobbies /> : <Navigate to="/" />}/>
                <Route path='/add-images' element={isAuthenticated ? <AddImages /> : <Navigate to="/" />}/>
                <Route path='/people' element={isAuthenticated ? <People /> : <Navigate to="/" />}/>
                <Route path='/messages/:username' element={isAuthenticated ? <Messages /> : <Navigate to="/" />}/>

                <Route path="/logout" element={<Logout />} />
            </Routes>
        </Router>
    </>
}

export default App
