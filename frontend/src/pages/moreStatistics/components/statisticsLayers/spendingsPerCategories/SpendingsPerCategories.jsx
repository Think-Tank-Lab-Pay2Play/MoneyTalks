import React from "react";
import ReactApexChart from "react-apexcharts";
import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./SpendingsPerCategories.css";

export default function SpendingsPerCategories({ userSpendings, startDate, setStartDate, endDate, setEndDate }) {
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


    // preia cheltuielile dintr-o anumita perioada de timp
    const filteredSpendings = userSpendings.filter(spending => {
        const spendingDate = new Date(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    });

    // calculeaza suma cheltuita pe fiecare categorie pe o perioada de timp
    const categorySpendings = filteredSpendings.reduce((categories, spending) => {
        if (spending.products) {
            spending.products.forEach(product => {
                if (!categories[product.category]) {
                    categories[product.category] = 0;
                }
                categories[product.category] += product.totalPrice;
            });
        }
        return categories;
    }, {});

    const colors = [
        '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#E74C3C', '#1ABC9C',
        '#8E44AD', '#2ECC71', '#D35400', '#C0392B', '#2980B9', '#F39C12', '#16A085',
        '#7F8C8D', '#27AE60'
    ];

    // sorteaza cheltuielile pe categorii
    const catSpend = Object.fromEntries(
        Object.entries(categorySpendings)
            .map(([category, total]) => [category, parseFloat(total.toFixed(2))])
            .sort((a, b) => b[1] - a[1])
    );



    const chartData = {
        series: Object.values(catSpend),
        options: {
            chart: {
                type: 'donut',
            },
            labels: Object.keys(catSpend).map(category => categoryMap[category]),
            colors: colors.slice(0, Object.keys(catSpend).length),
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 200
                        },
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            ]
        }
    };

    const categoryStatistics = Object.entries(catSpend).map(([category, totalPrice], index) => (
        <div key={category} className="category-statistic">
            <span
                className="category-color-bullet"
                style={{ backgroundColor: colors[index % colors.length] }}
            />
            <div>{categoryMap[category]}: {totalPrice.toFixed(2)} RON</div>
        </div>
    ));

    // calculeaza cheltuielile totale pe o perioada de timp
    const getTotalSpendings = () => {
        return Object.values(catSpend).reduce((total, amount) => total + amount, 0).toFixed(2);
    };


    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            <h2 className="spendings-per-categories-title">Cheltuieli per categorie</h2>
            <div className="spendings-container">
                <div className="spendings-data-container">
                    <div className="spendings-per-categories-stats">
                        {categoryStatistics.length > 0 ? categoryStatistics : <p>0 RON</p>}
                    </div>
                </div>

                {categoryStatistics.length > 0 && (
                    <div className="spendings-per-categories-total-spendings">
                        <div>RON</div>
                        <div>{getTotalSpendings()}</div>
                    </div>
                )}

                {Object.keys(catSpend).length > 0 && (
                    <div className="spendings-chart-container">
                        <ReactApexChart
                            options={chartData.options}
                            series={chartData.series}
                            type="donut"
                        />
                    </div>
                )}
            </div>
        </>
    );

}
