import { Box, Stack } from "@mui/material"
import { useUser } from "./UserContext"
import { useEffect, useState } from "react";

// page to browser through other people's profiles, explore page
function People() {
    const { currentUser } = useUser();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [hobbies, setHobbies] = useState('');         // comma separated string
    const [imageUrls, setImageUrls] = useState([]);

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
        setFirstName(data.userData.firstName);
        setLastName(data.userData.lastName);
        setBio(data.userData.bio);
        setHobbies(data.userData.hobbies);
    }

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
            <h2>This is the people page</h2>

            <Stack>
                <p>first name: {firstName}</p>
                <p>last name: {lastName}</p>
                <p>bio: {bio}</p>
                <p>hobbies: {hobbies}</p>
                <p>image URLs: {imageUrls}</p>
            </Stack>
        </Box>
    )
}

export default People