import { calculateInvestmentResults, formatter } from "../util/investment.js"

export default function Results({userInput}) {
    const results = calculateInvestmentResults(userInput);
    const initialInvestment = results[0].valueEndOfYear - results[0].interest - results[0].annualInvestment;
    //console.log(results);

    return <table id="investment-calculator-result">
        <thead>
            <tr>
                <th>Anul</th>
                <th>Valoarea investiției</th>
                <th>Dobândă (pe an)</th>
                <th>Dobândă totală</th>
                <th>Capital investit</th>
            </tr>
        </thead>
        <tbody>
            {results.map(yearData => {
                const totalInterest = yearData.valueEndOfYear - yearData.annualInvestment * yearData.year - initialInvestment;
                const totalAmountinvested = yearData.valueEndOfYear - totalInterest;
                return <tr key={yearData.year}>
                    <td>{yearData.year}</td>
                    <td>{formatter.format(yearData.valueEndOfYear)}</td>
                    <td>{formatter.format(yearData.interest)}</td>
                    <td>{formatter.format(totalInterest)}</td>
                    <td>{formatter.format(totalAmountinvested)}</td>
                </tr>
            })}
        </tbody>
    </table>
}