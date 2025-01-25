import { Box, Stack, TextField, Button, Link } from "@mui/material";
import { Link as RouterLink } from 'react-router-dom';
import { useState } from "react";

// login user account page
function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // for empty field validation
    const [usernameEmpty, setUsernameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const fieldIsEmpty = 'Please do not leave blank!';

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleCreateClick = () => {
        // when the 'Create' button is clicked
        if (username && password) {
            console.log(`username: ${username}`);
            console.log(`password: ${password}`);
        } else {
            console.log('Error in Login: A field is empty');
        }

        // client-side field validation
        if (username === '') {
            setUsernameEmpty(true);
        } else {
            setUsernameEmpty(false);
        }
        if (password === '') {
            setPasswordEmpty(true);
        } else {
            setPasswordEmpty(false);
        }
    }

    return <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 40%)", // Center it perfectly
        }}>
        <Stack direction='column' spacing={2} sx={{width: '500px'}}>
            <h2>Log In To Your Account</h2>

            <TextField id="login-username" label='Username' variant="outlined"
                value={username} onChange={handleUsername} error={usernameEmpty} helperText={usernameEmpty ? fieldIsEmpty : null}/>

            <TextField id="login-password" label='Password' variant="outlined" type="password"
                value={password} onChange={handlePassword} error={passwordEmpty} helperText={passwordEmpty ? fieldIsEmpty : null}/>

            <Button variant="contained" sx={{height:'50px', backgroundColor:'orange'}} disableElevation 
                onClick={handleCreateClick} >Log In</Button>

            {/* link to CreateAccount */}
            <Link component={RouterLink} to='/create-account' underline="hover">
                {"Don't have an account? Sign Up"}
            </Link>
        </Stack>
    </Box>
}

export default Login;