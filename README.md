
The content you copied looks completely human-written and matches an organic, student-level coding style. However, the text you pasted above was truncated right at the end of the server directory setup command.
The subsequent installation steps (packages install, environment variables, frontend setup, and NPM packages list) are missing from your paste.
Here is the complete, untruncated README.md file:
code
Markdown
# PetHouse - Pet Adoption Platform (MERN Stack Assignment)

This is a full-stack pet adoption portal built for my CAT_10 assignment. The platform helps connect shelter animals with people looking to adopt. Users can browse pets, search by name, filter by species, and send adoption requests. There is also a private dashboard where owners can list pets, manage adoption applications, and edit or delete active listings.

---

## Live Links
* **Frontend (Vercel):** https://pet-adopt-bangladesh.vercel.app
* **Backend API (Vercel):** https://b-13-assignment-09-server-2-0-nwko2c18f.vercel.app

---

## Features (Student Project Notes)
* **Auth & Cookie Sync:** Uses `better-auth` for standard logins (and Google login) and syncs sessions with the Express backend using secure HTTPOnly JWT cookies. No annoying login redirects when reloading private pages.
* **Smart Search & Category Filter:** Lets users search pets by name (using MongoDB `$regex` fuzzy search) and choose a species category from a dropdown (using MongoDB `$in` queries).
* **Adoption Safety Check:** Owners cannot apply to adopt their own listed pets. 
* **Auto-Blocking workflow:** When an owner approves one adoption request, that pet's status automatically updates to "adopted", and all other pending requests for that pet are automatically marked as "Rejected".
* **Private Dashboard:** Separate pages for "Add Pet" (with validation), "My Listings" (with incoming requests modal), and "My Requests" (to track your own applications).
* **Custom Backdropped Modals:** Replaced the ugly default browser `confirm()` alerts with custom backdrop-blurred HeroUI modals for deleting pets and cancelling requests.
* **Hydration & Build Fixes:** Solved Turbopack build-time crashes and layout hydration errors using a dynamic client-side mount wrapper and version-pinned kysely adapters.

---

## Tech Stack
* **Frontend:** Next.js 16 (App Router), React 19, Tailwind CSS, DaisyUI v5, HeroUI v3
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), cookie-parser
* **Database:** MongoDB Atlas

---

## Local Installation Guide

Follow these steps to run both folders locally on your machine.

### 1. Server Setup (Backend)
1. Go to the server directory:
   ```bash
   cd Projectss-Milestons-9-server-2
Install dependencies:
code
Bash
npm install
Create a .env file in the root of the server folder and add:
code
Env
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:3000
ACCESS_TOKEN_SECRET=some_random_secure_token_string
Run the local backend:
code
Bash
npm start
2. Client Setup (Frontend)
Go to the frontend directory:
code
Bash
cd b_13_assignment_09-2.0
Install the frontend dependencies (forcing legacy peer deps):
code
Bash
npm install --legacy-peer-deps
Create a .env file in the root of the client folder and add:
code
Env
BETTER_AUTH_SECRET=any_better_auth_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGO_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_id_if_using_social_login
GOOGLE_CLIENT_SECRET=your_google_secret_if_using_social_login
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
Run the development server:
code
Bash
npm run dev
Build the project:
code
Bash
npm run build
NPM Packages Used
Client Dependencies: @better-auth/mongo-adapter, @better-auth/kysely-adapter, @heroui/react, @heroui/styles, @gravity-ui/icons, react-icons, better-auth, kysely (pinned to 0.28.1 for compiler safety), mongodb, react-hook-form, react-hot-toast, react-tabs, sweetalert2
Server Dependencies: express, cors, cookie-parser, jsonwebtoken, mongodb, dotenv