import { Box, Stack, TextField } from "@mui/material"
import Button from '@mui/material/Button';
import { useState } from "react";

function CreateAccount() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');

    const handleFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const handleLastName = (event) => {
        setLastName(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }
    
    const handleCreateClick = () => {
        console.log(`first name: ${firstName}`);
        console.log(`last name: ${lastName}`);
        console.log(`password: ${password}`);
    }

    return <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
            // border: '1px solid black'
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <TextField id="create-firstname" label='First Name' variant="outlined" value={firstName} onChange={handleFirstName}/>
                <TextField id="create-lastname" label='Last Name' variant="outlined" value={lastName} onChange={handleLastName}/>
                <TextField id="create-password" label='Password' variant="outlined" type="password" value={password} onChange={handlePassword}/>

                <Button variant="contained" sx={{height:'50px'}} disableElevation onClick={handleCreateClick}>Create</Button>
            </Stack>
        </Box>
    </>
}

export default CreateAccount