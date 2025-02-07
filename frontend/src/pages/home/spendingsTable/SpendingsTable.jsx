import React from "react";
import "./SpendingsTable.css";

import {useState, useEffect} from "react";

export default function SpendingsTable({ data }) {

    const [spendings, setSpendings] = useState([]);

    useEffect(() => {
        const fetchSpendings = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/spendings/home");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setSpendings(data);
            } catch (error) {
                console.error("Error fetching spendings:", error);
                setSpendings([]);
            }
        };
        fetchSpendings();
    }, []);

    return (
        <div className="spendings-table-container">
            <table className="spendings-table">
                <thead>
                    <tr>
                        <th>Numele companiei</th>
                        <th>Numar produse achizitionate</th>
                        <th>Pret total</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.companyName}</td>
                                <td>{item.numberOfProducts}</td>
                                <td>{item.totalPrice.toFixed(2)} RON</td>
                                <td>{item.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">
                                Nu există date despre cheltuielile tale. Începe să încarci bonuri, facturi și cheltuieli online pentru a le putea analiza!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
