import { Box, Stack, ListItem } from "@mui/material"

function MessagesDrawer() {
    return <Box sx={{width:'280px', padding:'10px'}}>
        <ListItem disablePadding>
            <Stack>
                <h3 style={{color:'orange'}}>MESSAGES</h3>
            </Stack>
        </ListItem>
    </Box>
}

export default MessagesDrawer