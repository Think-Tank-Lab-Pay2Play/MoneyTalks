import React from "react";
import "./SpendingsTable.css";

export default function SpendingsTable({ data }) {
    return (
        <div className="spendings-table-container">
            <table className="spendings-table">
                <thead>
                    <tr>
                        <th>Index</th>
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
                                <td>{item.id}</td>
                                <td>{item.companyName}</td>
                                <td>{item.numberOfProducts}</td>
                                <td>{item.totalPrice.toFixed(2)} RON</td>
                                <td>{item.date}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="no-data">
                                Nu exista date despre cheltuielile tale. Incepe sa incarci bonuri pentru a le putea analiza!
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
