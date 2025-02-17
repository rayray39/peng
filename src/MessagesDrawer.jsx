import { Box, Stack, ListItem, Divider, Avatar } from "@mui/material"
import { useEffect, useState } from "react"

// drawer that will be opened in People, to display messages of users with currently logged in user
function MessagesDrawer({ user }) {
    const [matchedUsers, setMatchedUsers] = useState([]);
    const avatarColors = [
        '#1E90FF', '#9370DB', '#FF7F50', '#3CB371'
    ]

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
            <Stack>
                <Stack direction={'column'} spacing={2} sx={{marginBottom:'10px'}}>
                    <h3 style={{color:'orange'}}>MESSAGES</h3>
                    <Divider />
                </Stack>

                <Stack direction={'column'} >
                    {
                        matchedUsers.map((username, index) => (
                            <UserProfile key={index} 
                                username={username} 
                                avatarColor={
                                    avatarColors[Math.floor(Math.random() * avatarColors.length)]
                                }
                            />
                        ))
                    }
                </Stack>
            </Stack>
        </ListItem>
    </Box>
}

function UserProfile({ username, avatarColor }) {
    return (
        <Box sx={{
            display:'flex',
            flexDirection:'row',
            alignItems:'center',
            padding: '8px',
            width:'260px',
            marginBottom:'2px',
            borderRadius:'4px',
            '&:hover': {
                backgroundColor:'gainsboro'
            }
        }}>
            <Avatar sx={{bgcolor:avatarColor, marginRight:'20px'}}>{username[0]}</Avatar>
            <Box>{username}</Box>
        </Box>
    )
}

export default MessagesDrawer