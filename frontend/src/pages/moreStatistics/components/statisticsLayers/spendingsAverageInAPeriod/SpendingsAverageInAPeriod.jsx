import React from 'react';
import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import ReactApexChart from 'react-apexcharts'; // Asigură-te că ai instalat 'react-apexcharts'
import "./SpendingsAverageInAPeriod.css";

export default function SpendingsAverageInAPeriod({ userSpendings, startDate, setStartDate, endDate, setEndDate }) {
    const categoryMap = {
        "ABONAMENTE": "Abonamente",
        "ASIGURARI": "Asigurări",
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

    const formatDate = (date) => {
        if (!date) return "";
        const months = [
            "Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie",
            "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
        ];
        const d = new Date(date);
        return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    };

    const filteredSpendings = userSpendings.filter(spending => {
        const spendingDate = new Date(spending.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (!start || spendingDate >= start) && (!end || spendingDate <= end);
    });

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

    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;
    const daysCount = start && end ? Math.max(1, (end - start) / (1000 * 60 * 60 * 24) + 1) : 1;

    const chartData = Object.entries(categorySpendings).map(([category, total]) => ({
        category: categoryMap[category] || category,
        avgPerDay: (total / daysCount).toFixed(2)
    }));

    // Sortăm datele pentru chart
    const sortedChartData = chartData.sort((a, b) => a.avgPerDay - b.avgPerDay);

    const chartOptions = {
        chart: {
            height: 350,
            type: 'bar'
        },
        colors: ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', '#E74C3C', '#1ABC9C',
        '#8E44AD', '#2ECC71', '#D35400', '#C0392B', '#2980B9', '#F39C12', '#16A085',
        '#7F8C8D', '#27AE60'], // Poți adăuga mai multe culori
        plotOptions: {
            bar: {
                columnWidth: '45%',
                distributed: true
            }
        },
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
        },
        xaxis: {
            categories: sortedChartData.map(data => data.category),
            labels: {
                style: {
                    fontSize: '12px'
                }
            }
        },
    };

    const chartSeries = [{
        name: "Ai cheltuit în medie pe zi",
        data: sortedChartData.map(data => parseFloat(data.avgPerDay)),
    }];

    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />

            <h2 className="spendings-average-in-a-period-title">
                {start && end
                    ? `Media cheltuielilor pe zi din perioada ${formatDate(start)} până în ${formatDate(end)}`
                    : "Selectați o perioadă pentru a vedea media cheltuielilor"
                }
            </h2>

            <div className="spendings-average-in-a-period">
                {(!startDate || !endDate) ? (
                    <p className="average-spendings-no-data"></p>
                ) : (
                    <>
                        {Object.keys(categorySpendings).length > 0 && (
                            <div id="chart-spendings-average-in-a-period">
                                <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height={350} width={800} />
                            </div>
                        )}
                    </>
                )}
            </div>
        </>
    );
}
