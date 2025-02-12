import { Box, Button } from "@mui/material"
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

    // adds the likedUserId to the list of userIds that have been liked by current user 
    const likeUser = async (likedUserId) => {
        const response = await fetch('http://localhost:5000/like-user', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({ currentUser, likedUserId }),
        })

        const data = await response.json();

        if (!response.ok) {
            console.log(data.error);
            return;
        }

        console.log(data.message);
        if (data.likesEachOther) {
            alert("It's a Match!")
        }
    }

    const handleUserLiked = (userId) => {
        // when the like button in the profile card is clicked
        setCurrentDisplayed((currentDisplayed + 1) % numOfUsers);

        console.log(`user id that has been liked = ${userId}`);
        likeUser(userId);
    }

    const handleUserPassed = (userId) => {
        // when the pass button in the profile card is clicked
        setCurrentDisplayed((currentDisplayed + 1) % numOfUsers);

        console.log(`user id that has been passed = ${userId}`);
    }

    // for debugging, to delete the liked userIds of currentUser
    const deleteLikedUsers = async () => {
        console.log('delete users button clicked')
        const response = await fetch(`http://localhost:5000/${currentUser.id}/delete-liked-users`, {
            method:'DELETE',
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
    }

    return (<Box sx={{display:'flex', justifyContent:'center', transform: "translate(0%, 20%)"}}>
        <h2>Find your true love 💕</h2>
        
        {
            allUsers.map((userId, index) => (
                <Box key={index} sx={{position:'absolute', display: userId === allUsers[currentDisplayed] ? 'block' : 'none'}}>
                    <ProfileCard userId={userId} 
                        handleUserLiked={() => handleUserLiked(userId)} 
                        handleUserPassed={() => handleUserPassed(userId)} 
                    />
                </Box>
            ))
        }
    </Box>)
}

export default People