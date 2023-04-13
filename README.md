# CodeCord

A coding platform with enhanced collaboration and competition features. Create rooms to connect and solve problems together with other coders.

## Project Description

CodeCord is inspired by **<span>binarysearch.com</span>** (which has been shut down for some reason). It is a web application where users can **solve data structures & algorithm problems, give contests every week, maintain contest rating** and streak of solving problems daily similar to leetcode.
Apart from the usual leetcode features, it provides the feature to **create a live room where you can invite your friends to code together**. While creating a room, a user can **either create a contest** to solve specific set of problems within a time limit and compete with their friends **or create a normal room** with a shared editor where both users can code simultaneously.

## Installation:

**Prerequisites:**

1. Git ([Download from here](https://git-scm.com/downloads))
2. Node.js ([Download from here](https://nodejs.org/en/download/))

Step 1: **Fork** the repository
Step 2: **Clone** it to your desktop using the following command

    git clone https://github.com/YOUR-USERNAME/CodeCord.git

Step 3: In the **root** directory run the following **script**:

    npm run setup

Step 4: **Create a .env file in the server directory** using the example file given. The server would not start without this file.

Step 5: Install MongoDB Compass, connect to localhost:27017, **Create a database named codecord** and add two collections problems and problemtags. Import the problems.json and problemtags.json files from the cloned repository into these collections.

Step 6: After the setup, start **two terminals** each for **client** and **server** subdirectories (in VSCode preferably) and run the following script in both.

    npm run dev
    
## How to use the project:

1. To navigate through the pages of the project make sure you have the .env file setup properly with database collections on MongoDB Compass.
2. The landing page provides a footer with links to three main components of the project, Contests, Problems and Discussion. You can even click the login/signup button to navigate to the main page.
3. Currently, you can only use features such as, filtering problems, Creating an Account and Updating your user profile. We are currently working on creating rooms feature.

## ScreenShots:

![Room Design Prototype](/room.png)
![Problems Page](/problems.jpg)
![Contests Page](/contests.jpg)
![User Profile Page](/problems.jpg)

## Links and Resources:

1. [Vercel-Deployment](https://www.codecord.vercel.app/)
2. [Figma Design File](https://www.figma.com/file/8DlxMlZ3GNMAJzfSPmyvxi/CodeCord---Design-File?t=qgqGK3Qh1nPGnsIY-1)

## Tech Stack

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![React JS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express JS](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=Socket.io&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Development Tools

![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![NPM](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![ES Lint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)
![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![VS Code Editor](https://img.shields.io/badge/Visual_Studio_Code-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white)
![Windows OS](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)
