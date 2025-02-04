import GeneralTopBar from "../generalTopBar/GeneralTopBar"
import Reports from "./reports/Reports";

export default function GenerateReports()
{
    const mockData = {
        budget: "Buget vs Cheltuieli:\n- Total: 5000 RON\n- Cheltuit: 4500 RON",
      };
      
    return (
        <>
            <GeneralTopBar/>
            <Reports/>
        </>
    );
}