import { Button, Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

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

        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange'}} disableElevation 
                    onClick={handleLogIn} >Log In</Button>

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange'}} disableElevation 
                    onClick={handleSignUp} >Sign Up</Button>
            </Stack>
        </Box>
    </>
}

export default WelcomePage