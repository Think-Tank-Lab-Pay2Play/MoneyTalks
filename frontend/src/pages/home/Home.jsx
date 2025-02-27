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
import PagesBackground from "../components/pages-background/PagesBackground";

export default function Home() {
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
                    allSpendings: userResponse.data.allSpendings,
                    spendingLimits: userResponse.data.spendingLimits
                };

                console.log(userResponse.data);
                //console.log(userResponse.data.spendingLimits);

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
                    const currentMonth = now.getMonth();
                    const currentYear = now.getFullYear();
                
                    const totalCurrentMonthSpendings = userResponse.data.spendings
                        ?.filter(spending => {
                            const spendingDate = new Date(spending.date);
                            const spendingMonth = spendingDate.getMonth();
                            const spendingYear = spendingDate.getFullYear();
                            return spendingMonth === currentMonth && spendingYear === currentYear;
                        })
                        .reduce((sum, spending) => sum + spending.totalPrice, 0);
                
                    return totalCurrentMonthSpendings.toFixed(2);
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

            {/*<HomePageUserOptions />*/}

            <h3 className="last-5-bills-uploaded-text">Ultimele 5 bonuri incarcate</h3>
            <SpendingsTable data={lastFiveSpendings} />

            <h3 className="last-12-month-spendings">Cheltuielile tale pe ultimele 12 luni</h3>
            <SpendingsStatistic data={lastTwelveMonthsSpendings} />

            <VectorialIlustration />
        </>
    );
}