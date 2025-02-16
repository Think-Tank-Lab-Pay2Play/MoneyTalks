import "./MoreStatistics.css"
import GeneralTopBar from "../generalTopBar/GeneralTopBar";
import StatisticsOptions from "./components/statisticsOptions/StatisticsOptions";
import PagesBackground from "../components/pages-background/PagesBackground";
import ResultsForTheStatistics from "./components/resultsForTheStatistics/ResultsForTheStatistics";


export default function MoreStatistics() {
    return (
        <>
            <PagesBackground/>
            <GeneralTopBar/>
            <StatisticsOptions/>
            <ResultsForTheStatistics/>
            {/*     
Harta Geografică a Cheltuielilor
Descriere: O hartă interactivă care arată unde s-au făcut cele mai multe cheltuieli (ex: magazine, restaurante).

Beneficiu: Utilizatorii pot identifica locurile/zonele unde cheltuie prea mult și să găsească alternative mai ieftine.

!!!! Asta ar merge sa spunem la prezentare ca am putea adauga
            */}
        </>
    );
}