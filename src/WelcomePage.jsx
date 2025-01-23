import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Box, Stack } from "@mui/material";
import Button from '@mui/material/Button';


function ClerkSignInButton() {
    // uses clerk's components for sign in and sign up
    return (
        <div>
            <SignedOut>
                <SignInButton>
                    <Button sx={{
                            height:'50px', width:'200px', backgroundColor:'orange'
                        }}
                        variant="contained" disableElevation>Sign In
                    </Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    )
}

function WelcomePage() {
    return <>
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            transform: "translate(0%, 50%)", // Center it perfectly
            // border: '1px solid black'
        }}>
            <Stack direction='column' spacing={2} sx={{width: '500px'}}>
                <h1>Welcome to Peng</h1>

                <ClerkSignInButton/>
            </Stack>
        </Box>
    </>
}

export default WelcomePage