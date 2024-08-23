# Channel Partner Lead Management System

## Overview

This project is a full-stack Lead Management System designed to manage channel partner leads. It includes a Node.js backend API and a React.js frontend application, with MySQL as the database.

## Features

- **User Management**: Register, login, and logout functionality.
- **Leads Management**: Create, filter, fetch, and export leads in CSV format.
- **Channel Partner Management**: Fetch and create channel partners.

## Technologies Used

- **Backend**: Node.js, Express.js
- **Frontend**: React.js
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Token)
- **CSV Export**: `csv-writer` package

## Login And SignUp Pages

<div> 
  <img src="https://github.com/user-attachments/assets/2d1d87a7-8047-4643-9945-cf136d603206" width="350" height="250px">
    <img src="https://github.com/user-attachments/assets/0d66ffb8-fda4-4a5a-88b3-3267d4046a64" width="350" height="250px">
</div>

## DashBoard Page 
<div> 
  <img src="https://github.com/user-attachments/assets/33970b02-9b9d-4c93-9e0a-e436c81e053a" width="600" height="250px">
</div>

## Channel partner dashboard View And Add

<div> 
  <img src="https://github.com/user-attachments/assets/b811e500-399b-4c08-98f8-d41a8f378601" width="350" height="250px">
    <img src="https://github.com/user-attachments/assets/b312d1bf-4ecb-4a4f-ada9-bd024522722d" width="450" height="250px">
</div>

## Lead dashboard View , Add , Filter , Download CSV File
### ADD Lead
<div> 
  <img src="https://github.com/user-attachments/assets/b2f3189e-0b81-4a64-b57d-3e01ef8c2b15" width="350" height="450px">
</div>

### View Lead
<div> 
  <img src="https://github.com/user-attachments/assets/d17b2acf-7f96-4025-b5de-e4f6c018bde5" width="600" height="300px">
</div>

### Filter Lead
<div> 
  <img src="https://github.com/user-attachments/assets/ab769e22-2eec-4088-bab9-62233ab5e2cd" width="700" height="100px">
</div>

### Download Lead CSV file
<div> 
  <img src="https://github.com/user-attachments/assets/d588c7c9-1466-448d-af26-d0aecdafbaac" width="300" height="100px">
</div>

<div> 
    <img src="https://github.com/user-attachments/assets/5cdfcdbc-b8f8-4400-9fbd-c5fc61b5b27e" width="450" height="250px">
</div>

  ### Backend Environment Variables File

    - **Purpose:** Environment variables are used to store sensitive information securely and can be configured in a `.env` file or through your deployment environment.

    - **Example:**
   <div> 
   <img src="https://github.com/user-attachments/assets/269ae9a3-d418-4be2-867b-50866e3b804c" width="400" height="200px">
  </div>

## API Endpoints

### UserController

- **Register**: `POST http://localhost:8080/api/v1/user/register`
- **Login**: `POST http://localhost:8080/api/v1/user/login`
- **Logout**: `POST http://localhost:8080/api/v1/user/logout`

### LeadsController

- **Create Lead**: `POST http://localhost:8080/api/v1/leads/create`
- **Filter Leads**: `GET http://localhost:8080/api/v1/leads/filter`
- **Export Leads as CSV**: `GET http://localhost:8080/api/v1/leads/csv`
- **Fetch Leads**: `GET http://localhost:8080/api/v1/leads/fetch`

### ChannelPartnerController

- **Fetch Channel Partners**: `GET http://localhost:8080/api/v1/channelPartner/fetch`
- **Create Channel Partner**: `POST http://localhost:8080/api/v1/channelPartner/create`

