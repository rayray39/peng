import { Button, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Review from "./Review";

// main entry of site - user welcome page
function WelcomePage() {
    const navigate = useNavigate();

    const handleLogIn = () => {
        console.log('log in button clicked');
        navigate('/login');
    }

    const handleSignUp = () => {
        console.log('sign up button clicked');
        navigate('/create-account');
    }

    return <>
        <h1>Welcome to Peng 💘</h1>

        <h4>A simple and no nonsense dating app. Swipe, Chat, and Date.</h4>

        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            transform: "translate(0%, 10%)",
            height: '500px'
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px', position:'absolute', top:0}}>
                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange'}} disableElevation 
                    onClick={handleLogIn} >Log In</Button>

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange'}} disableElevation 
                    onClick={handleSignUp} >Sign Up</Button>
            </Stack>

            <Review />
        </Box>
    </>
}

export default WelcomePage