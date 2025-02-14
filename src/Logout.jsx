import { Box, Button, Stack } from "@mui/material"

// user logged out page
function Logout() {

    const handleReturnHome = () => {

    }

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
        }}>
            <Stack>
                <h2>You've been logged out. 🚪</h2>

                <Button variant="contained" sx={{height:'50px', backgroundColor:'orange', marginTop:'20px'}} 
                    disableElevation onClick={handleReturnHome}>return back
                </Button>
            </Stack>
        </Box>
    )
}

export default Logout