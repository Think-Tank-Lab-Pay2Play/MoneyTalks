import GeneralTopBar from "../generalTopBar/GeneralTopBar";
import ViewAllSpendingsImage from "./viewAllSpendingsImage/ViewAllSpendingsImage";
import ViewAllSpendingsTable from "./ViewAllSpendingsTable/ViewAllSpendingsTable";
import "./ViewSpendings.css"
import ViewSpendingsTopWriting from "./viewSpendingsTopWriting/ViewSpendingsTopWriting";

export default function ViewSpendings() {
    return (
        <>
            <GeneralTopBar />
            <ViewSpendingsTopWriting />

            <ViewAllSpendingsTable
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
                        companyName: `Company ${1 + i}`,
                        numberOfProducts: Math.floor(Math.random() * 5) + 1,
                        totalPrice: Math.floor(Math.random() * 1000) + 100,
                        products: Array.from({ length: Math.floor(Math.random() * 5) + 1 }, (_, j) => ({
                            name: `Product ${j + 1}`,
                            category: ["Electronice", "Electrocasnice", "Mobilier", "Îmbrăcăminte", "Încălțăminte", "Sport", "Alimentație", "Papetărie", "IT & Software", "Birotică"][Math.floor(Math.random() * 10)],
                            quantity: Math.floor(Math.random() * 3) + 1,
                            totalPrice: Math.floor(Math.random() * 500) + 50
                        })),
                        purchaseDate: "02/05/2023 14:00"
                    }))
                ]}
            />


            <ViewAllSpendingsImage />

        </>
    );
}