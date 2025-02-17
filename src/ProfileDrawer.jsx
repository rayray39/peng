import { Box, Chip, ListItem, Stack, Divider, Button } from "@mui/material"
import { useNavigate } from "react-router-dom";

// drawer that will be opened in People, to display profile of currently logged in user
function ProfileDrawer({ user }) {
    const navigate = useNavigate();

    const hobbyChips = (hobbiesString) => {
        // generate the chips for each hobby of the user
        const hobbies = hobbiesString.split(',');
        return hobbies.map((hobby, index) => (
            <Chip 
                key={index}
                label={hobby}
                variant="filled"
                sx={{
                    backgroundColor: 'orange',
                    color: 'white',
                }}
            />
        ))
    }

    const userFirstAndLastName = (firstName, lastName) => {
        // styles the user's first and last names
        return (
            `${firstName[0].toUpperCase() + firstName.slice(1)} 
            ${lastName[0].toUpperCase() + lastName.slice(1)}`
        )
    }

    const handleLogout = () => {
        console.log("logout button clicked");
        // localStorage.removeItem('authToken');    // remove the authToken
        console.log('user has been logged out');
        navigate('/logout');
    }

    return <Box sx={{width:'280px', padding:'10px'}}>
        <ListItem disablePadding>
            <Stack>
                <ProfileSection sectionTitle={'PROFILE'} 
                    sectionContent={userFirstAndLastName(user.firstName, user.lastName)}
                />

                <ProfileSection sectionTitle={'USERNAME'} sectionContent={user.username} />

                <ProfileSection sectionTitle={'BIO'} sectionContent={user.bio} />
                
                <ProfileSection sectionTitle={'HOBBIES'} 
                    sectionContent={
                        <Stack direction={'row'} spacing={1}>
                            {hobbyChips(user.hobbies)}
                        </Stack>
                    }
                />
            </Stack>
        </ListItem>

        <Button variant="outlined" 
            sx={{
                position:'fixed',
                bottom:'20px',
                backgroundColor:'white',
                color:'orange',
                borderColor:'orange',
                "&:hover": {
                    backgroundColor:'orange',
                    color:'white'
                }
            }} 
            disableElevation onClick={handleLogout}>
            Logout
        </Button>
    </Box>
}

// returns a component for each category of user information
function ProfileSection({ sectionTitle, sectionContent }) {
    return (
        <Stack>
            <h3 style={{color:'orange'}}>{sectionTitle}</h3>

            <Box>
                {sectionContent}
            </Box>

            <Divider sx={{marginTop:'5px'}}/>
        </Stack>
    )
}

export default ProfileDrawer