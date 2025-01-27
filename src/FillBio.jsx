import { Box, TextField, Stack, Button } from "@mui/material"

function FillBio() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
        }}>
            <Stack>
                <h2>Write a short paragraph about yourself 📝</h2>

                <TextField id="bio-textfield-multiline" label="Write a bio." multiline maxRows={4} 
                    helperText="we don't tolerate nonsense, be serious, because you can't change it later on."/>

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange', marginTop:'20px'}} 
                    disableElevation >Next</Button>
            </Stack>
        </Box>
    )
}

export default FillBio