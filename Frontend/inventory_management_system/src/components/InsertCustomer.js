import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InsertCustomer() {
    const [CustomerName, setCustomerName] = useState("");
    const [CustomerEmail, setCustomerEmail] = useState("");
    const [CustomerPhone, setCustomerPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const addCustomer = async (e) => {
        e.preventDefault();
        if (!CustomerName || !CustomerEmail || !CustomerPhone) return setError("All fields are required");

        try {
            const res = await fetch("http://localhost:3001/insertcustomer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ CustomerName, CustomerEmail, CustomerPhone })
            });
            console.log("Insert response:", res); // Log response for debugging

            if (res.ok) {
                navigate('/customer');
            } else {
                console.error("Failed to add customer:", res);
                setError("Failed to add customer.");
            }
        } catch (err) {
            console.error("Error adding customer:", err);
            setError("An error occurred.");
        }
    };

    return (
        <div className='container p-5'>
            <h2>Add Customer</h2>
            <input type="text" onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" required />
            <input type="email" onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Customer Email" required />
            <input type="text" onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Customer Phone" required />
            <button onClick={addCustomer}>Add</button>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}
