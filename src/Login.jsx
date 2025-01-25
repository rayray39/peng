import { Box, Stack, TextField, Button } from "@mui/material";

function Login() {

    return <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
            // border: '1px solid black'
        }}>
        <Stack direction='column' spacing={2} sx={{width: '500px'}}>
            <h2>Log In To Your Account</h2>

            <TextField id="login-username" label='Username' variant="outlined"/>

            <TextField id="login-password" label='Password' variant="outlined" type="password"/>

            <Button variant="contained" sx={{height:'50px'}} disableElevation >Log In</Button>
        </Stack>
    </Box>
}

export default Login;