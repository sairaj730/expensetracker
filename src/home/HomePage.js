import React, { useState, useMemo, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./HomePage.css";
import axios from "axios";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const api = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true, // Send cookies with requests
});

const expenseCategories = [
  "Housing",
  "Utilities",
  "Groceries",
  "Transportation",
  "Healthcare",
  "Insurance",
  "Entertainment",
  "Education",
  "Savings",
  "Debt Repayment",
  "Personal Care",
  "Dining Out",
  "Miscellaneous",
];

export default function HomePage({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (user) {
      api.get("/api/expenses").then((response) => {
        setExpenses(response.data);
      }).catch(error => {
        console.error("Error fetching expenses", error);
      });
    }
  }, [user]);

  const handleAddExpense = () => {
    if (!amount || !category) return;
    const newExpense = {
      amount: parseFloat(amount),
      category: category,
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
    };

    api.post("/api/expenses", newExpense).then(response => {
        setExpenses((prev) => [...prev, response.data]);
        setAmount("");
        setCategory("");
    }).catch(error => {
        console.error("Error adding expense", error);
        alert("Failed to add expense. Please try again.");
    });
  };

  const handleDeleteExpense = (id) => {
    api.delete(`/api/expenses/${id}`).then(() => {
        setExpenses(prev => prev.filter(exp => exp.id !== id));
    }).catch(error => {
        console.error("Error deleting expense", error);
        alert("Failed to delete expense. Please try again.");
    });
  };

  const chartData = useMemo(() => {
    const aggregatedExpenses = expenses.reduce((acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});

    return {
      labels: Object.keys(aggregatedExpenses),
      datasets: [
        {
          data: Object.values(aggregatedExpenses),
          backgroundColor: [
            "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
            "#9966FF", "#FF9F40", "#66FF66", "#FF6666",
            "#00CED1", "#FFD700", "#FF4500", "#ADFF2F",
            "#DA70D6"
          ],
        },
      ],
    };
  }, [expenses]);

  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  if (!user) {
    return (
        <div className="homepage">
            <div className="logged-out-message">
                <h1>Welcome to Expense Tracker</h1>
                <p>Please log in or sign up to manage your expenses.</p>
            </div>
        </div>
    );
  }

  return (
    <div className="homepage">
      <h2 className="welcome-message">Welcome, {user.email}!</h2>
      <h1>Expense Tracker</h1>

      <div className="main-content">
        <div className="left-section">
          <div className="form-section">
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {expenseCategories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <button onClick={handleAddExpense}>Add Expense</button>
          </div>

          <div className="table-section">
            <h2>Recent Expenses</h2>
            {expenses.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map((exp) => (
                    <tr key={exp.id}>
                      <td>{exp.category}</td>
                      <td>${exp.amount.toFixed(2)}</td>
                      <td><button onClick={() => handleDeleteExpense(exp.id)} className="btn-delete">Delete</button></td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td><b>Total</b></td>
                    <td colSpan="2"><b>${totalExpenses.toFixed(2)}</b></td>
                  </tr>
                </tfoot>
              </table>
            ) : (
              <p className="no-data">No expenses added yet.</p>
            )}
          </div>
        </div>

        <div className="chart-section">
          {expenses.length > 0 ? (
            <Pie data={chartData} />
          ) : (
            <div className="no-data-chart">
                <h3>No Data for Chart</h3>
                <p>Add some expenses to see a breakdown.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
