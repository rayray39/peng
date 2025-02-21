import { Box, Button, Stack, Drawer } from "@mui/material"
import ProfileCard from "./ProfileCard"
import MatchModal from "./MatchModal";
import { useEffect, useState } from "react"
import { useUser } from "./UserContext";
import ProfileDrawer from "./ProfileDrawer";
import MessagesDrawer from "./MessagesDrawer";

// page to browse through other people's profiles, explore page
function People() {
    const { currentUser } = useUser();
    const [allUsers, setAllUsers] = useState([]);
    
    // keeps track of the current card to display
    const [currentDisplayed, setCurrentDisplayed] = useState(0);
    // keeps track of the num of user ids retrieved from the database
    const [numOfUsers, setNumOfUsers] = useState(0);

    // if there is a match, the modal will open
    const [thereIsAMatch, setThereIsAMatch] = useState(false);
    // retreive the username of the user that has been liked
    const [likedUsername, setLikedUsername] = useState('');

    // opens / closes the profile drawer
    const [openProfile, setOpenProfile] = useState(false);
    // opens / closes the messages drawer
    const [openMessages, setOpenMessages] = useState(false);

    // fetch all user ids in the database
    const fetchAllUsers = async () => {
        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:5000/all-userIds', {
            method:'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
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
        const token = localStorage.getItem('authToken');

        const response = await fetch('http://localhost:5000/like-user', {
            method:'POST',
            headers: {
                'Content-Type':'application/json',
                "Authorization": `Bearer ${token}`,
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
            setThereIsAMatch(true);
            setLikedUsername(data.likedUsername);
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

    const openProfileDrawer = () => {
        // when open profile button (MY PROFILE 🐳 button) is clicked
        console.log('opening profile drawer');

        setOpenProfile(true);
    }

    const openMessagesDrawer = () => {
        // when open profile button (MESSAGES 💌 button) is clicked
        console.log('opening messages drawer');

        setOpenMessages(true);
    }

    return (<>
        <Box sx={{display:'flex', justifyContent:'center', transform: "translate(0%, 20%)"}}>
            <h2>Find your true love 💕</h2>

            <MatchModal likedUser={likedUsername} open={thereIsAMatch} close={() => setThereIsAMatch(false)}/>

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

            <Drawer open={openProfile} onClose={() => setOpenProfile(false)}>
                <ProfileDrawer user={currentUser}/>
            </Drawer>

            <Drawer open={openMessages} onClose={() => setOpenMessages(false)} anchor="right" >
                <MessagesDrawer user={currentUser} />
            </Drawer>
        </Box>

        <Stack direction={'row'} spacing={1} sx={{
            position: 'fixed', 
            bottom: '5px', 
            left: '50%', 
            transform: 'translateX(-50%)',
        }}>
            <Button variant="contained" 
                sx={{
                    height:'50px', backgroundColor:'orange', 
                }} 
                disableElevation onClick={openProfileDrawer}>
                {`MY PROFILE 🐳`}
            </Button>

            <Button variant="contained" 
                sx={{
                    height:'50px', backgroundColor:'orange', 
                }} 
                disableElevation onClick={openMessagesDrawer}>
                {`MESSAGES 💌`}
            </Button>
        </Stack>
    </>
    )
}

export default People