# Vendor Management System

## Overview

This application is a Vendor Management System that provides functionalities to manage vendors, purchase orders, and historical performance data. It is built using Node.js and Express.js.

## Features

- **Vendor Management:** Create, read, update, and delete vendor information.
- **Purchase Orders:** Manage purchase orders with functionalities to create, read, update, and delete orders.
- **Historical Performance:** Track and manage historical performance data for vendors.

## Installation

### Prerequisites

- Node.js (>=14.x)
- npm (Node Package Manager)

### Steps

1. **Clone the Repository**

    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install Dependencies**

    ```bash
    npm install
    ```

3. **Start the Application**

    ```bash
    npm start
    ```

    By default, the application will start on `http://localhost:3000`.

## API Endpoints

### Vendor Routes

- **Create a Vendor**
  - `POST /api/vendors`
  - Request Body: JSON with vendor details
  - Example: `{ "name": "Vendor Name", "contactDetails": "Contact Info", "address": "Vendor Address", "onTimeDeliveryRate": 95.5, "qualityRatingAvg": 4.7, "averageResponseTime": 2.5, "fulfillmentRate": 98 }`

- **List Vendors**
  - `GET /api/vendors`
  
- **Get Vendor by ID**
  - `GET /api/vendors/:vendorId`
  - Path Parameter: `vendorId` (integer)

- **Update Vendor**
  - `PUT /api/vendors/:vendorId`
  - Path Parameter: `vendorId` (integer)
  - Request Body: JSON with updated vendor details

- **Delete Vendor**
  - `DELETE /api/vendors/:vendorId`
  - Path Parameter: `vendorId` (integer)

### Purchase Order Routes

- **Create a Purchase Order**
  - `POST /api/purchase-orders`
  - Request Body: JSON with purchase order details
  - Example: `{ "vendorId": 1, "orderDate": "2024-08-20", "deliveryDate": "2024-09-01", "items": "Item A, Item B", "quantity": 100, "status": "pending", "qualityRating": 4.5, "issueDate": "2024-08-20", "acknowledgmentDate": "2024-08-21" }`

- **List Purchase Orders**
  - `GET /api/purchase-orders`
  
- **Get Purchase Order by ID**
  - `GET /api/purchase-orders/:poId`
  - Path Parameter: `poId` (integer)

- **Update Purchase Order**
  - `PUT /api/purchase-orders/:poId`
  - Path Parameter: `poId` (integer)
  - Request Body: JSON with updated purchase order details

- **Delete Purchase Order**
  - `DELETE /api/purchase-orders/:poId`
  - Path Parameter: `poId` (integer)

### Historical Performance Routes

- **Create Historical Performance Data**
  - `POST /api/historical_performance`
  - Request Body: JSON with historical performance data
  - Example: `{ "vendorId": 1, "date": "2024-08-20", "onTimeDeliveryRate": 95.5, "qualityRatingAvg": 4.7, "averageResponseTime": 2.5, "fulfillmentRate": 98 }`

- **Get Historical Performance by Vendor ID**
  - `GET /api/historical_performance/vendor/:vendorId`
  - Path Parameter: `vendorId` (integer)

- **Update Historical Performance Data**
  - `PUT /api/historical_performance/:performanceId`
  - Path Parameter: `performanceId` (integer)
  - Request Body: JSON with updated historical performance data

- **Delete Historical Performance Data**
  - `DELETE /api/historical_performance/:performanceId`
  - Path Parameter: `performanceId` (integer)

## Error Handling

Errors are handled by middleware and logged using a logging configuration. If an error occurs, a JSON response with status `500` and an error message is returned.

## Contributing

Feel free to fork the repository and submit pull requests. For significant changes or improvements, please open an issue first to discuss your proposed changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

