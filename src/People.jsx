import { Box, Stack } from "@mui/material"
import ProfileCard from "./ProfileCard"
import { useEffect, useState } from "react"
import { useUser } from "./UserContext";

// page to browse through other people's profiles, explore page
function People() {
    const { currentUser } = useUser();
    const [allUsers, setAllUsers] = useState([]);
    
    // keeps track of the current card to display
    const [currentDisplayed, setCurrentDisplayed] = useState(0);
    // keeps track of the num of user ids retrieved from the database
    const [numOfUsers, setNumOfUsers] = useState(0);

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
        setNumOfUsers(data.userIds.length - 1); // data.userIds contain the currently logged in user's id too
    }

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const handleNextCard = () => {
        // when the like/pass button in the profile card is clicked
        setCurrentDisplayed((currentDisplayed + 1) % numOfUsers);
    }

    return <Box sx={{display:'flex', justifyContent:'center', transform: "translate(0%, 20%)"}}>
        <h2>Find your true love 💕</h2>
        
        {
            allUsers.map((userId, index) => (
                <Box key={index} sx={{position:'absolute', display: userId === allUsers[currentDisplayed] ? 'block' : 'none'}}>
                    <ProfileCard userId={userId} handleNextCard={handleNextCard} />
                </Box>
            ))
        }
    </Box>
}

export default People