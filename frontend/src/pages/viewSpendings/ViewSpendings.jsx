import GeneralTopBar from "../generalTopBar/GeneralTopBar";
import ViewAllSpendingsImage from "./viewAllSpendingsImage/ViewAllSpendingsImage";
import ViewAllSpendingsTable from "./viewAllSpendingsTable/ViewAllSpendingsTable";
import "./ViewSpendings.css"
import ViewSpendingsTopWriting from "./viewSpendingsTopWriting/ViewSpendingsTopWriting";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PagesBackground from "../components/pages-background/PagesBackground";

export default function ViewSpendings() {

    const [allSpendings, setAllSpendings] = useState([]);

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

                setAllSpendings(userResponse.data.spendings);
            } catch (error) {
                console.error("Eroare la preluarea userului:", error);
            }
        };

        fetchUserData();
    }, []);

    const updateSpendings = async () => {
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

            setAllSpendings(userResponse.data.spendings);
        } catch (error) {
            console.error("Eroare la actualizarea cheltuielilor:", error);
        }
    };

    return (
        <>
            <PagesBackground/>
            <GeneralTopBar />
            <ViewSpendingsTopWriting />

             {/*<ViewAllSpendingsTable
                spendings={[
                    {
                        id: 1,
                        companyName: "Company 1",
                        numberOfProducts: 3,
                        totalPrice: 150.50,
                        products: [
                            { name: "Product 1", category: "Electronice", quantity: 2, totalPrice: 100.00 },
                            { name: "Product 2", category: "Electrocasnice", quantity: 1, totalPrice: 50.50 }
                        ],
                        purchaseDate: "02/05/2023 14:00"
                    },
                    ...Array.from({ length: 29 }, (_, i) => ({
                        id: 2 + i,
                        companyName: Company ${1 + i},
                        numberOfProducts: Math.floor(Math.random() * 5) + 1,
                        totalPrice: Math.floor(Math.random() * 1000) + 100,
                        products: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
                            name: Product ${j + 1},
                            category: ["Electronice", "Electrocasnice", "Mobilier", "Îmbrăcăminte", "Încălțăminte", "Sport", "Alimentație", "Papetărie", "IT & Software", "Birotică"][Math.floor(Math.random() * 10)],
                            quantity: Math.floor(Math.random() * 3) + 1,
                            totalPrice: Math.floor(Math.random() * 500) + 50
                        })),
                        purchaseDate: "02/05/2023 14:00"
                    }))
                ]}
            />*/}


            <ViewAllSpendingsTable spendings={allSpendings} onSpendingDeleted={updateSpendings}/>

            <ViewAllSpendingsImage />
        </>
    );
}
