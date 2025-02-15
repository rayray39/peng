import { Box, ListItem, ListItemText, Stack } from "@mui/material"

// drawer that will be opened in People, to display profile of currently logged in user
function ProfileDrawer({ user }) {
    return <Box sx={{width:'240px', padding:'20px'}}>
        <ListItem disablePadding>
            <Stack>
                <ListItemText primary={'Profile'} />
                <ListItemText primary={`
                    ${user.firstName[0].toUpperCase() + user.firstName.slice(1)} 
                    ${user.lastName[0].toUpperCase() + user.lastName.slice(1)}`} />
                <ListItemText primary={`username: ${user.username}`} />
                <ListItemText primary={`bio: ${user.bio}`} />
                <ListItemText primary={`hobbies: ${user.hobbies}`} />
            </Stack>
        </ListItem>
    </Box>
}

export default ProfileDrawer