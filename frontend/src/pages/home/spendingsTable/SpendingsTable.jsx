import React from "react";
import "./SpendingsTable.css";

export default function SpendingsTable({ data = [] }) {
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
                    {Array.isArray(data) && data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.companyName}</td>
                                <td>{item.numberOfProducts}</td>
                                <td>{item.totalPrice.toFixed(2)} RON</td>
                                <td>{new Date(item.date).toLocaleString('ro-RO', { hour12: false }).replace(',', '').slice(0, -3)}</td>

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
