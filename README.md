# Base-X

Base-X is a full-stack application built with React, Node.js, Express, and MongoDB. Frontend is built using React with TypeScript, Material-UI for styling, and Zustand for state management. Backend is built using Node.js, Express, and Mongoose for MongoDB integration. Application includes user authentication, profile management, and various modules like dashboard, timesheet, order placement, delivery, site management, and site reports.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Features

- User authentication (login, register)
- Profile management
- Dashboard
- Timesheet management
- Order placement
- Delivery management
- Site management
- Site reports

## Project Structure

``` 
basex/
├── backend/
│ ├── controllers/
│ │ ├── authController.ts
│ │ └── profileController.ts
│ ├── models/
│ │ ├── User.ts
│ │ └── Profile.ts
│ ├── routes/
│ │ ├── authRoutes.ts
│ │ └── profileRoutes.ts
│ ├── middlewares/
│ │ └── authMiddleware.ts
│ ├── config/
│ │ └── db.ts
│ ├── utils/
│ │ └── generateToken.ts
│ ├── .env
│ ├── .gitignore
│ ├── tsconfig.json
│ ├── package.json
│ ├── server.ts
└── frontend/
│    ├── src/
│      ├── assets/
│      ├── components/
│      │ ├── common/
│      │ ├── layout/
│      │ │ ├── TopBar.tsx
│      │ │ ├── Sidebar.tsx
│      │ │ └── Layout.tsx
│      │ ├── specific/
│      ├── hooks/
│      ├── pages/
│      ├── stores/
│      ├── utils/
│   ├── App.tsx
│   ├── index.tsx
├── .env
├── .gitignore
├── tsconfig.json
├── package.json
├── README.md 
```

## Setup Instructions

### Backend Setup

1. **Navigate to the backend directory:**

    ```bash
    cd nodejs_api
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file and configure your environment variables:**

    ```
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/basex
    JWT_SECRET=basex-development
    ```

4. **Run the backend server:**

    ```bash
    npm run dev
    ```

    The backend server should now be running on `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the frontend directory:**

    ```bash
    cd client
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Create a `.env` file and configure your environment variables:**

    ```
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. **Run the frontend server:**

    ```bash
    npm start
    ```

    The frontend server should now be running on `http://localhost:3000`.

## Usage

1. **Open your browser and navigate to the frontend URL:**

    ```
    http://localhost:3000
    ```

2. **Register a new user or log in with an existing user.**

3. **Navigate through different modules using the sidebar and top bar:**
    - Dashboard
    - Timesheet
    - Order Placement
    - Delivery
    - Site Management
    - Site Reports

4. **Update your profile:**
    - Click on the avatar in the top bar to open the menu.
    - Select "Profile" to view and update your profile details.
    - Select "Logout" to log out.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React](https://reactjs.org/)
- [Material-UI](https://mui.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

