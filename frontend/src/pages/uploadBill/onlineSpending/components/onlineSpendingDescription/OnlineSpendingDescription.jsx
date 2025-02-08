import { useState } from "react";
import "./OnlineSpendingDescription.css";

export default function OnlineSpendingDescription() {
    const [text, setText] = useState("");

    return (
        <div className="onlineSpendingDescription-container">
            <textarea
                className="onlineSpendingDescription-input"
                placeholder="Scrie o scurtă descriere a cheltuielii"
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
        </div>
    );
}
