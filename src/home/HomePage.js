import React, { useState, useMemo, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import "./HomePage.css";
import CustomSelect from "../components/CustomSelect/CustomSelect"; // Import CustomSelect
import axios from "axios";

import { FiCoffee, FiShoppingCart, FiHome, FiTruck, FiTool, FiSmile, FiMonitor, FiTrendingUp, FiDollarSign, FiPlusCircle, FiMoreHorizontal } from 'react-icons/fi';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const api = axios.create({
  baseURL: "http://localhost:8081",
  withCredentials: true, // Send cookies with requests
});

const expenseCategories = [
  { name: "Food & Drinks", icon: "FiCoffee" },
  { name: "Shopping", icon: "FiShoppingCart" },
  { name: "Housing", icon: "FiHome" },
  { name: "Transportation", icon: "FiTruck" },
  { name: "Vehicle", icon: "FiTool" },
  { name: "Life & Entertainment", icon: "FiSmile" },
  { name: "Communication, PC", icon: "FiMonitor" },
  { name: "Financial Expenses", icon: "FiTrendingUp" },
  { name: "Investments", icon: "FiDollarSign" },
  { name: "Income", icon: "FiPlusCircle" },
  { name: "Others", icon: "FiMoreHorizontal" },
];

// Map of icon names to components
const IconMap = {
  FiCoffee,
  FiShoppingCart,
  FiHome,
  FiTruck,
  FiTool,
  FiSmile,
  FiMonitor,
  FiTrendingUp,
  FiDollarSign,
  FiPlusCircle,
  FiMoreHorizontal,
};

export default function HomePage({ user }) {
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (user) {
      api.get("/api/expenses", { params: { userId: user.id } }).then((response) => {
        setExpenses(response.data);
      }).catch(error => {
        console.error("Error fetching expenses", error);
      });
    }
  }, [user]);

  const handleAddExpense = () => {
    if (!amount || !category || isNaN(amount)){
      alert("Please enter a valid amount and select a category.");
      return;
    }
    const newExpense = {
      amount: amount,
      category: category,
      date: new Date().toISOString().slice(0, 10), // YYYY-MM-DD
      user: user
    };

    api.post("/api/expenses", newExpense).then(response => {
        // After adding, re-fetch expenses to ensure aggregated view is up-to-date
        api.get("/api/expenses", { params: { userId: user.id } }).then((response) => {
          setExpenses(response.data);
        }).catch(error => {
          console.error("Error fetching expenses after add", error);
        });
        setAmount("");
        setCategory("");
    }).catch(error => {
        console.error("Error adding expense", error);
        alert("Failed to add expense. Please try again.");
    });
  };

  const handleDeleteExpense = (id) => {
    api.delete(`/api/expenses/${id}`, { params: { userId: user.id } }).then(() => {
        // After deleting, re-fetch expenses to ensure aggregated view is up-to-date
        api.get("/api/expenses", { params: { userId: user.id } }).then((response) => {
          setExpenses(response.data);
        }).catch(error => {
          console.error("Error fetching expenses after delete", error);
        });
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

  const chartOptions = {
    plugins: {
      legend: {
        labels: {
          color: 'white',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        bodyColor: 'white',
        titleColor: 'white',
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed);
            }
            return label;
          }
        }
      },
    },
  };

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
      <h1>Expense Tracker</h1>
      <h2 className="welcome-message">Welcome, {user.firstName}!</h2>

      <div className="main-content">
        <div className="left-section">
          <div className="form-section">
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />

            <CustomSelect
              options={expenseCategories.map(cat => ({
                name: cat.name,
                icon: IconMap[cat.icon]
              }))}
              value={category}
              onChange={setCategory}
            />

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
                      <td>
                        {(() => {
                          const categoryData = expenseCategories.find(c => c.name === exp.category);
                          if (categoryData) {
                            const IconComponent = IconMap[categoryData.icon];
                            return (
                              <>
                                {IconComponent && <IconComponent style={{ marginRight: '5px' }} />}
                                {exp.category}
                              </>
                            );
                          }
                          return exp.category;
                        })()}
                      </td>
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
            <Pie data={chartData} options={chartOptions} />
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
