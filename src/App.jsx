import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import CreateAccount from './CreateAccount'
import Login from './Login'
import WelcomePage from './WelcomePage';
import FillBio from './FillBio';
import Hobbies from './Hobbies';
import AddImages from './AddImages';
import People from './People';

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
                <Route path="/fill-in-bio" element={<FillBio />} />
                <Route path='/select-hobbies' element={<Hobbies/>}/>
                <Route path='/add-images' element={<AddImages/>}/>
                <Route path='/people' element={isAuthenticated ? <People /> : <Navigate to="/login" />}/>
            </Routes>
        </Router>
    </>
}

export default App
