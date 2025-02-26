import React, { useState, useMemo } from "react";
import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./TopShopsAttended.css";

export default function TopShopsAttended({ userSpendings, startDate, setStartDate, endDate, setEndDate }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const filteredSpendings = userSpendings.filter(spending => {
        const spendingDate = new Date(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    });

    const shopFrequency = useMemo(() => {
        const frequency = {};
        filteredSpendings.forEach(spending => {
            const shopName = spending.companyName;
            if (frequency[shopName]) {
                frequency[shopName].count += 1;
                frequency[shopName].totalPrice += spending.totalPrice;
                frequency[shopName].totalItems += spending.products.reduce((sum, product) => sum + product.units, 0);
            } else {
                frequency[shopName] = {
                    count: 1,
                    totalPrice: spending.totalPrice,
                    totalItems: spending.products.reduce((sum, product) => sum + product.units, 0),
                };
            }
        });

        const sortedShops = Object.keys(frequency)
            .map(key => ({
                name: key,
                count: frequency[key].count,
                totalPrice: frequency[key].totalPrice,
                totalItems: frequency[key].totalItems,
            }))
            .sort((a, b) => b.totalPrice - a.totalPrice);

        return sortedShops;
    }, [filteredSpendings]);

    const totalPages = Math.ceil(shopFrequency.length / itemsPerPage);

    const indexOfLastShop = currentPage * itemsPerPage;
    const indexOfFirstShop = indexOfLastShop - itemsPerPage;
    const currentShops = shopFrequency.slice(indexOfFirstShop, indexOfLastShop);

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

            <div className="top-shops-attended-container">
                {(!startDate || !endDate) ? (
                    <div className="top-shops-attended-no-spendings-message2">Selectează un interval de date pentru a vedea topul magazinelor frecventate.</div>
                ) : filteredSpendings.length === 0 ? (
                    <div className="top-shops-attended-no-spendings-message2">Nu există cheltuieli în această perioadă.</div>
                ) : (
                    <table className="top-shops-attended-table">
                        <thead>
                            <tr>
                                <th>Magazin</th>
                                <th>Nr. Cheltuieli</th>
                                <th>Preț Total</th>
                                <th>Nr. Produse</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentShops.map((shop, index) => (
                                <tr key={index}>
                                    <td>{shop.name}</td>
                                    <td>{shop.count}</td>
                                    <td>{shop.totalPrice.toFixed(2)}</td>
                                    <td>{shop.totalItems}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {startDate && endDate && filteredSpendings.length > 0 && (
                    <div className="top-shops-attended-pagination">
                        <button
                            className="top-shops-attended-pagination-btn"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            ⬅ Pagina anterioară
                        </button>
                        <span className="top-shops-attended-pagination-info">
                            Pagina {currentPage} din {totalPages}
                        </span>
                        <button
                            className="top-shops-attended-pagination-btn"
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
