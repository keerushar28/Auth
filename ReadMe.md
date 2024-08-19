# Advanced MERN Auth: Email Verification, Password Recovery, and Welcome Emails

Welcome to the Advanced MERN Auth! This project demonstrates how to implement robust authentication features in a MERN stack application, including email verification, password recovery, and welcome emails. The project is designed to help you secure your applications using modern techniques and best practices.

## Features

- **Email Verification**: Automatically send an email verification link to users upon registration to confirm their email address.
- **Password Recovery**: Implement a secure password recovery mechanism using email-based token verification.
- **Welcome Emails**: Send personalized welcome emails to users after successful email verification.
- **Security**: The project uses `bcryptjs` for password hashing, `jsonwebtoken` for secure token generation, and `crypto` for added security in token generation.
- **Modular & Reusable**: You can easily integrate this authentication module into your own applications.

## Tech Stack

- **Backend**:

  - Node.js
  - Express.js
  - MongoDB with Mongoose ORM
  - Mailtrap for email testing
  - JSON Web Tokens (JWT) for secure authentication
  - Environment variables using dotenv
  - Secure password storage with bcryptjs

- **Dev Tools**:
  - Nodemon for live-reloading during development

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/advanced-mern-auth.git
   cd advanced-mern-auth
   ```
2. Install dependencies:
   npm install
3. Set up environment variables:
   Create a .env file in the root directory.
   Add the following variables:
   MONGO_URI=<Your MongoDB URI>
   JWT_SECRET=<Your JWT Secret>
   EMAIL_USER=<Your Mailtrap Email>
   EMAIL_PASS=<Your Mailtrap Password>
4. Start the development server:
   npm run dev

**Usage**
- Email Verification: Upon registration, users will receive an email with a verification link. They must verify their email to activate their account.
- Password Recovery: Users can request a password reset, and they'll receive an email with a link to reset their password.
- Welcome Emails: After successful email verification, users will receive a personalized welcome email.

**Integration**
- This authentication module can be easily integrated into your own projects. The module includes reusable middleware and utilities for handling authentication, making your application more secure with minimal effort.

**Contributing**
- Contributions are welcome! If you have suggestions for improvements or find any bugs, feel free to submit a pull request. Don't forget to give this repository a star if you found it helpful!

**License**
- This project is licensed under the ISC License. See the LICENSE file for details.

**Happy coding! 😊**
- You can adjust the repository URL, credentials, and other details to match your specific project setup.
