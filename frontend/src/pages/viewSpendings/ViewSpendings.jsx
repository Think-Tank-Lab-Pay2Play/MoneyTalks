import GeneralTopBar from "../generalTopBar/GeneralTopBar";
import ViewAllSpendingsTable from "./ViewAllSpendingsTable/ViewAllSpendingsTable";
import "./ViewSpendings.css"

export default function ViewSpendings() {
    return (
        <>
            <GeneralTopBar />

            <ViewAllSpendingsTable
                spendings={[
                    { id: 1, companyName: "Example Company", numberOfProducts: 3, totalPrice: 150.50, products: [{ name: "Product 1", quantity: 2, totalPrice: 100.00 }, { name: "Product 2", quantity: 1, totalPrice: 50.50 }], purchaseDate: "02/05/2023 14:00" },
                    { id: 2, companyName: "Example Company 2", numberOfProducts: 5, totalPrice: 1150.50, products: [{ name: "Product 1", quantity: 2, totalPrice: 100.00 }, { name: "Product 2", quantity: 1, totalPrice: 50.50 }, { name: "Product 3", quantity: 2, totalPrice: 1000.50 }], purchaseDate: "08/11/2022 10:30" },
                    { id: 3, companyName: "Company 3", numberOfProducts: 4, totalPrice: 250.00, products: [{ name: "Product A", quantity: 1, totalPrice: 200.00 }, { name: "Product B", quantity: 3, totalPrice: 50.00 }], purchaseDate: "01/07/2021 09:00" },
                    { id: 4, companyName: "Company 4", numberOfProducts: 2, totalPrice: 550.00, products: [{ name: "Product C", quantity: 2, totalPrice: 550.00 }], purchaseDate: "14/03/2024 16:00" },
                    { id: 5, companyName: "Company 5", numberOfProducts: 6, totalPrice: 650.00, products: [{ name: "Product X", quantity: 4, totalPrice: 400.00 }, { name: "Product Y", quantity: 2, totalPrice: 250.00 }], purchaseDate: "30/09/2021 13:00" },
                    { id: 6, companyName: "Company 6", numberOfProducts: 3, totalPrice: 450.00, products: [{ name: "Product P", quantity: 3, totalPrice: 450.00 }], purchaseDate: "22/01/2023 14:00" },
                    { id: 7, companyName: "Company 7", numberOfProducts: 1, totalPrice: 100.00, products: [{ name: "Product Q", quantity: 1, totalPrice: 100.00 }], purchaseDate: "17/04/2022 11:30" },
                    { id: 8, companyName: "Company 8", numberOfProducts: 4, totalPrice: 1200.00, products: [{ name: "Product Z", quantity: 4, totalPrice: 1200.00 }], purchaseDate: "12/10/2021 18:00" },
                    { id: 9, companyName: "Company 9", numberOfProducts: 5, totalPrice: 950.00, products: [{ name: "Product W", quantity: 5, totalPrice: 950.00 }], purchaseDate: "03/08/2023 15:00" },
                    { id: 10, companyName: "Company 10", numberOfProducts: 2, totalPrice: 350.00, products: [{ name: "Product E", quantity: 2, totalPrice: 350.00 }], purchaseDate: "24/11/2024 17:30" },
                    { id: 11, companyName: "Company 11", numberOfProducts: 3, totalPrice: 450.00, products: [{ name: "Product G", quantity: 3, totalPrice: 450.00 }], purchaseDate: "07/06/2022 12:15" },
                    { id: 12, companyName: "Company 12", numberOfProducts: 1, totalPrice: 120.00, products: [{ name: "Product F", quantity: 1, totalPrice: 120.00 }], purchaseDate: "15/09/2021 08:30" },
                    { id: 13, companyName: "Company 13", numberOfProducts: 4, totalPrice: 800.00, products: [{ name: "Product R", quantity: 4, totalPrice: 800.00 }], purchaseDate: "02/06/2022 14:30" },
                    { id: 14, companyName: "Company 14", numberOfProducts: 2, totalPrice: 270.00, products: [{ name: "Product T", quantity: 2, totalPrice: 270.00 }], purchaseDate: "21/04/2021 09:15" },
                    { id: 15, companyName: "Company 15", numberOfProducts: 3, totalPrice: 600.00, products: [{ name: "Product M", quantity: 3, totalPrice: 600.00 }], purchaseDate: "11/01/2024 10:00" },
                    { id: 16, companyName: "Company 16", numberOfProducts: 5, totalPrice: 1100.00, products: [{ name: "Product S", quantity: 5, totalPrice: 1100.00 }], purchaseDate: "09/02/2024 13:00" },
                    { id: 17, companyName: "Company 17", numberOfProducts: 6, totalPrice: 1300.00, products: [{ name: "Product D", quantity: 6, totalPrice: 1300.00 }], purchaseDate: "25/12/2020 16:45" },
                    { id: 18, companyName: "Company 18", numberOfProducts: 4, totalPrice: 750.00, products: [{ name: "Product N", quantity: 4, totalPrice: 750.00 }], purchaseDate: "04/03/2023 09:30" },
                    { id: 19, companyName: "Company 19", numberOfProducts: 2, totalPrice: 190.00, products: [{ name: "Product O", quantity: 2, totalPrice: 190.00 }], purchaseDate: "13/08/2022 17:00" },
                    { id: 20, companyName: "Company 20", numberOfProducts: 3, totalPrice: 450.00, products: [{ name: "Product L", quantity: 3, totalPrice: 450.00 }], purchaseDate: "29/05/2022 14:00" },
                    { id: 21, companyName: "Company 21", numberOfProducts: 1, totalPrice: 130.00, products: [{ name: "Product U", quantity: 1, totalPrice: 130.00 }], purchaseDate: "17/01/2025 13:00" },
                    { id: 22, companyName: "Company 22", numberOfProducts: 5, totalPrice: 1150.00, products: [{ name: "Product H", quantity: 5, totalPrice: 1150.00 }], purchaseDate: "06/10/2024 12:00" },
                    { id: 23, companyName: "Company 23", numberOfProducts: 3, totalPrice: 300.00, products: [{ name: "Product J", quantity: 3, totalPrice: 300.00 }], purchaseDate: "20/07/2022 10:30" },
                    { id: 24, companyName: "Company 24", numberOfProducts: 2, totalPrice: 450.00, products: [{ name: "Product I", quantity: 2, totalPrice: 450.00 }], purchaseDate: "10/03/2025 11:00" },
                    { id: 25, companyName: "Company 25", numberOfProducts: 4, totalPrice: 800.00, products: [{ name: "Product V", quantity: 4, totalPrice: 800.00 }], purchaseDate: "27/01/2025 08:45" },
                    { id: 26, companyName: "Company 26", numberOfProducts: 6, totalPrice: 1250.00, products: [{ name: "Product K", quantity: 6, totalPrice: 1250.00 }], purchaseDate: "18/06/2022 16:30" },
                    { id: 27, companyName: "Company 27", numberOfProducts: 5, totalPrice: 1000.00, products: [{ name: "Product T", quantity: 5, totalPrice: 1000.00 }], purchaseDate: "02/07/2023 15:30" },
                    { id: 28, companyName: "Company 28", numberOfProducts: 2, totalPrice: 350.00, products: [{ name: "Product M", quantity: 2, totalPrice: 350.00 }], purchaseDate: "15/12/2024 13:15" },
                    { id: 29, companyName: "Company 29", numberOfProducts: 3, totalPrice: 500.00, products: [{ name: "Product B", quantity: 3, totalPrice: 500.00 }], purchaseDate: "28/02/2023 10:45" },
                    { id: 30, companyName: "Company 30", numberOfProducts: 4, totalPrice: 1100.00, products: [{ name: "Product F", quantity: 4, totalPrice: 1100.00 }], purchaseDate: "03/02/2025 12:00" },
                ]}
                onDelete={(deletedId) => console.log('Deleted:', deletedId)}
            />


        </>
    );
}