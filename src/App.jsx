import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CreateAccount from './CreateAccount'
import Login from './Login'
import WelcomePage from './WelcomePage';
import FillBio from './FillBio';
import Hobbies from './Hobbies';
import AddImages from './AddImages';

function App() {
    return <>
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-account" element={<CreateAccount />} />
                <Route path="/fill-in-bio" element={<FillBio />} />
                <Route path='/select-hobbies' element={<Hobbies/>}/>
                <Route path='/add-images' element={<AddImages/>}/>
            </Routes>
        </Router>
    </>
}

export default App
