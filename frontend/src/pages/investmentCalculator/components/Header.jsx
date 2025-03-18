import logo from "../../../assets/investment-calculator-logo.png";

export default function Header(){
    return(
        <header id="investment-calculator-header">
            <img src={logo} alt="Logo that shows a money bag"/>
            <h1 id="investment-calculator-top-writing">Calculator de investiții</h1>
        </header>
    );
}