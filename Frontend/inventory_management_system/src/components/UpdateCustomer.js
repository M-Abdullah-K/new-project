import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateCustomer() {
    const [CustomerName, setCustomerName] = useState("");
    const [CustomerEmail, setCustomerEmail] = useState("");
    const [CustomerPhone, setCustomerPhone] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const fetchCustomerData = useCallback(async () => {
        try {
            const res = await fetch(`http://localhost:3001/customers/${id}`);
            if (res.ok) {
                const data = await res.json();
                setCustomerName(data.CustomerName);
                setCustomerEmail(data.CustomerEmail);
                setCustomerPhone(data.CustomerPhone);
            } else {
                console.error("Failed to fetch customer data:", res);
                setError("Failed to load customer data.");
            }
        } catch (err) {
            console.error("Error fetching customer data:", err);
            setError("An error occurred while fetching data.");
        }
    }, [id]);

    useEffect(() => {
        fetchCustomerData();
    }, [fetchCustomerData]);

    const updateCustomer = async (e) => {
        e.preventDefault();
        if (!CustomerName || !CustomerEmail || !CustomerPhone) {
            return setError("All fields are required");
        }

        try {
            const res = await fetch(`http://localhost:3001/updatecustomer/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ CustomerName, CustomerEmail, CustomerPhone })
            });
            console.log("Update response:", res); // Log response for debugging

            if (res.ok) {
                navigate('/customer');
            } else {
                console.error("Failed to update customer:", res);
                setError("Failed to update customer.");
            }
        } catch (err) {
            console.error("Error updating customer:", err);
            setError("An error occurred.");
        }
    };

    return (
        <div className='container p-5'>
            <h2>Update Customer</h2>
            <input type="text" value={CustomerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Customer Name" required />
            <input type="email" value={CustomerEmail} onChange={(e) => setCustomerEmail(e.target.value)} placeholder="Customer Email" required />
            <input type="text" value={CustomerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="Customer Phone" required />
            <button onClick={updateCustomer}>Update</button>
            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}
