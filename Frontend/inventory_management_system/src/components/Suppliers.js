import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function Suppliers() {
    const { theme } = useContext(ThemeContext); // Access theme context
    const [suppliersData, setSuppliersData] = useState([]);

    // Fetch supplier data from the backend
    const getSuppliers = async () => {
        try {
            const res = await fetch("http://localhost:3001/suppliers", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (res.status === 200) {
                const data = await res.json();
                setSuppliersData(data); // Update state with fetched data
                console.log("Suppliers retrieved:", data);
            } else {
                console.log("Failed to retrieve suppliers.");
            }
        } catch (err) {
            console.error("Error fetching suppliers:", err);
        }
    };

    const deleteSupplier = async (id) => {
        try {
            const response = await fetch(`http://localhost:3001/deletesupplier/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.status === 200) {
                setSuppliersData(suppliersData.filter((supplier) => supplier._id !== id)); // Update UI on delete
                console.log("Supplier deleted");
            } else {
                console.error("Failed to delete supplier.");
            }
        } catch (err) {
            console.error("Error deleting supplier:", err);
        }
    };

    // Load suppliers when the component mounts
    useEffect(() => {
        getSuppliers();
    }, []);

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
            <h1 style={{ color: theme.text, transition: theme.transition }}>Suppliers</h1>
            <div className="add_button mb-3">
                <NavLink
                    to="/insertsupplier"
                    className="btn"
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.text,
                        fontSize: '1.25rem',
                        borderRadius: theme.borderRadius,
                        transition: theme.transition,
                    }}
                >
                    + Add New Supplier
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
                            <th scope="col">Supplier Name</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Address</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliersData.length > 0 ? (
                            suppliersData.map((supplier, index) => (
                                <tr key={supplier._id}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{supplier.name}</td>
                                    <td>{supplier.contact}</td>
                                    <td>{supplier.address}</td>
                                    <td>
                                        <NavLink
                                            to={`/updatesupplier/${supplier._id}`}
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
                                            onClick={() => deleteSupplier(supplier._id)}
                                        >
                                            <i className="fa-solid fa-trash"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center">
                                    No suppliers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
