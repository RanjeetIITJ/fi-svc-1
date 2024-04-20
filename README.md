# Financial Insights Service (fi-svc-1)

Fi-Svc-1 is a basic financial insights service that allows users to input their financial transactions and get insights into their spending habits. The service provides a simple UI for inputting transactions and viewing insights.

## Features

- Frontend:
  - Transaction Input Screen: A form to input transaction details (e.g., date, amount, category, description).
  - Insights Screen: Display basic insights, such as total spending per category.

- Backend:
  - RESTful API to accept transaction data and store it in a database.
  - API to calculate and return insights based on the stored transactions.

- Database:
  - MongoDB: A NoSQL database to efficiently store transaction data.

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- Python and Flask installed on your machine.
- MongoDB installed locally.

### Installation

1. Clone the repository:
  create a directory "fi-svc-1" and clone the repo inside that directory by running the commans git clone in a terminal
   
Navigate to the project directory:
  - cd fi-svc-1

Install dependencies for frontend:
  - npm install

Install dependencies for backend:
 - pip install -r requirements.txt
 
Configuration
  - Set up MongoDB:
If using a local MongoDB instance, make sure it's running on your machine.

Configure backend:
  -Modify the backend code to use the appropriate MongoDB connection settings.

Usage
Start the frontend:
  -npm start
  
Start the backend:
  -python app.py


Access the application in your web browser at http://localhost:3000.

API Endpoints
POST /api/transactions: Add a new transaction.
GET /api/insights: Get insights into spending habits.
