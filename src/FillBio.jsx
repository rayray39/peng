import { Box, TextField, Stack, Button } from "@mui/material"
import { useNavigate } from "react-router-dom"
import { useUser } from "./UserContext";
import { useState } from "react";

function FillBio() {
    const navigate = useNavigate();
    const { currentUser } = useUser();
    const [bio, setBio] = useState('');

    const handleBio = (event) => {
        setBio(event.target.value);
    }

    const handleNext = async () => {
        // when the Next button is clicked
        // make a post request to save the bio to currently logged in user

        // const response = await fetch('http://localhost:5000/save-bio', {
        //     method:'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ currentUser, bio }),
        // })

        // const data = await response.json();

        // if (!response.ok) {
        //     console.error(data.error);
        //     return;
        // }

        // console.log(data.message); // "Bio updated successfully."
        // navigate('/select-hobbies');
        console.log(`the bio is : ${bio}`);
    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
        }}>
            <Stack>
                <h2>Write a short paragraph about yourself 📝</h2>

                <TextField id="bio-textfield-multiline" label="Write a bio." multiline maxRows={3} value={bio} onChange={handleBio}
                    helperText="we don't tolerate nonsense, be serious, because you can't change it later on."/>

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange', marginTop:'20px'}} 
                    disableElevation onClick={handleNext} >Next</Button>
            </Stack>
        </Box>
    )
}

export default FillBio