import { Box, Stack, ListItem } from "@mui/material"

function MessagesDrawer() {
    return <Box sx={{width:'280px', padding:'10px'}}>
        <ListItem disablePadding>
            <Stack>
                <h2>MESSAGES</h2>
            </Stack>
        </ListItem>
    </Box>
}

export default MessagesDrawer