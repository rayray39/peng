import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Box, Stack } from "@mui/material";

function ClerkSignInButton() {
    // uses clerk's components for sign in and sign up
    return (
        <div>
            <SignedOut>
                <SignInButton>
                    <button style={{
                        width:'200px',
                        height:'40px',
                        backgroundColor:'orange',
                        border:'none',
                        borderRadius:'4px',
                        color:'white',
                        fontSize:'16px',
                    }}>Sign In</button>
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