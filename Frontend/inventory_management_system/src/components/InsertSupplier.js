import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function InsertSupplier() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const addSupplier = async (e) => {
    e.preventDefault();
    if (!name || !contact || !address) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/insertsupplier", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, address }),
      });

      if (res.status === 201) {
        navigate('/suppliers');
      } else {
        setError("Failed to add supplier.");
      }
    } catch (err) {
      setError("An error occurred.");
    }
  };

  return (
    <div className='container-fluid p-5'>
      <h1>Enter Supplier Information</h1>
      <form>
        <label>Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} required />
        <label>Contact:</label>
        <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} required />
        <label>Address:</label>
        <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} required />
        <button type="submit" onClick={addSupplier}>Insert</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
