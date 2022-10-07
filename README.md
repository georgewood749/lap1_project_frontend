# Maulorum - Blog Project

## Project Description
This project is a small journaling website allowing users to create posts that are then displayed as a thread.

## Installation and Usage
### Installation
- Frontend hosted on Netlify: https://maulorum.netlify.app/#
- Backend hosted on Render: https://maulers-server.onrender.com/

### Usage
- Users can use the top box to create a post including text (limited to 180 characters) and a gif (fetched from giphy), under a pseudonym of their choice (author).
- To add a gif
  1. Type for desired gif in search bar
  2. Click "Add Gif" button
  3. Select desired one
- Click submit when your post is ready

- Previous posts are displayed in the bottom box and can be scrolled through using the arrows. 
- Users can react with emojis as well as comment on the posts.
- Available buttons must be used to add and submit (enter key has been disabled)

## Technologies
### HTML/CSS
- HTML has been used for the content and general layout of the site.
- CSS has been used to style the site and fine tune the layout.

### JavaScript
- JavaScript has been used for runnin ght eserver in the backend and for the functionality of the frontend.

## Process
- We started by creating a separate repository for the frontend and for the backend
- After forming the basic structure we hosted the repos online
- We then designed the layout for the frontend using figma
- Once the views had been designed, we got started with building the layout of the site
- We set up the giphy functionality, using their search API
- Next we set up a function to fetch data from the backend and display it on page
- Once we had sorted out issues with the hosted backend, we were able to write a function to post submitted data to the server
- After the main functionality had been achieved, we moved on to more minute features, such as moving between posts and handling reactions.
- We added some final touches in regards to styling and small QOL improvements