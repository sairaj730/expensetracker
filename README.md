# Expense Tracker - Frontend

## Project Overview
This is the frontend application for the Expense Tracker project, built with React. It provides a user-friendly interface to manage personal expenses, track spending across various categories, and visualize financial data.

## Main Motive
The primary goal of this project is to help users gain better control over their finances by offering a simple yet effective tool for expense management. It aims to provide insights into spending habits, facilitate budgeting, and promote financial awareness.

## Features
- User authentication (Login, Signup)
- Add new expenses with amount, category, and date
- View a list of all recorded expenses
- Delete existing expenses
- Visualize expense distribution by category using a pie chart
- Track total expenses

## Technologies Used
- **React:** A JavaScript library for building user interfaces.
- **Axios:** A promise-based HTTP client for making API requests.
- **Chart.js:** A flexible JavaScript charting library for data visualization.
- **React Router DOM:** For declarative routing in React applications.

## Getting Started

### Prerequisites
- Node.js (LTS version recommended)
- npm (Node Package Manager) or Yarn

### Installation
1.  **Clone the repository:**
    ```bash
    git clone <repository_url>
    cd ExpenseTracker/frontend
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

### Running the Application
1.  **Ensure the backend server is running.** (Refer to the `backend/README.md` for instructions on how to start the backend).
2.  **Start the frontend development server:**
    ```bash
    npm start
    # or
    yarn start
    ```
    The application will open in your browser at `http://localhost:3000`.

## Usage
1.  **Sign Up / Log In:** Create a new account or log in with existing credentials.
2.  **Add Expenses:** Use the form on the home page to input expense details (amount, category).
3.  **View and Manage Expenses:** See your expenses listed in a table and visualize your spending patterns in the pie chart. You can also delete individual expenses.

## Project Structure
```
frontend/
├── public/                 # Public assets
├── src/                    # Source code
│   ├── App.js              # Main application component
│   ├── index.js            # Entry point
│   ├── credentials/        # Login and Signup components
│   ├── home/               # Home page and expense management
│   └── ...
├── package.json            # Project dependencies and scripts
└── README.md               # This file
```

## Learn More
For more details on specific React features or troubleshooting, refer to the official React documentation.

---