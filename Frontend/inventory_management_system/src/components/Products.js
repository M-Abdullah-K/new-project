import React, { useEffect, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

export default function Products() {
    const { theme } = useContext(ThemeContext); // Access the current theme
    const [productData, setProductData] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        try {
            const res = await fetch('http://localhost:3001/products', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();

            if (res.status === 201) {
                console.log('Data Retrieved.');
                setProductData(data);
            } else {
                console.log('Something went wrong. Please try again.');
            }
        } catch (err) {
            console.log(err);
        }
    };

    const deleteProduct = async (id) => {
        const response = await fetch(`http://localhost:3001/deleteproduct/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const deletedata = await response.json();
        console.log(deletedata);

        if (response.status === 422 || !deletedata) {
            console.log('Error');
        } else {
            console.log('Product deleted');
            getProducts();
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
            <h1 style={{ color: theme.text, transition: theme.transition }}>Products Inventory</h1>

            <div className="add_button mb-3">
                <NavLink
                    to="/insertproduct"
                    className="btn"
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.text,
                        fontSize: '1.25rem',
                        borderRadius: theme.borderRadius,
                        transition: theme.transition,
                    }}
                >
                    + Add New Product
                </NavLink>
            </div>

            <div
                className="overflow-auto mt-3"
                style={{
                    maxHeight: '38rem',
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
                            <th scope="col">Product Name</th>
                            <th scope="col">Product Price</th>
                            <th scope="col">Product Barcode</th>
                            <th scope="col">Update</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productData.map((element, id) => (
                            <tr key={id} style={{ backgroundColor: theme.background, color: theme.text }}>
                                <th scope="row">{id + 1}</th>
                                <td>{element.ProductName}</td>
                                <td>{element.ProductPrice}</td>
                                <td>{element.ProductBarcode}</td>
                                <td>
                                    <NavLink
                                        to={`/updateproduct/${element._id}`}
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
                                        onClick={() => deleteProduct(element._id)}
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
