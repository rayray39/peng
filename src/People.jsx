import { Box, Stack } from "@mui/material"
import ProfileCard from "./ProfileCard"
import { useEffect, useState } from "react"
import { useUser } from "./UserContext";

// page to browse through other people's profiles, explore page
function People() {
    const { currentUser } = useUser();
    const [allUsers, setAllUsers] = useState([]);
    
    // keeps track of the current card to display
    const [currentDisplayed, setCurrentDisplayed] = useState('');

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
        setAllUsers(data.userIds.filter((userId) => userId !== currentUser.id));
        setCurrentDisplayed(data.userIds[0]);
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const handleNextCard = () => {
        // when the like button in the profile card is clicked
        if (currentDisplayed < allUsers.length - 1) {
            setCurrentDisplayed(currentDisplayed + 1);
        }
    }

    const handlePreviousCard = () => {
        // when the pass button in the profile card is clicked
        if (currentDisplayed > 0) {
            setCurrentDisplayed(currentDisplayed - 1);
        }
    }

    return <Box sx={{display:'flex', justifyContent:'center', transform: "translate(0%, 20%)"}}>
        <h2>Find your true love 💕</h2>
        
        {
            allUsers.map((userId, index) => (
                <Box key={index} sx={{position:'absolute', display: index === currentDisplayed ? 'block' : 'none'}}>
                    <ProfileCard userId={userId} handleNextCard={handleNextCard} handlePreviousCard={handlePreviousCard}/>
                </Box>
            ))
        }
    </Box>
}

export default People