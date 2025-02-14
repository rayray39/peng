import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material"

// drawer that will be opened in People, to display profile of currently logged in user
function ProfileDrawer({ user }) {
    return <Box sx={{width:'200px'}}>
        <ListItem disablePadding>
            <ListItemText primary={'Profile'} />
            <ListItemText primary={user.username} />
          </ListItem>
    </Box>
}

export default ProfileDrawer