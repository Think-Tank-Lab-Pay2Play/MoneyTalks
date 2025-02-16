import { useState, useEffect } from "react";
import MonthYearInput from "../components/monthYearInput/MonthYearInput";
import "./SpendingsEvolutionPerCategories.css";
import { spendingCategories } from "../../../../components/spendingsCategories/SpendingCategories.jsx";

export default function SpendingsEvolutionPerCategories({ userSpendings }) {
    const [startMonth, setStartMonth] = useState(null);
    const [startYear, setStartYear] = useState(null);
    const [endMonth, setEndMonth] = useState(null);
    const [endYear, setEndYear] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [filteredSpendings, setFilteredSpendings] = useState([]);
    const [statistics, setStatistics] = useState(null);

    const categories = spendingCategories;

    useEffect(() => {
        applyFilter();
    }, [selectedCategory, startMonth, startYear, endMonth, endYear]);

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

            const isCategoryMatch = selectedCategory
                ? spending.products.some(product => product.category === selectedCategory)
                : true;

            return isAfterStart && isBeforeEnd && isCategoryMatch;
        });

        setFilteredSpendings(filtered);
    };

    useEffect(() => {
        setStatistics(null);
    }, [selectedCategory]);

    const calculateStatistics = () => {
        if (!selectedCategory || !startMonth || !startYear || !endMonth || !endYear) {
            setStatistics(null);
            return;
        }

        let startTotal = 0;
        let endTotal = 0;

        filteredSpendings.forEach(spending => {
            const spendingDate = new Date(spending.date);
            const month = spendingDate.getMonth() + 1;
            const year = spendingDate.getFullYear();

            spending.products.forEach(product => {
                if (product.category === selectedCategory) {
                    if (year === startYear && month === startMonth) {
                        startTotal += Number(product.totalPrice) || 0;
                    }
                    if (year === endYear && month === endMonth) {
                        endTotal += Number(product.totalPrice) || 0;
                    }
                }
            });
        });

        if (startTotal === 0 && endTotal === 0) {
            setStatistics(null);
            return;
        }

        const percentageChange = startTotal !== 0
            ? ((endTotal - startTotal) / startTotal) * 100
            : 100;


        const isValid = !isNaN(startTotal) && !isNaN(endTotal);
        const bothZero = startTotal === 0 && endTotal === 0;

        if (!isValid || bothZero) {
            setStatistics(null);
            return;
        }

        setStatistics({
            category: selectedCategory,
            startTotal: startTotal.toFixed(2),
            endTotal: endTotal.toFixed(2),
            percentageChange: percentageChange.toFixed(2)
        });
    };

    
    const getMonthName = (monthNumber) => {
        const months = [
            "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
            "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie"
        ];
        return months[monthNumber - 1] || '';
    };


    return (
        <>
            <MonthYearInput
                startMonth={startMonth} setStartMonth={setStartMonth}
                startYear={startYear} setStartYear={setStartYear}
                endMonth={endMonth} setEndMonth={setEndMonth}
                endYear={endYear} setEndYear={setEndYear}
            />

            <div className="spendings-evolution-per-categories-pick-category-button">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="" disabled hidden>Selectează o categorie</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="spendings-evolution-per-categories-statistic">
                <h2>Statistici ale cheltuielilor</h2>
                {statistics ? (
                    <p>
                        Cheltuielile din categoria {statistics.category} au
                        {statistics.percentageChange >= 0 ? " crescut " : " scăzut "}
                        cu {Math.abs(statistics.percentageChange)}%
                        din luna {getMonthName(startMonth)} {startYear} până în luna {getMonthName(endMonth)} {endYear}.
                        <br />
                        (De la {statistics.startTotal} la {statistics.endTotal})
                    </p>
                ) : (
                    <p>Nu există date suficiente pentru a genera statistici.</p>
                )}
            </div>

        </>
    );
}
