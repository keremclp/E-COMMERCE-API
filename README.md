# E-Commerce API

## Project Overview

This project involves developing a comprehensive and secure API for an e-commerce platform that handles user registration, authentication, and various functionalities typical of e-commerce projects.

I spearheaded the development of this E-Commerce API, integrating essential features such as:

- **User registration and login**
- **Secure JWT-based authentication via cookies**
- **Role-based authorization**

The project leveraged **Node.js** for the backend, **MongoDB** for the database, and the **DocGen** package for documentation, ensuring a well-documented and maintainable codebase. The E-Commerce API provides a robust and secure foundation for e-commerce operations, enabling efficient user management and secure transactions.

Role-based authorization ensures appropriate access controls, while comprehensive documentation facilitates easier maintenance and scalability of the project.

## Key Features

- **User Registration and Login**: Handles new user sign-ups and login functionality with security best practices.
- **JWT Authentication**: Utilizes JSON Web Tokens (JWT) with cookies to manage authentication securely.
- **Role-Based Authorization**: Implements role-based access control to restrict and grant permissions based on user roles (e.g., admin, customer).
- **Comprehensive Documentation**: Documentation generated using DocGen to ensure clarity and ease of maintenance.

## Technologies Used

- **Node.js**: Backend framework for handling server-side operations.
- **MongoDB**: NoSQL database for storing user data and e-commerce-related information.
- **JWT**: JSON Web Tokens for secure authentication via cookies.
- **Role-Based Authorization**: Implemented for fine-grained access control across the platform.
- **DocGen**: Used to generate documentation for the API.

## Project Deployment

The project is deployed and can be accessed at the following URL:

[E-Commerce API Deployment](https://e-commerce-api-ikbz.onrender.com/)

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/e-commerce-api.git
   cd e-commerce-api

2. Install dependencies:

   ```bash
   npm install

3. Set up environment variables:
  Create a .env file in the root directory and add the necessary environment variables such as database URI, JWT secret, and any other required configurations.

4. Start the server:
   ```bash
   npm start
   
## Environment Variables
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_LIFETIME=your_jwt_lifetime
PORT=5000


## Running the Application
  ````bash
   npm start
