import "./MoreStatistics.css"
import GeneralTopBar from "../generalTopBar/GeneralTopBar";
import StatisticsOptions from "./components/statisticsOptions/StatisticsOptions";
import PagesBackground from "../pages-background/PagesBackground";
import ResultsForTheStatistics from "./components/resultsForTheStatistics/ResultsForTheStatistics";


export default function MoreStatistics() {
    return (
        <>
            <PagesBackground/>
            <GeneralTopBar/>
            <StatisticsOptions/>
            <ResultsForTheStatistics/>
            {/*

1. afisarea cheltuielilor pe categorii in una din lunile unui an

2. Evoluția cheltuielilor pe categorii (ex: "Cheltuieli cu mâncarea au crescut cu 20% față de luna trecută").

3. Media cheltuielilor pe o perioada de timp (cat ai cheltuit in medie pe zi/saptamana/luna intr-o saptamana/luna/an)

4. Top cheltuieli pe o perioada de timp

5. setare obiectiv cheltuieli maxime intr-o luna

6. 

            


Harta Geografică a Cheltuielilor
Descriere: O hartă interactivă care arată unde s-au făcut cele mai multe cheltuieli (ex: magazine, restaurante).

Beneficiu: Utilizatorii pot identifica locurile/zonele unde cheltuie prea mult și să găsească alternative mai ieftine.
            */}
        </>
    );
}