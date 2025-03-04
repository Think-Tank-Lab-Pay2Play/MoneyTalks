import React, { useState } from "react";
import "./BillDetails.css";

const BillDetails = ({ billData }) => {
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

    if (!billData) return null;

    const totalProducts = billData.products ? billData.products.length : 0;
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = billData.products
        ? billData.products.slice(indexOfFirstProduct, indexOfLastProduct)
        : [];

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return `${date.getDate()} ${date.toLocaleString("ro-RO", { month: "long" })} ${date.getFullYear()}`;
    };

    return (
        <div className="upload-bill-form-bill-details-table-container">
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

            {showDetails && (
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
                                            <td>{product.itemName}</td>
                                            <td>{categoryMap[product.category]}</td>
                                            <td>{product.units}</td>
                                            <td>{product.pricePerUnit} RON</td>
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