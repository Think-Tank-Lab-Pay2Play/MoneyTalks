import SpendingsTable from "../dynamicComponents/spendingsTable/SpendingsTable";
import GeneralTopBar from "../generalTopBar/GeneralTopBar";
import TheRatingUploadSpentCards from "./theRatingUploadSpentCards/TheRatingUploadSpentCards";
import TopWtiningOnHomePage from "./topWritingOnHomePage/TopWtiningOnHomePage";

import { useState, useEffect } from "react";


export default function Home() {

    /* request prin api pentru cererea de date */

    const [spendings, setSpendings] = useState([]);

    useEffect(() => {
        const fetchSpendings = async () => {
            try {
                const response = await fetch("http://localhost:5173/api/spendings/home");
                if (!response.ok) throw new Error("Failed to fetch");
                const data = await response.json();
                setSpendings(data);
            } catch (error) {
                console.error("Error fetching spendings:", error);
                setSpendings([]);
            }
        };
        fetchSpendings();
    }, []);

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
        },
        {
            id: 6,
            companyName: "Exemplu companie 5",
            numberOfProducts: 62,
            totalPrice: 1234,
            date: "2025-01-26 21:03:39"
        },
        {
            id: 7,
            companyName: "Exemplu companie 5",
            numberOfProducts: 62,
            totalPrice: 1234,
            date: "2025-01-26 21:03:39"
        },
        {
            id: 8,
            companyName: "Exemplu companie 5",
            numberOfProducts: 62,
            totalPrice: 1234,
            date: "2025-01-26 21:03:39"
        },
        {
            id: 9,
            companyName: "Exemplu companie 5",
            numberOfProducts: 62,
            totalPrice: 1234,
            date: "2025-01-26 21:03:39"
        }
    ];

    return (
        <>
            <GeneralTopBar />
            <TopWtiningOnHomePage />
            <TheRatingUploadSpentCards />
            <SpendingsTable data={sampleData} /> {/* reutilizabil in pagina de all spendings || seteaza parametrul "data" dupa implementare backend */ }
        </>
    );
}