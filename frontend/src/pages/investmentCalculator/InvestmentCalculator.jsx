import PagesBackground from "../components/pages-background/PagesBackground.jsx";
import GeneralTopBar from "../generalTopBar/GeneralTopBar.jsx";
import Header from "./components/Header.jsx";
import Results from "./components/Results.jsx";
import UserInput from "./components/UserInput.jsx";
import "./InvestmentCalculator.css";
import { useState } from "react";

export default function InvestmentCalculator(){
    const [userInput, setUserInput] = useState({
        initialInvestment:100,
        annualInvestment: 1100,
        expectedReturn: 8.5,
        duration:5,
      });
    
      const isValidInput = userInput.duration >= 0.25 && userInput.expectedReturn >= 1 && userInput.annualInvestment >= 1 && userInput.initialInvestment >= 1;
    
      function handleInputChange(inputIdentifier, updateValue){
        setUserInput(prevUserInput => {
            return{
                ...userInput,
                [inputIdentifier]: +updateValue,
            }
        });
    }
    
      return <div className="investment-calculator-wrapper">
        <PagesBackground/>
        <GeneralTopBar />
        <Header />
        <UserInput userInput={userInput} handleChange={handleInputChange} />
        {isValidInput ? <Results userInput={userInput}/> : <p className="investment-calculator-center">Vă rugăm să introduceți date corecte!</p>}
        </div>
}