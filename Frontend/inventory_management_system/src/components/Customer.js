import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function Customer() {
    const { theme } = useContext(ThemeContext); // Access the current theme
    const [customerData, setCustomerData] = useState([]);

    useEffect(() => {
        getCustomers();
    }, []);

    const getCustomers = async () => {
        try {
            const res = await fetch("http://localhost:3001/customers", {
                method: "GET",
                headers: { "Content-Type": "application/json" }
            });
            const data = await res.json();
            if (res.status === 201) {
                console.log("Customer data retrieved.");
                setCustomerData(data);
            } else {
                console.log("Failed to retrieve data.");
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteCustomer = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/deletecustomer/${id}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" }
            });

            if (response.status === 201) {
                console.log("Customer deleted successfully");
                getCustomers();
            } else {
                console.log("Failed to delete customer");
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div
            className="container-fluid p-5"
            style={{
                backgroundColor: theme.background,
                color: theme.text,
                minHeight: '100vh',
                transition: theme.transition,
            }}
        >
            <h1 style={{ color: theme.text, transition: theme.transition }}>Customer Directory</h1>

            <div className="add_button mb-3">
                <NavLink
                    to="/insertcustomer"
                    className="btn"
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.text,
                        fontSize: '1.25rem',
                        borderRadius: theme.borderRadius,
                        transition: theme.transition,
                    }}
                >
                    + Add New Customer
                </NavLink>
            </div>

            <div
                className="overflow-auto mt-3"
                style={{
                    maxHeight: "38rem",
                    border: `1px solid ${theme.primary}`,
                    borderRadius: theme.borderRadius,
                }}
            >
                <table
                    className="table table-striped table-hover mt-3 fs-5"
                    style={{
                        backgroundColor: theme.background,
                        color: theme.text,
                        transition: theme.transition,
                    }}
                >
                    <thead>
                        <tr style={{ backgroundColor: theme.primary, color: theme.text }}>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customerData.map((customer, id) => (
                            <tr key={customer._id}>
                                <th scope="row">{id + 1}</th>
                                <td>{customer.CustomerName}</td>
                                <td>{customer.CustomerEmail}</td>
                                <td>{customer.CustomerPhone}</td>
                                <td>
                                    <NavLink
                                        to={`/updatecustomer/${customer._id}`}
                                        className="btn"
                                        style={{
                                            backgroundColor: theme.primary,
                                            color: theme.text,
                                            transition: theme.transition,
                                        }}
                                    >
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </NavLink>
                                </td>
                                <td>
                                    <button
                                        className="btn"
                                        style={{
                                            backgroundColor: 'red',
                                            color: '#fff',
                                            transition: theme.transition,
                                        }}
                                        onClick={() => deleteCustomer(customer._id)}
                                    >
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
