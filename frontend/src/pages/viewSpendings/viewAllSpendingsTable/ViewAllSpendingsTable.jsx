import React, { useState, useEffect } from 'react';
import './ViewAllSpendingsTable.css';
import axios from 'axios';

const ViewAllSpendingsTable = ({ spendings, onSpendingDeleted  }) => {
    const [selectedSpendingId, setSelectedSpendingId] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [selectedCompany, setSelectedCompany] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    const itemsPerPage = 15;


    const filterByPrice = (spending) => {
        if (!minPrice && !maxPrice) return true;
        const min = parseFloat(minPrice) || 0;
        const max = parseFloat(maxPrice) || Infinity;
        return spending.totalPrice >= min && spending.totalPrice <= max;
    };

    const filterByCompany = (spending) => {
        if (!selectedCompany) return true;
        return spending.companyName === selectedCompany;
    };

    const parseEuropeanDate = (dateString) => {
        return new Date(dateString);
    };

    const filterByDate = (spending) => {
        if (!startDate && !endDate) return true;

        const purchaseDate = parseEuropeanDate(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        if (start) start.setHours(0, 0, 0, 0);
        if (end) end.setHours(23, 59, 59, 999);

        if (start && end) return purchaseDate >= start && purchaseDate <= end;
        if (start) return purchaseDate >= start;
        if (end) return purchaseDate <= end;
        return true;
    };

    const filteredSpendings = (spendings?.filter(spending =>
        filterByPrice(spending) &&
        filterByCompany(spending) &&
        filterByDate(spending)
    ) || [])
        .sort((a, b) => {
            const dateA = parseEuropeanDate(a.date);
            const dateB = parseEuropeanDate(b.date);
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
        });

    useEffect(() => {
        setCurrentPage(1);
    }, [minPrice, maxPrice, selectedCompany, startDate, endDate, sortOrder]);

    const totalPages = Math.ceil(filteredSpendings.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentSpendings = filteredSpendings.slice(indexOfFirstItem, indexOfLastItem);

    const companies = [...new Set(spendings?.map(s => s.companyName) || [])];

    const goToNextPage = () => currentPage < totalPages && setCurrentPage(p => p + 1);
    const goToPreviousPage = () => currentPage > 1 && setCurrentPage(p => p - 1);

    const handleDelete = async (spendingId) => {
        const storedData = localStorage.getItem("auth");
        if (!storedData) return;

        const { email, password } = JSON.parse(storedData);
        try {
            const userEmail = email;

            const response = await axios.delete(`http://localhost:8080/spending/${spendingId}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
                auth: {
                    username: email,
                    password: password,
                }
            });
            //console.log(response.data);
            onSpendingDeleted();
        } catch (error) {
            console.error(error);
        }
    };

    if (!spendings || !Array.isArray(spendings) || spendings.length === 0) {
        return <div className='no-spendings-to-show'>Nu există cheltuieli de afișat.<br />Scanează bonuri, facturi, sau încarcă manual o cheltuială online pentru a începe!</div>;
    }

    const handleToggleDetails = (spendingId) => {
        setSelectedSpendingId(prev => prev === spendingId ? null : spendingId);
    };

    return (
        <div>
            <div className="filters-container">
                <div className="filter-group">
                    <label>Preț minim</label>
                    <input
                        type="number"
                        className="filter-input"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Preț minim"
                        min="0"
                    />
                </div>
                <div className="filter-group">
                    <label>Preț maxim</label>
                    <input
                        type="number"
                        className="filter-input"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Preț maxim"
                        min="0"
                    />
                </div>

                <div className="filter-group">
                    <label>Companie</label>
                    <select
                        className="filter-select"
                        value={selectedCompany}
                        onChange={(e) => setSelectedCompany(e.target.value)}
                    >
                        <option value="">Toate companiile</option>
                        {companies.map(company => (
                            <option key={company} value={company}>{company}</option>
                        ))}
                    </select>
                </div>

                <div className="filter-group">
                    <label>De la data</label>
                    <input
                        type="date"
                        className="filter-input"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="filter-group">
                    <label>Până la data</label>
                    <input
                        type="date"
                        className="filter-input"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>

                <div className="filter-group">
                    <button
                        className="view-all-spendings-table-details-btn"
                        onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
                    >
                        Sortare după dată ({sortOrder === 'desc' ? 'descrescător' : 'crescător'})
                    </button>
                </div>
            </div>

            <div className="view-all-spendings-table-container">
                <table className="view-all-spendings-table">
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
                        {currentSpendings.map((spending) => (
                            <React.Fragment key={spending.spendingId}>
                                <tr>
                                    <td>{spending.companyName}</td>
                                    <td>{spending.products.length}</td>
                                    <td>{spending.totalPrice.toFixed(2)}</td>
                                    <td>
                                        {parseEuropeanDate(spending.date).toLocaleDateString('ro-RO', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })} {parseEuropeanDate(spending.date).toLocaleTimeString('ro-RO', {
                                            hour: '2-digit',
                                            minute: '2-digit'
                                        })}
                                    </td>

                                    <td>
                                        <button
                                            className="view-all-spendings-table-details-btn"
                                            onClick={() => setSelectedSpendingId(
                                                prev => prev === spending.spendingId ? null : spending.spendingId, console.log(spending)
                                            )}
                                        >
                                            {selectedSpendingId === spending.spendingId ? 'Ascunde' : 'Vezi detalii'}
                                        </button>
                                    </td>
                                </tr>
                                {selectedSpendingId === spending.spendingId && (
                                    <tr className="view-all-spendings-table-details-row">
                                        <td colSpan="6">
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
                                                <div className="view-all-spendings-table-delete-container">
                                                    <button
                                                        className="view-all-spendings-table-delete-btn"
                                                        onClick={() => handleDelete(spending.spendingId)}
                                                    >
                                                        Șterge Cheltuiala
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>

                <div className="view-all-spendings-table-pagination">
                    <button
                        className="view-all-spendings-table-pagination-btn"
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                    >
                        ⬅ Pagina anterioară
                    </button>
                    <span className="view-all-spendings-table-pagination-info">
                        Pagina {currentPage} din {totalPages}
                    </span>
                    <button
                        className="view-all-spendings-table-pagination-btn"
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                    >
                        Pagina următoare ➡
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewAllSpendingsTable;
