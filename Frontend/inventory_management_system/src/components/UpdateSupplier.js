import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function UpdateSupplier() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        const res = await fetch(`http://localhost:3001/suppliers/${id}`, { method: "GET" });
        if (res.status === 200) {  // Check for 200 instead of 201
          const data = await res.json();
          setName(data.name);
          setContact(data.contact);
          setAddress(data.address);
        } else {
          setError("Failed to load supplier data.");
        }
      } catch (err) {
        setError("An error occurred while fetching supplier data.");
      }
    };
    fetchSupplier();
  }, [id]);

  const updateSupplier = async (e) => {
    e.preventDefault();
    if (!name || !contact || !address) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/updatesupplier/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, contact, address }),
      });

      if (res.status === 200) {  // Check for 200 instead of 201
        navigate('/suppliers');
      } else {
        setError("Failed to update supplier.");
      }
    } catch (err) {
      setError("An error occurred while updating supplier.");
    }
  };

  return (
    <div className='container-fluid p-5'>
      <h1>Update Supplier Information</h1>
      <form onSubmit={updateSupplier}>
        <label>Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} value={name} required />
        <label>Contact:</label>
        <input type="text" onChange={(e) => setContact(e.target.value)} value={contact} required />
        <label>Address:</label>
        <input type="text" onChange={(e) => setAddress(e.target.value)} value={address} required />
        <button type="submit">Update</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
}
