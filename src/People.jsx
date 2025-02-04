import { Box, Stack } from "@mui/material"
import ProfileCard from "./ProfileCard"
import { useEffect, useState } from "react"

// page to browse through other people's profiles, explore page
function People() {
    const [allUsers, setAllUsers] = useState([]);

    // fetch all user ids in the database
    const fetchAllUsers = async () => {
        const response = await fetch('http://localhost:5000/all-userIds', {
            method:'GET',
            headers: {
                'Content-Type':'application/json',
            },
        })

        const data = await response.json();

        if (!response.ok) {
            console.log(data.error);
            return;
        }

        console.log(data.message);
        setAllUsers(data.userIds);
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    return <Box sx={{display:'flex', justifyContent:'center'}}>
        <Stack spacing={2}>
            <h2>This is the people page.</h2>
            
            {
                allUsers.map((userId, index) => (
                    <ProfileCard key={index} userId={userId} index={index} />
                ))
            }
        </Stack>
    </Box>
}

export default People