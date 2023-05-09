# CodeCord

<p align="center">
  <img src="/client/public/svg/logo.svg" alt="CodeCord-logo" />
</p>

A coding platform with enhanced collaboration and competition features. Create rooms to connect and solve problems together with other coders 👨🏻‍💻.

## Project Description

CodeCord is a web application that draws inspiration from the now-defunct binarysearch.com. It offers a platform for users to engage in **problem-solving** by tackling data structures and algorithm challenges. Additionally, users have the opportunity to participate in weekly contests, track their contest ratings, and maintain a streak of daily problem-solving.

In addition to the core features found on platforms like leetcode.com, CodeCord introduces a unique capability: the ability to **create live coding rooms**. These rooms enable users to invite their friends and collaborate on coding tasks together. Within a coding room, users have the flexibility to either initiate a contest, where a specific set of problems must be solved within a time limit, allowing for friendly competition among participants, or create a normal room where multiple users can code simultaneously using a shared editor.

CodeCord combines problem-solving, competition, and collaborative coding in a single platform, providing an enriched coding experience for users.

## Installation

**Prerequisites:**

1. Git: Install Git from [here](https://git-scm.com/downloads).
2. Node.js: Install Node.js from [here](https://nodejs.org/en/download/).

Follow the steps below to install and set up CodeCord:

#### Step 1: Fork the repository

- Go to the CodeCord repository on GitHub.
- Click on the "Fork" button to create a copy of the repository in your GitHub account.

#### Step 2: Clone the repository

- Open a terminal or command prompt.
- Run the following command to clone the repository to your desktop:

  ```shell
  git clone https://github.com/YOUR-USERNAME/CodeCord.git
  ```

#### Step 3: Install dependencies and set up

- Navigate to the root directory of the cloned repository.
- Run the following commands to install the required dependencies and set up CodeCord:

  ```shell
  npm install
  npm run setup
  ```

#### Step 4: Create a .env file in the server directory

- Navigate to the server directory in the cloned repository.
- Create a file named `.env`.
- Use the provided example file as a reference to set up the necessary configuration in the `.env` file. Note that the server won't start without this file.

#### Step 5: Install and configure MongoDB

- Install MongoDB Compass from the official website.
- Connect to `localhost:27017` using MongoDB Compass.
- Create a database named "codecord".
- Add two collections: "problems" and "problemtags".
- Import the `problems.json` and `problemtags.json` files from the cloned repository into their respective collections.

#### Step 6: Start the development servers

- Open two terminals or command prompts.
- In one terminal, navigate to the client subdirectory.
- In the other terminal, navigate to the server subdirectory.
- Run the following command in both terminals to start the development servers:

  ```shell
  npm run dev
  ```

Make sure to follow each step carefully to properly install and run CodeCord 😄.

## How to use the project:

1. To navigate through the pages of the project make sure you have the .env file setup properly with database collections on MongoDB Compass.
2. The landing page provides a footer with links to three main components of the project, Contests, Problems and Discussion. You can even click the login/signup button to navigate to the main page.
3. Currently, you can only use features such as:
   - filtering problems
   - creating an Account
   - updating your user profile
   - creating and joining rooms

## ScreenShots:

![Contests Page](/contests.jpg)
![Problems Page](/problems.jpg)
![Create Room Modal](/create-room.jpg)
![Room Design Prototype](/room.jpg)
![Room Participants List](/room-participants.jpg)
![User Profile Page](/profile.jpg)

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
