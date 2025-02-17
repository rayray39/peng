import { Box, Stack, ListItem, Divider } from "@mui/material"
import { useEffect, useState } from "react"

function MessagesDrawer({ user }) {
    const [matchedUsers, setMatchedUsers] = useState([]);

    const fetchMatchedUsers = async () => {
        const token = localStorage.getItem('authToken');

        const response = await fetch(`http://localhost:5000/matched-users/${user.id}`, {
            method:'GET',
            headers:{
                'Content-Type':'application/json',
                "Authorization": `Bearer ${token}`,
            },
        })

        const data = await response.json();

        if (!response.ok){
            console.log(data.error);
            return;
        }

        console.log(data.message);
        setMatchedUsers(data.likedUsernames);
    }

    useEffect(() => {
        fetchMatchedUsers();
    }, [])

    return <Box sx={{width:'280px', padding:'10px'}}>
        <ListItem disablePadding>
            <Stack direction={'column'} spacing={2} >
                <Stack>
                    <h3 style={{color:'orange'}}>MESSAGES</h3>
                    <Divider />
                </Stack>

                {
                    matchedUsers.map((username, index) => (
                        <Box key={index}>
                            <h4>{username}</h4>
                        </Box>
                    ))
                }
            </Stack>
        </ListItem>
    </Box>
}

export default MessagesDrawer