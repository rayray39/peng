import { Box, Stack, TextField, Link } from "@mui/material"
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useState } from "react";

function CreateAccount() {
    // text fields' state
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // for empty field validation
    const [firstNameEmpty, setFirstNameEmpty] = useState(false);
    const [lastNameEmpty, setLastNameEmpty] = useState(false);
    const [usernameEmpty, setUsernameEmpty] = useState(false);
    const [passwordEmpty, setPasswordEmpty] = useState(false);

    const fieldIsEmpty = 'Please do not leave blank!';
     
    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastName = (event) => {
        setLastName(event.target.value);
    }

    const handleUsername = (event) => {
        setUsername(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    
    const handleCreateClick = () => {
        // when the 'Create' button is clicked
        if (firstName && lastName && username && password) {
            console.log(`first name: ${firstName}`);
            console.log(`last name: ${lastName}`);
            console.log(`username: ${username}`);
            console.log(`password: ${password}`);
        } else {
            console.log('Error in CreateAccount: A field is empty');
        }

        // client-side field validation
        if (firstName === '') {
            setFirstNameEmpty(true);
        } else {
            setFirstNameEmpty(false);
        }
        if (lastName === '') {
            setLastNameEmpty(true);
        } else {
            setLastNameEmpty(false);
        }
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

    return <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 20%)", // Center it perfectly
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <h2>Create Your Account</h2>
                <TextField id="create-firstname" label='First Name' variant="outlined" error={firstNameEmpty} 
                    helperText={firstNameEmpty ? fieldIsEmpty : null} value={firstName} onChange={handleFirstName}/>

                <TextField id="create-lastname" label='Last Name' variant="outlined" error={lastNameEmpty} 
                    helperText={lastNameEmpty ? fieldIsEmpty : null} value={lastName} onChange={handleLastName}/>

                <TextField id="create-username" label='Username' variant="outlined" error={usernameEmpty}
                    helperText={usernameEmpty ? fieldIsEmpty : 'Set a username for future logins.'} value={username} onChange={handleUsername}/>

                <TextField id="create-password" label='Password' variant="outlined" type="password" error={passwordEmpty}
                    helperText={passwordEmpty ? fieldIsEmpty : null} value={password} onChange={handlePassword}/>

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange'}} disableElevation onClick={handleCreateClick}>Create</Button>

                {/* link to CreateAccount */}
                <Link component={RouterLink} to='/login' underline="hover">
                    {"Already have an account? Log In"}
                </Link>
            </Stack>
        </Box>
    </>
}

export default CreateAccount