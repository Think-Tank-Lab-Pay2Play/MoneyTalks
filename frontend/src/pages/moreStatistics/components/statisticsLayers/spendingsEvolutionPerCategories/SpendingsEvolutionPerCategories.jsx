import { useState, useEffect } from "react";
import MonthYearInput from "../components/monthYearInput/MonthYearInput";
import ReactApexChart from "react-apexcharts";
import "./SpendingsEvolutionPerCategories.css";
import { spendingCategories } from "../../../../components/spendingsCategories/SpendingCategories.jsx";

export default function SpendingsEvolutionPerCategories({ userSpendings }) {
    const [startMonth, setStartMonth] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [endMonth, setEndMonth] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [filteredSpendings, setFilteredSpendings] = useState([]);
    const [statistics, setStatistics] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);

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

    useEffect(() => {
        applyFilter();
    }, [startMonth, startYear, endMonth, endYear]);

    useEffect(() => {
        if (startMonth && startYear && endMonth && endYear) {
            calculateStatistics();
        }
    }, [filteredSpendings]);

    const applyFilter = () => {
        const filtered = userSpendings.filter(spending => {
            const spendingDate = new Date(spending.date);
            const spendingMonth = spendingDate.getMonth() + 1;
            const spendingYear = spendingDate.getFullYear();

            const isAfterStart = startYear && startMonth
                ? (spendingYear > startYear || (spendingYear === startYear && spendingMonth >= startMonth))
                : true;

            const isBeforeEnd = endYear && endMonth
                ? (spendingYear < endYear || (spendingYear === endYear && spendingMonth <= endMonth))
                : true;

            return isAfterStart && isBeforeEnd;
        });

        setFilteredSpendings(filtered);
    };

    const calculateStatistics = () => {
        if (!startMonth || !startYear || !endMonth || !endYear) {
            setStatistics(null);
            return;
        }

        const categoryData = {};

        spendingCategories.forEach(category => {
            categoryData[category] = { startTotal: 0, endTotal: 0, entriesStart: 0, entriesEnd: 0 };
        });

        filteredSpendings.forEach(spending => {
            const spendingDate = new Date(spending.date);
            const month = spendingDate.getMonth() + 1;
            const year = spendingDate.getFullYear();

            spending.products.forEach(product => {
                if (categoryData.hasOwnProperty(product.category)) {
                    if (year === startYear && month === startMonth) {
                        categoryData[product.category].startTotal += Number(product.totalPrice) || 0;
                        categoryData[product.category].entriesStart += 1;
                    }
                    if (year === endYear && month === endMonth) {
                        categoryData[product.category].endTotal += Number(product.totalPrice) || 0;
                        categoryData[product.category].entriesEnd += 1;
                    }
                }
            });
        });

        const filteredCategories = Object.keys(categoryData).filter(category =>
            categoryData[category].entriesStart > 0 && categoryData[category].entriesEnd > 0
        );

        const data = filteredCategories.map(category => {
            const startTotal = categoryData[category].startTotal;
            const endTotal = categoryData[category].endTotal;
            const change = startTotal !== 0 ? ((endTotal - startTotal) / startTotal) * 100 : 100;

            return {
                category,
                startTotal,
                endTotal,
                change
            };
        });

        setStatistics({ categories: filteredCategories, data });
    };

    const handleCategoryClick = (event, chartContext, config) => {
        const selected = statistics.data[config.dataPointIndex];
        setSelectedCategory(selected);
    };

    return (
        <>
            <MonthYearInput
                startMonth={startMonth} setStartMonth={setStartMonth}
                startYear={startYear} setStartYear={setStartYear}
                endMonth={endMonth} setEndMonth={setEndMonth}
                endYear={endYear} setEndYear={setEndYear}
            />

            <div className="spendings-evolution-per-categories-statistic">
                <h2 className="spendings-evolution-per-categories-statistic-title">
                    Evoluția cheltuielilor pe categorii
                </h2>
                {statistics && statistics.data.length > 0 ? (
                    <>
                        <ReactApexChart
                            options={{
                                chart: { type: 'bar', height: 350 },
                                plotOptions: {
                                    bar: {
                                        colors: {
                                            ranges: [
                                                { from: -100, to: -46, color: '#F15B46' },
                                                { from: -45, to: 0, color: '#FEB019' }
                                            ]
                                        },
                                        columnWidth: '80%',
                                    }
                                },
                                dataLabels: { enabled: false },
                                yaxis: {
                                    labels: { formatter: (y) => `${y.toFixed(0)}%` }
                                },
                                xaxis: {
                                    categories: statistics.categories.map(category => categoryMap[category]),
                                    labels: { rotate: -45 }
                                },
                                tooltip: {
                                    y: {
                                        formatter: (val, { seriesIndex, dataPointIndex }) => {
                                            const category = statistics.data[dataPointIndex];
                                            return `
                                                        Categoria: ${categoryMap[category.category]}<br />
                                                        Cheltuieli în ${startMonth}/${startYear}: ${category.startTotal.toFixed(2)}<br />
                                                        Cheltuieli în ${endMonth}/${endYear}: ${category.endTotal.toFixed(2)}<br />
                                                        Creștere/Scădere: ${category.change.toFixed(2)}%
                                                    `;
                                        }
                                    }
                                },
                                events: {
                                    dataPointSelection: handleCategoryClick
                                }
                            }}
                            series={[{ name: '', data: statistics.data.map(item => item.change) }]}
                            type="bar"
                            height={350}
                            width={800}
                        />
                        {selectedCategory && (
                            <div className="category-details">
                                <p>
                                    Categoria: {categoryMap[selectedCategory.category]} <br />
                                    Cheltuieli în {startMonth}/{startYear}: {selectedCategory.startTotal.toFixed(2)} <br />
                                    Cheltuieli în {endMonth}/{endYear}: {selectedCategory.endTotal.toFixed(2)} <br />
                                    Creștere/Scădere: {selectedCategory.change.toFixed(2)}%
                                </p>
                            </div>
                        )}

                    </>
                ) : (
                    <p className="spendings-evolution-per-categories-statistic-no-data">
                        Nu există date pentru perioada selectată.
                    </p>
                )}
            </div>
        </>
    );
}
