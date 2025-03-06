import React, { useState, useEffect } from "react";
import "./BillDetails.css";
import { isEqual } from 'lodash';

const BillDetails = ({ billData, onBillDataChange }) => {
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

    const [showDetails, setShowDetails] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 5;
    const [editedBillData, setEditedBillData] = useState(() => ({
        ...billData,
        products: billData?.products ? [...billData.products] : []
    }));

    if (!billData) return null;

    useEffect(() => {
        if (billData && !isEqual(billData, editedBillData)) {
            setEditedBillData({
                ...billData,
                products: billData.products ? [...billData.products] : []
            });
        }
    }, [billData]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            if (editedBillData && !isEqual(editedBillData, billData)) {
                onBillDataChange(editedBillData);
            }
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [editedBillData]);

    const totalProducts = editedBillData?.products?.length || 0;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = editedBillData.products
        ? editedBillData.products.slice(indexOfFirstProduct, indexOfLastProduct)
        : [];

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString("ro-RO", { month: "long" })} ${date.getFullYear()}`;
    };

    const handleProductChange = (index, field, value) => {
        const updatedProducts = [...editedBillData.products];
        updatedProducts[index][field] = value;

        setEditedBillData(prev => ({
            ...prev,
            products: updatedProducts
        }));
    };

    return (
        <div className="upload-bill-form-bill-details-table-container">
            {editedBillData && (
                <table className="upload-bill-form-bill-details-table">
                    <thead>
                        <tr>
                            <th>Nume Companie</th>
                            <th>Număr Produse</th>
                            <th>Data Plății</th>
                            <th>Acțiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{billData.companyName}</td>
                            <td>{totalProducts}</td>
                            <td>{formatDate(billData.date)}</td>
                            <td>
                                <button
                                    className="upload-bill-form-bill-details-btn"
                                    onClick={() => setShowDetails(!showDetails)}
                                >
                                    {showDetails ? "Ascunde Detalii" : "Vezi Detalii"}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            )}

            {showDetails && editedBillData && (
                <div className="upload-bill-form-bill-details-extra">
                    <p className="upload-bill-form-bill-details-desc">
                        <h3 className="upload-bill-form-bill-details-subtitle">Descriere</h3>
                        {billData.description || "Fără descriere"}
                    </p>

                    <h3 className="upload-bill-form-bill-details-subtitle">Lista Produselor</h3>
                    {totalProducts > 0 ? (
                        <>
                            <table className="upload-bill-form-bill-details-table-products">
                                <thead>
                                    <tr>
                                        <th>Nume Produs</th>
                                        <th>Categorie</th>
                                        <th>Cantitate</th>
                                        <th>Preț Unitar</th>
                                        <th>Preț Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentProducts.map((product, index) => (
                                        <tr key={index}>
                                            <td>
                                                <input
                                                    type="text"
                                                    value={product.itemName}
                                                    onChange={(e) => handleProductChange(index, 'itemName', e.target.value)}
                                                />
                                            </td>
                                            <td>
                                                <select
                                                    value={product.category}
                                                    onChange={(e) => handleProductChange(index, 'category', e.target.value)}
                                                >
                                                    {Object.entries(categoryMap).map(([key, value]) => (
                                                        <option key={key} value={key}>{value}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    value={product.units}
                                                    onChange={(e) => handleProductChange(index, 'units', parseInt(e.target.value) || 0)}
                                                    
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="number"
                                                    min="0"
                                                    step="0.01"
                                                    value={product.pricePerUnit}
                                                    onChange={(e) => handleProductChange(index, 'pricePerUnit', parseFloat(e.target.value) || 0)}
                                                />
                                            </td>
                                            <td>{(product.pricePerUnit * product.units).toFixed(2)} RON</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* PAGINARE */}
                            {totalPages > 1 && (
                                <div className="upload-bill-form-bill-details-pagination">
                                    <button
                                        className="upload-bill-form-bill-details-pagination-btn"
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                    >
                                        ⬅ Pagina anterioară
                                    </button>
                                    <span className="upload-bill-form-bill-details-pagination-info">
                                        Pagina {currentPage} din {totalPages}
                                    </span>
                                    <button
                                        className="upload-bill-form-bill-details-pagination-btn"
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                    >
                                        Pagina următoare ➡
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <p className="upload-bill-form-bill-details-no-products">Nu există produse.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default BillDetails;