# Peng: A no nonsense dating platform for the serious  
<p align='center'>
    <img src='./src/assets/peng_logo.jpg' width='75%'>
</p>

Peng was designed for people who are serious about making meaningful connections. With a streamlined user profile setup journey—including bio creation, hobby selection, and image uploads—Peng ensures users put their best foot forward. The platform features a familiar swipe mechanism to discover potential matches, and once a match is made, users can instantly chat to take things further. Built for simplicity and authenticity, Peng prioritizes quality over gimmicks, making dating simple and intentional.  

The main features are:

| Features             | Description |
| -------------------- | ----------- |
| Login/Create account | When a user logs in or when a new account is created, a JWT (JSON Web Token) is issued to authenticate the user and provide access to subsequent pages. This JWT is stored in the user's local storage for retrieval.     |
| Fill in bio          | Users are to fill in a bio (i.e., a short description) that describes themselves.        |
| Select hobbies       | Users are to select 3 hobbies, each hobby chip was designed based off Material UI's Chip component.        |
| Upload images        | Users are to select 3 images from files and images are subsequently uploaded to Cloudinary for cloud storage.        |
| Messaging            | Users can message liked users and the messages are dynamically updated and sent to the receipient immediately.        |

## Contents
- [Usage](#usage)
- [Learning points](#learning-points)
    - [Frontend](#frontend)
    - [Backend](#backend)
    - [Others](#others)
- [Guides](#guides)
    - [User guide](#user-guide)
    - [Dev guide](#dev-guide)

## Usage
Visit the website [here]()  
**not deployed just yet, still finishing some tweaks...

## Learning Points
This section covers the technical lessons learnt while building Peng.  

### Frontend
- state management and dynamically updating UI using controlled components and React's hooks (eg. useState, useEffect) for a smooth user experience.
- smooth navigation between pages using React Router and managing dynamic routes with parameters.
- created a simple authentication method to prevent unauthenticated access into pages.
- understanding when to pass data via props vs. using global state/context helped maintain a clean and maintainable component structure.
- implemented controlled inputs for login, signup, and chat messages with client-side validations.
- proper handling of API errors and displaying user-friendly messages
- levraged Material UI's simplified and consistently styled components for UI/UX, adding custom styling and behaviour for a smoother experience. 
- **designed features include**: login/create account, first-time user profile setup journey, messaging feature, swipe and match feature.

### Backend
- database design and queries using Sqlite3, management of multiple tables and relations.
- store user images in cloud storage (Cloudinary) via API.
- implemented token-based authentication using JWT ensured secure messaging. 
- protecting API routes with middleware prevented unauthorized access.
- designing RESTful API endpoints for data transfer to frontend.
- designing RESTful API endpoints for debugging and testing of database.

### Others
- version control using git and github.
- [Cloudinary](https://cloudinary.com/)'s image cloud storage and API.
- [Material UI](https://mui.com/).
- deployment using [vercel](https://vercel.com/)

## Guides
### User guide
Click [here]() for the user guide  
**not written yet, will be uploaded soon!
### Dev guide
Click [here]() for the dev guide  
**not written yet, will be uploaded soon!

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
