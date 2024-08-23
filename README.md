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

## Installation

### Backend

1. Clone the repository:
   ```bash
   git clone <repository-url>
