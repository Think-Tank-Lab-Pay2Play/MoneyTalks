import DateInputCalendar from "../components/dateInputCalendar/DateInputCalendar";
import "./SpendingsAverageInAPeriod.css";

export default function SpendingsAverageInAPeriod({ userSpendings, startDate, setStartDate, endDate, setEndDate }) {
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

    return (
        <>
            <DateInputCalendar startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} />
            
            <h2 className="spendings-average-in-a-period-title">
                {start && end
                    ? `Media cheltuielilor dumneavoastră din perioada ${formatDate(start)} până în ${formatDate(end)}`
                    : "Selectați o perioadă pentru a vedea media cheltuielilor"
                }
            </h2>

            <div className="spendings-average-in-a-period">
                {(!startDate || !endDate) ? (
                    <p className="average-spendings-no-data"></p>
                ) : (
                    Object.keys(categorySpendings).length > 0 ? (
                        Object.entries(categorySpendings).map(([category, total]) => (
                            <p key={category}>
                                Ai cheltuit în medie {(total / daysCount).toFixed(2)} RON pe zi pentru achizițiile din categoria {category}.
                            </p>
                        ))
                    ) : (
                        <></>
                    )
                )}
            </div>
        </>
    );
}
