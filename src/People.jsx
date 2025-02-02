import { Box } from "@mui/material"
import ProfileCard from "./ProfileCard"

// page to browse through other people's profiles, explore page
function People() {
    return <Box sx={{display:'flex', justifyContent:'center'}}>
        <ProfileCard />
    </Box>
}

export default People