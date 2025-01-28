import { Box, Stack } from "@mui/material";

function Hobbies() {
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
        }}>
            <Stack>
                <h2>Select 3 hobbies 🏸🍣🛫</h2>
            </Stack>
        </Box>
    )
}

export default Hobbies