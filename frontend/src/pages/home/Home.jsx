import GeneralTopBar from "../generalTopBar/GeneralTopBar";
import TheRatingUploadSpentCards from "./theRatingUploadSpentCards/TheRatingUploadSpentCards";
import TopWtiningOnHomePage from "./topWritingOnHomePage/TopWtiningOnHomePage";
import "./Home.css";
import SpendingsStatistic from "./spendingsStatistics/SpendingsStatistics";
import SpendingsTable from "./spendingsTable/SpendingsTable";
import HomePageUserOptions from "./homePageUserOptions/HomePageUserOptions";
import VectorialIlustration from "./vectorialIlustration/VectorialIlustration";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PagesBackground from "../pages-background/PagesBackground";

export default function Home() {
    const sampleDataForLastFiveSpendings = [
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


    const sampleDataForLastTwelveMonthsSpendings = [
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


    const [lastFiveSpendings, setLastFiveSpendings] = useState("");
    const [lastTwelveMonthsSpendings, setLastTwelveMonthsSpendings] = useState("");
    const [lastThirtyDaysSpendingsSum, setLastThirtyDaysSpendingsSum] = useState("");
    const [uploadedBillsOnThePastThirtyDays, setUploadedBillsOnThePastThirtyDays] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const storedData = localStorage.getItem("auth");
            if (!storedData) return;

            const { email, password } = JSON.parse(storedData);
            try {
                const userEmail = email;

                const userResponse = await axios.get(`http://localhost:8080/users/byEmail/${userEmail}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    auth: {
                        username: email,
                        password: password,
                    }
                });

                const userData = {
                    id: userResponse.data.id,
                    firstName: userResponse.data.firstName,
                    lastName: userResponse.data.lastName,
                    email: userResponse.data.email,
                    password: password,
                    allSpendings: userResponse.data.allSpendings
                };

                //console.log(userResponse.data.spendings);

                 setLastFiveSpendings(
                    userResponse.data.spendings
                        ?.sort((a, b) => new Date(b.date) - new Date(a.date))
                        .slice(0, 5)
                        .map((spending) => ({
                            ...spending, // Spread the original spending data
                            numberOfProducts: spending.products?.length || 0
                        }))
                );

                setLastTwelveMonthsSpendings(() => {
                    const now = new Date();
                    const monthlySpendings = new Map();

                    userResponse.data.spendings?.forEach(spending => {
                        const spendingDate = new Date(spending.date);
                        const key = `${spendingDate.getFullYear()}-${spendingDate.getMonth() + 1}`;

                        if (!monthlySpendings.has(key)) {
                            monthlySpendings.set(key, {
                                luna: spendingDate.toLocaleString("ro-RO", { month: "long", year: "numeric" }),
                                suma: 0
                            });
                        }

                        monthlySpendings.get(key).suma += spending.totalPrice;
                    });

                    return Array.from(monthlySpendings.values()).sort((a, b) => new Date(a.luna) - new Date(b.luna));
                });

                setLastThirtyDaysSpendingsSum(() => {
                    const now = new Date();
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(now.getDate() - 30);

                    const totalLastThirtyDays = userResponse.data.spendings
                        ?.filter(spending => {
                            const spendingDate = new Date(spending.date);
                            return spendingDate >= thirtyDaysAgo && spendingDate <= now;
                        })
                        .reduce((sum, spending) => sum + spending.totalPrice, 0);

                    return totalLastThirtyDays;
                });

                setUploadedBillsOnThePastThirtyDays(() => {
                    const now = new Date();
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(now.getDate() - 30);

                    const billsCount = userResponse.data.spendings
                        ?.filter(spending => {
                            const spendingDate = new Date(spending.date);
                            return spendingDate >= thirtyDaysAgo && spendingDate <= now;
                        }).length || 0; // Dacă nu sunt cheltuieli, returnează 0

                    return billsCount;
                });


            } catch (error) {
                console.error("Eroare la preluarea userului:", error);
            }
        };

        fetchUserData();
    }, []);


    return (
        <>
            <PagesBackground/>
            <GeneralTopBar />
            <TopWtiningOnHomePage />

            <TheRatingUploadSpentCards
                lastThirtyDaysSpendingsSum={lastThirtyDaysSpendingsSum}
                uploadedBillsOnThePastThirtyDays={uploadedBillsOnThePastThirtyDays}
            />

            <HomePageUserOptions />

            <h3 className="last-5-bills-uploaded-text">Ultimele 5 bonuri incarcate</h3>
            <SpendingsTable data={lastFiveSpendings} />

            <h3 className="last-12-month-spendings">Cheltuielile tale pe ultimele 12 luni</h3>
            <SpendingsStatistic data={lastTwelveMonthsSpendings} />

            <VectorialIlustration />
        </>
    );
}