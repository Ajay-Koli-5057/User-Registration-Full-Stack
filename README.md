# Project Setup Guide

## Prerequisites

1. **Clone the Frontend and Backend Repositories**
   - Clone the repositories to your local machine using `git clone https://github.com/Ajay-Koli-5057/User-Registration-Full-Stack.git`.
   - GITHUB URL :- `https://github.com/Ajay-Koli-5057/User-Registration-Full-Stack.git`.

2. **Ensure XAMPP is Installed**
   - Make sure you have XAMPP installed on your system for the database setup.

## Database Setup

1. **Start XAMPP**
   - Launch XAMPP and start the MySQL module.

2. **Import the Database**
   - Obtain the SQL file for the database.
   - Open phpMyAdmin in your browser (usually at `http://localhost/phpmyadmin`).
   - Create a new database with the same name as specified in the backend code.
   - Import the SQL file into this newly created database.

## Backend Setup

1. **Clone the Backend Repository**
   - Navigate to the directory where you cloned the backend repository.

2. **Install Node Modules**
   - Run the following command to install the required node modules:
     ```sh
     npm install --legacy-peer-deps
     ```
     or
     ```sh
     npm install
     ```

3. **Start the Backend Server**
   - Start the backend server using the command:
     ```sh
     npm start
     ```
   - Ensure the backend is running on port `8081`.

## Frontend Setup

1. **Clone the Frontend Repository**
   - Navigate to the directory where you cloned the frontend repository.

2. **Install Node Modules**
   - Run the following command to install the required node modules:
     ```sh
     npm install --legacy-peer-deps
     ```
     or
     ```sh
     npm install
     ```

3. **Start the Frontend Server**
   - Start the frontend server on your local machine using the command:
     ```sh
     npm start
     ```

**NOTE**: After starting the backend, ensure that it is running on port `8081`.
