import { Box, Stack, Card, CardActions, CardContent, Typography, Button, Chip } from "@mui/material"
import { useUser } from "./UserContext"
import { useEffect, useState } from "react";

// display user information as a card
function ProfileCard() {
    const { currentUser } = useUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [hobbies, setHobbies] = useState([]);         // comma separated string
    const [imageUrls, setImageUrls] = useState([]);

    // fetch current logged in user's data (firstName, lastName, bio, hobbies)
    const fetchUserData = async () => {
        const response = await fetch(`http://localhost:5000/${currentUser.id}/data`, {
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
        // set state variables
        setFirstName(data.userData.firstName[0].toUpperCase() + data.userData.firstName.slice(1));
        setLastName(data.userData.lastName[0].toUpperCase() + data.userData.lastName.slice(1));
        setBio(data.userData.bio);
        setHobbies(data.userData.hobbies.split(','));
    }

    // fetch currently logged in user's image urls
    const fetchImageUrls = async () => {
        const response = await fetch(`http://localhost:5000/${currentUser.id}/data-imageUrls`, {
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
        // set state variables
        setImageUrls(data.imageUrls);
    }

    useEffect(() => {
        fetchUserData();
        fetchImageUrls();
    }, [])

    return (
        <Box>
            <h2>This is the user profile page</h2>

            <Card sx={{ width: '500px' }}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {`${firstName} ${lastName}`}
                    </Typography>
                    
                    <Stack direction={'row'} spacing={2} sx={{display:'flex', justifyContent:'center'}}>
                        {hobbies.map((hobby, index) => (
                            <Chip label={hobby} key={index} />
                        ))}
                    </Stack>

                    <Typography variant="body2" sx={{ color: 'text.secondary', fontSize:'18px', marginTop:'15px' }}>
                        {bio}
                    </Typography>
                </CardContent>
                <CardActions sx={{display:'flex', justifyContent:'space-between', margin:'10px'}}>
                    <Button variant="outlined" disableElevation size="large" 
                        sx={{color:'orange', borderColor:'orange',
                            "&:hover": {
                                backgroundColor: "orange",
                                color: 'white'
                            },
                        }}>
                            Pass ❌
                    </Button>

                    <Button variant="outlined" disableElevation size="large" 
                        sx={{color:'orange', borderColor:'orange',
                            "&:hover": {
                                backgroundColor: "orange",
                                color: 'white'
                            },
                        }}>
                            Like ❤️
                    </Button>
                </CardActions>
            </Card>
        </Box>
    )
}

export default ProfileCard