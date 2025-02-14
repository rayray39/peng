import { Box, ListItem, ListItemButton, ListItemText } from "@mui/material"

// drawer that will be opened in People, to display profile of currently logged in user
function ProfileDrawer() {
    return <Box sx={{width:'200px'}}>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </ListItem>
    </Box>
}

export default ProfileDrawer