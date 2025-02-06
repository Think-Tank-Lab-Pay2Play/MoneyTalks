import React, { useState, useEffect } from 'react';
import './ViewAllSpendingsTable.css';

const ViewAllSpendingsTable = ({ spendings, onDelete }) => {
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
        const [datePart, timePart] = dateString.split(' ');
        const [day, month, year] = datePart.split('/');
        const [hours, minutes] = timePart.split(':');
        return new Date(`${year}-${month}-${day}T${hours}:${minutes}:00`);
    };

    const filterByDate = (spending) => {
        if (!startDate && !endDate) return true;

        const purchaseDate = parseEuropeanDate(spending.purchaseDate);
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
            const dateA = parseEuropeanDate(a.purchaseDate);
            const dateB = parseEuropeanDate(b.purchaseDate);
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
        try {
            await fetch(`/api/spendings/${spendingId}`, { method: 'DELETE' });
            onDelete(spendingId);
        } catch (error) {
            console.error('Error deleting spending:', error);
        }
    };

    if (!spendings || !Array.isArray(spendings)) {
        return <div>Nu există cheltuieli de afișat</div>;
    }

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
                            <React.Fragment key={spending.id}>
                                <tr>
                                    <td>{spending.companyName}</td>
                                    <td>{spending.numberOfProducts}</td>
                                    <td>{spending.totalPrice.toFixed(2)}</td>
                                    <td>
                                        {parseEuropeanDate(spending.purchaseDate).toLocaleDateString('ro-RO', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric'
                                        })}
                                        {' '}
                                        {parseEuropeanDate(spending.purchaseDate).toLocaleTimeString('ro-RO', {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: false
                                        })}
                                    </td>
                                    <td>
                                        <button
                                            className="view-all-spendings-table-details-btn"
                                            onClick={() => setSelectedSpendingId(
                                                prev => prev === spending.id ? null : spending.id
                                            )}
                                        >
                                            {selectedSpendingId === spending.id ? 'Ascunde' : 'Vezi detalii'}
                                        </button>
                                    </td>
                                </tr>
                                {selectedSpendingId === spending.id && (
                                    <tr className="view-all-spendings-table-details-row">
                                        <td colSpan="6">
                                            <div className="view-all-spendings-table-products-details">
                                                <h4>Produse achiziționate:</h4>
                                                <p>
                                                    Această achiziție a fost făcută la data de:{" "}
                                                    {parseEuropeanDate(spending.purchaseDate).toLocaleDateString("ro-RO", {
                                                        day: "numeric",
                                                        month: "long",
                                                        year: "numeric",
                                                    })}
                                                    ,{" "}
                                                    {parseEuropeanDate(spending.purchaseDate).toLocaleDateString("ro-RO", {
                                                        weekday: "long",
                                                    })}
                                                    , ora{" "}
                                                    {parseEuropeanDate(spending.purchaseDate).toLocaleTimeString("ro-RO", {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        hour12: false,
                                                    })}
                                                </p>
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
                                                                <td>{product.name}</td>
                                                                <td>{product.category}</td>
                                                                <td>{product.quantity}</td>
                                                                <td>{product.totalPrice.toFixed(2)}</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                                <div className="view-all-spendings-table-delete-container">
                                                    <button
                                                        className="view-all-spendings-table-delete-btn"
                                                        onClick={() => handleDelete(spending.id)}
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