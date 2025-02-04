import { Box, Stack } from "@mui/material"
import ProfileCard from "./ProfileCard"

// page to browse through other people's profiles, explore page
function People() {
    return <Box sx={{display:'flex', justifyContent:'center'}}>
        <h2>This is the people page.</h2>
        <Stack spacing={2}>
            <ProfileCard userId={1} />
            <ProfileCard userId={2} />
        </Stack>
    </Box>
}

export default People