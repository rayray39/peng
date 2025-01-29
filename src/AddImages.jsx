import { Box, Stack } from "@mui/material"

function AddImages() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 40%)", // Center it perfectly
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <h2>Add at least 1 image of yourself 📹</h2>
            </Stack>
        </Box>
    )
}

export default AddImages