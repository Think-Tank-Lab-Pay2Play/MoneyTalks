import GeneralTopBar from "../generalTopBar/GeneralTopBar"
import PagesBackground from "../pages-background/PagesBackground";
import Reports from "./reports/Reports";

export default function GenerateReports()
{
    return (
        <>
            <PagesBackground/>
            <GeneralTopBar/>
            <Reports/>
        </>
    );
}