# Edupay - A Web-Based Payment Management System

EduPay is a web-based system designed to manage student fee payments in educational institutions. It allows administrators to add students and track payment details, while students can view their fee information through their dashboard. The system helps reduce manual work and improves the organization of fee management.

## Tech Stack

**Client:** React JS, TailwindCSS, Shadcn

**Server:** Node JS, Express JS, MongoDB

## Installation Steps

Clone this repository

```bash
git clone https://github.com/Fay4z/EduPay.git
```

Move into client folder and install the required dependencies

```bash
cd client
npm install
```

Move into sever folder and install the required dependencies

```bash
cd server
npm install
```

Create .env in the server root folder (\server) and set the variables accordingly

```bash
PORT = 3000
MONGO_URL="yourmongdburl"
JWT_SECRET="yourjwtsecret"
```

Run the client

```bash
npm run dev
```

Run the server

```bash
npm start
```
