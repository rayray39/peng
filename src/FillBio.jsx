import { Box, TextField, Stack } from "@mui/material"

function FillBio() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
        }}>
            <Stack>
                <h2>Write a short paragraph about yourself 📝</h2>

                <TextField id="bio-textfield-multiline" label="Write a bio." multiline maxRows={4}/>
            </Stack>
        </Box>
    )
}

export default FillBio