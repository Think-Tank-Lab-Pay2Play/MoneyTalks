import "./HiUserMessage.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HiUserMessage() {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            const storedData = localStorage.getItem("auth");
            if (!storedData) return;

            const { email, password } = JSON.parse(storedData);
            try {
                const userEmail = email;
                //console.log(userEmail);

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

                //console.log(userData);

                setFirstName(userResponse.data.firstName || "");
            } catch (error) {
                console.error("Eroare la preluarea userului:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <h1 className="general-topbar-hi-user" onClick={() => navigate("/account")}>
            Salut, {firstName}!
        </h1>
    );
}
