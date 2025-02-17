import React, { useState, useEffect } from "react";
import "./TopSpendingsInAPeriod.css";
import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";

export default function TopSpendingsInAPeriod({ userSpendings, startDate, setStartDate, endDate, setEndDate }) {
    const [selectedSpendingId, setSelectedSpendingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    
    const parseEuropeanDate = (dateString) => new Date(dateString);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString("ro-RO", { month: "long" })} ${date.getFullYear()}`;
    };

    const filteredSpendings = userSpendings
        .filter(spending => {
            const spendingDate = parseEuropeanDate(spending.date);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            if (start) start.setHours(0, 0, 0, 0);
            if (end) end.setHours(23, 59, 59, 999);

            return (!start || spendingDate >= start) && (!end || spendingDate <= end);
        })
        .sort((a, b) => b.totalPrice - a.totalPrice);

    const totalPages = Math.ceil(filteredSpendings.length / itemsPerPage);
    
    const indexOfLastSpending = currentPage * itemsPerPage;
    const indexOfFirstSpending = indexOfLastSpending - itemsPerPage;
    const currentSpendings = filteredSpendings.slice(indexOfFirstSpending, indexOfLastSpending);

    const handleToggleDetails = (spendingId) => {
        setSelectedSpendingId(prev => prev === spendingId ? null : spendingId);
    };

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

            <div className="top-spendings-in-a-table-container">
                {(!startDate || !endDate) ? (
                    <div className="no-spendings-message-statistic">Selectează un interval de date pentru a vedea topul cheltuielilor.</div>
                ) : currentSpendings.length === 0 ? (
                    <div className="no-spendings-message-statistic">Nu există cheltuieli în această perioadă.</div>
                ) : (
                    <table className="top-spendings-in-a-table">
                        <thead>
                            <tr>
                                <th>Nume Companie</th>
                                <th>Număr Produse</th>
                                <th>Preț Total</th>
                                <th>Dată</th>
                                <th>Acțiuni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentSpendings.map(spending => (
                                <React.Fragment key={spending.spendingId}>
                                    <tr>
                                        <td>{spending.companyName}</td>
                                        <td>{spending.products.length}</td>
                                        <td>{spending.totalPrice.toFixed(2)}</td>
                                        <td>
                                            {parseEuropeanDate(spending.date).toLocaleDateString("ro-RO", {
                                                day: "2-digit",
                                                month: "2-digit",
                                                year: "numeric"
                                            })} {parseEuropeanDate(spending.date).toLocaleTimeString("ro-RO", {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </td>

                                        <td>
                                            <button
                                                className="view-all-spendings-table-details-btn"
                                                onClick={() => handleToggleDetails(spending.spendingId)}
                                            >
                                                {selectedSpendingId === spending.spendingId ? 'Ascunde' : 'Vezi detalii'}
                                            </button>
                                        </td>
                                    </tr>
                                    {selectedSpendingId === spending.spendingId && (
                                        <tr className="view-all-spendings-table-details-row">
                                            <td colSpan="5">
                                                <div className="view-all-spendings-table-products-details">
                                                    <p>Această achiziție a fost făcută la data de:{" "}
                                                        {(() => {
                                                            const date = new Date(spending.date);
                                                            const day = date.getDate();
                                                            const month = date.toLocaleString('ro-RO', { month: 'long' });
                                                            const year = date.getFullYear();
                                                            const time = date.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' });

                                                            return `${day} ${month} ${year}, ora ${time}`;
                                                        })()}
                                                    </p>
                                                    {spending.description && (
                                                        <p>Descriere: {spending.description}</p>
                                                    )}
                                                    <h4>Produse achiziționate:</h4>
                                                    <table className="view-all-spendings-table-products-table">
                                                        <thead>
                                                            <tr>
                                                                <th>Nume Produs</th>
                                                                <th>Categorie</th>
                                                                <th>Cantitate</th>
                                                                <th>Preț Total</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {spending.products.map((product, index) => (
                                                                <tr key={index}>
                                                                    <td>{product.itemName}</td>
                                                                    <td>{product.category}</td>
                                                                    <td>{product.units}</td>
                                                                    <td>{(product.pricePerUnit * product.units).toFixed(2)}</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                )}

                {startDate && endDate && filteredSpendings.length > 0 && (
                    <div className="view-all-spendings-table-pagination-statistic">
                        <button
                            className="view-all-spendings-table-pagination-btn-statistic"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            ⬅ Pagina anterioară
                        </button>
                        <span className="view-all-spendings-table-pagination-info-statistic">
                            Pagina {currentPage} din {totalPages}
                        </span>
                        <button
                            className="view-all-spendings-table-pagination-btn-statistic"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                        >
                            Pagina următoare ➡
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
