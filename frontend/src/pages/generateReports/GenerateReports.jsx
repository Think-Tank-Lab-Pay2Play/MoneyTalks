import GeneralTopBar from "../generalTopBar/GeneralTopBar"
import PagesBackground from "../components/pages-background/PagesBackground";
import Reports from "./reports/Reports";
import WavingRobot from "./wavingRobot/WavingRobot";

export default function GenerateReports()
{
    return (
        <>
            <PagesBackground/>
            <GeneralTopBar/>
            <Reports/>
            <WavingRobot/>
        </>
    );
}