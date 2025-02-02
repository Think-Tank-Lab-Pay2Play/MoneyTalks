import GeneralTopBar from "../generalTopBar/GeneralTopBar";
import TheRatingUploadSpentCards from "./theRatingUploadSpentCards/TheRatingUploadSpentCards";
import TopWtiningOnHomePage from "./topWritingOnHomePage/TopWtiningOnHomePage";
import "./Home.css";
import SpendingsStatistic from "./spendingsStatistics/SpendingsStatistics";
import SpendingsTable from "./spendingsTable/SpendingsTable";
import HomePageUserOptions from "./homePageUserOptions/HomePageUserOptions";
import VectorialIlustration from "./vectorialIlustration/VectorialIlustration";


export default function Home() {
    const sampleData = [
        {
            id: 1,
            companyName: "Conda",
            numberOfProducts: 10,
            totalPrice: 250.75,
            date: "2025-01-28 12:35:56"
        },
        {
            id: 2,
            companyName: "Exemplu companie 2",
            numberOfProducts: 5,
            totalPrice: 100.5,
            date: "2025-01-27 18:24:16"
        },
        {
            id: 3,
            companyName: "Exemplu companie 3",
            numberOfProducts: 20,
            totalPrice: 500.99,
            date: "2025-01-26 21:03:39"
        },
        {
            id: 4,
            companyName: "Exemplu companie 4",
            numberOfProducts: 1,
            totalPrice: 46.99,
            date: "2025-01-26 21:03:39"
        },
        {
            id: 5,
            companyName: "Exemplu companie 5",
            numberOfProducts: 62,
            totalPrice: 1234,
            date: "2025-01-26 21:03:39"
        }
    ];


    const mockData = [
        { luna: "Ianuarie", suma: 1250 },
        { luna: "Februarie", suma: 1500 },
        { luna: "Martie", suma: 1000 },
        { luna: "Aprilie", suma: 1000 },
        { luna: "Mai", suma: 1250 },
        { luna: "Iunie", suma: 1300 },
        { luna: "Iulie", suma: 1500 },
        { luna: "August", suma: 1700 },
        { luna: "Septembrie", suma: 1250 },
        { luna: "Octombrie", suma: 1200 },
        { luna: "Noiembrie", suma: 1300 },
        { luna: "Decembrie", suma: 1100 },
    ];


    return (
        <>
            <GeneralTopBar />
            <TopWtiningOnHomePage />
            <TheRatingUploadSpentCards />
            <HomePageUserOptions />
            <h3 className="last-5-bills-uploaded-text">Ultimele 5 bonuri incarcate</h3>
            <SpendingsTable data={sampleData} /> {/* seteaza parametrul "data" dupa implementare backend */}
            <h3 className="last-12-month-spendings">Cheltuielile tale pe ultimele 12 luni</h3>
            <SpendingsStatistic data={mockData} />
            <VectorialIlustration />
        </>
    );
}