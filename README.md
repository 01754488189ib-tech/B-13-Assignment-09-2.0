# PetHouse - Full-Stack Pet Adoption Platform

A full-stack pet adoption portal built using the MERN stack and Next.js App Router. The platform allows users to explore shelter pets, view profiles, and submit adoption requests. It also enables owners to list pets, handle adoptions, and manage their dashboard.

## Purpose
The purpose of **PetHouse** is to bridge the gap between pet shelters/owners and animal lovers looking to adopt. It provides a secure, lightweight, and responsive portal where users can browse, search, and filter pets, submit pickup details, and track request statuses. At the same time, pet owners can list new pets, update profiles, and approve or reject incoming requests.

---

## Live Links
* **Client Site URL:** [https://github.com/01754488189ib-tech/B-13-Assignment-09-2.0](https://b-13-assignment-09-2-0.vercel.app)
* **Server API URL:** [https://github.com/01754488189ib-tech/B-13-Assignment-09-Server-2.0](https://pet-adoption-platform-server.onrender.com)

---

## Key Features
* **Authentication via HTTPOnly Cookies:** Leverages `better-auth` on the client side synchronized to secure JWT tokens stored inside HTTPOnly cookies on the backend. This protects private routes and prevents premature login redirections during route reloads.
* **Advanced Search & Multi-Species Filter:** Users can search available pets by name using fuzzy matching (MongoDB `$regex`) and narrow down results by filtering multiple species (MongoDB `$in`) on a single catalog view.
* **Comprehensive Adoption Controls:** Owners are restricted from submitting adoption requests on their own pets. The details page dynamically displays user-specific application states (Pending, Approved, Rejected) based on live records.
* **Single-Approval Adoption Workflow:** When a pet owner approves a request from the interactive requests modal, the backend updates the pet's status to "adopted" and automatically blocks/rejects all other pending applications for that pet.
* **Interactive Dashboard Layouts:** Includes custom layout architectures with secure routing proxies, hydration-safe mounting rules, and custom backdrop confirmation dialogs from Hero UI.
* **CRUD Management:** Pet owners can list new pets with comprehensive health and location details, update profile records through dynamic edit fields, and remove listings with safe cancellation modal prompts.

---

## Tech Stack & NPM Packages Used

### Client-Side (Next.js App Router)
* **Core Framework:** Next.js (React 19, React DOM 19)
* **Authentication:** `better-auth` (with MongoDB adapter support)
* **Component Library:** `@heroui/react`
* **Icons:** `react-icons`, `@gravity-ui/icons`
* **Notifications:** `react-hot-toast`
* **Tabs component:** `react-tabs`

### Server-Side (Express.js & MongoDB)
* **Web Framework:** `express`
* **Database Driver:** `mongodb` (Node.js official MongoDB driver)
* **Authorization Security:** `jsonwebtoken`
* **Cookie Parser:** `cookie-parser`
* **Cross-Origin Security:** `cors`
* **Environment variables:** `dotenv`

---

## Local Environment Setup Templates

### 1. Server Environment Configuration
Create a `.env` file inside your server directory:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?appName=<app>
ACCESS_TOKEN_SECRET=3b7899fd8d3df9bc6f15cb62e24d262d057a627da970d4c9d5ec5fb58d20b66b744bb649b068307dbb34f7831f1fc80c05e1975e11ec9a37e50c4bb21a646c24