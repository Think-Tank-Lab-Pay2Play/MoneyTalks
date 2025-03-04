import React, { useState, useMemo } from "react";
import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./TopItemsBoughtInAPeriod.css";

export default function TopItemsBoughtInAPeriod({ userSpendings, startDate, setStartDate, endDate, setEndDate }) {
    const categoryMap = {
        "ABONAMENTE": "Abonamente",
        "ASIGURARI": "Asigurări",
        "BAUTURI": "Băuturi",
        "BUNURI_DE_LUX": "Bunuri de lux",
        "COSMETICE": "Cosmetice",
        "DIVERTISMENT": "Divertisment",
        "EDUCATIE": "Educație",
        "HOBBY_URI": "Hobby-uri",
        "INVESTITII": "Investiții",
        "LOCUINTA": "Locuință",
        "MANCARE": "Mâncare",
        "SANATATE": "Sănătate",
        "TAXE": "Taxe",
        "TEHNOLOGIE": "Tehnologie",
        "TRANSPORT": "Transport",
        "UZ_CASNIC": "Uz casnic",
        "IMBRACAMINTE": "Îmbrăcăminte"
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);

    const filteredSpendings = userSpendings.filter(spending => {
        const spendingDate = new Date(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    });

    const productFrequency = useMemo(() => {
        const frequency = {};
        filteredSpendings.forEach(spending => {
            spending.products.forEach(product => {
                const productKey = `${product.itemName} - ${product.category}`;
                if (frequency[productKey]) {
                    frequency[productKey].count += product.units;
                    frequency[productKey].totalPrice += product.pricePerUnit * product.units;
                } else {
                    frequency[productKey] = {
                        count: product.units,
                        totalPrice: product.pricePerUnit * product.units,
                    };
                }
            });
        });

        const sortedProducts = Object.keys(frequency)
            .map(key => ({
                name: key,
                count: frequency[key].count,
                totalPrice: frequency[key].totalPrice,
            }))
            .sort((a, b) => b.totalPrice - a.totalPrice);

        return sortedProducts;
    }, [filteredSpendings]);

    const totalPages = Math.ceil(productFrequency.length / itemsPerPage);
    
    const indexOfLastProduct = currentPage * itemsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
    const currentProducts = productFrequency.slice(indexOfFirstProduct, indexOfLastProduct);

    const goToPreviousPage = () => {
        setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
    };

    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

            <div className="top-items-bought-in-a-period-container">
                {(!startDate || !endDate) ? (
                    <div className="top-items-bought-in-a-period-no-spendings-message1">Selectează un interval de date pentru a vedea topul produselor cumpărate.</div>
                ) : filteredSpendings.length === 0 ? (
                    <div className="top-items-bought-in-a-period-no-spendings-message1">Nu există cheltuieli în această perioadă.</div>
                ) : (
                    <table className="top-items-bought-in-a-period-table">
                        <thead>
                            <tr>
                                <th>Produs</th>
                                <th>Categorie</th>
                                <th>Cantitate</th>
                                <th>Preț Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentProducts.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name.split(" - ")[0]}</td>
                                    <td>{categoryMap[product.name.split(" - ")[1]]}</td>
                                    <td>{product.count}</td>
                                    <td>{product.totalPrice.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {startDate && endDate && filteredSpendings.length > 0 && (
                    <div className="top-items-bought-in-a-period-pagination">
                        <button
                            className="top-items-bought-in-a-period-pagination-btn"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                        >
                            ⬅ Pagina anterioară
                        </button>
                        <span className="top-items-bought-in-a-period-pagination-info">
                            Pagina {currentPage} din {totalPages}
                        </span>
                        <button
                            className="top-items-bought-in-a-period-pagination-btn"
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
