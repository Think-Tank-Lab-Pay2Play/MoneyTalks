import { useState, useEffect } from "react";
import logoDefault from "../../../assets/app-logo.png";
import logoCraciun from "../../../assets/app-logo-craciun.png";
import logoPaste from "../../../assets/app-logo-paste.png";

export default function Logos() {
    const [logo, setLogo] = useState(logoDefault);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();

        const craciun = new Date(year, 11, 25);
        const craciunStart = new Date(craciun);
        craciunStart.setDate(craciunStart.getDate() - 7);
        const craciunEnd = new Date(craciun);
        craciunEnd.setDate(craciunEnd.getDate() + 7);

        function getEasterDate(y) {
            const a = y % 19;
            const b = y % 4;
            const c = y % 7;
            const d = (19 * a + 16) % 30;
            const e = (2 * b + 4 * c + 6 * d) % 7;
            const f = d + e;
            const easter = new Date(y, 2, 22 + f);
            if (easter.getMonth() === 3 && easter.getDate() > 31) {
                easter.setMonth(3);
                easter.setDate(easter.getDate() - 31);
            }
            return easter;
        }

        const paste = getEasterDate(year);
        const pasteStart = new Date(paste);
        pasteStart.setDate(pasteStart.getDate() - 7);
        const pasteEnd = new Date(paste);
        pasteEnd.setDate(pasteEnd.getDate() + 7);

        if (today >= craciunStart && today <= craciunEnd) {
            setLogo(logoCraciun);
        } else if (today >= pasteStart && today <= pasteEnd) {
            setLogo(logoPaste);
        } else {
            setLogo(logoDefault);
        }
    }, []);

    return <img src={logo} alt="Logo" />;
}
