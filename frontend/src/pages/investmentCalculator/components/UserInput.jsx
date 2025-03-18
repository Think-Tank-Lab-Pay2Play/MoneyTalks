export default function UserInput({userInput, handleChange}) {
    return <section id="investment-calculator-user-input">
        <div className="investment-calculator-input-group">
            <p>
                <label>Prima investiție</label>
                <input type="number" required value={userInput.initialInvestment} onChange={(event) => handleChange("initialInvestment", event.target.value)}/>
            </p>
            <p>
                <label>Investiție anuală</label>
                <input type="number" required value={userInput.annualInvestment} onChange={(event) => handleChange("annualInvestment", event.target.value)}/>
            </p>
        </div>
        <div className="investment-calculator-input-group">
            <p>
                <label>Randament (%)</label>
                <input type="number" required value={userInput.expectedReturn} onChange={(event) => handleChange("expectedReturn", event.target.value)}/>
            </p>
            <p>
                <label>Perioada de timp (în ani)</label>
                <input type="number" required value={userInput.duration} onChange={(event) => handleChange("duration", event.target.value)}/>
            </p>
        </div>
    </section>
}