import { useState, useEffect } from "react";
import logoDefault from "../../../assets/app-logo.png";
import logoCraciun from "../../../assets/app-logo-craciun.png";
import logoPaste from "../../../assets/app-logo-paste.png";

export default function Logos() {
    // INTERVAL: [ holiday - holidayMinus .. holiday .. holiday + holidayPlus ]
    const holidayMinus = 7;
    const holidayPlus = 7;

    const [logo, setLogo] = useState(logoDefault);

    useEffect(() => {
        const today = new Date();
        const year = today.getFullYear();

        const craciun = new Date(year, 11, 25);
        const craciunStart = new Date(craciun);
        craciunStart.setDate(craciunStart.getDate() - holidayMinus);
        const craciunEnd = new Date(craciun);
        craciunEnd.setDate(craciunEnd.getDate() + holidayPlus);

        function getOrthodoxEasterDate(year) {
            const a = year % 19;
            const b = year % 7;
            const c = year % 4;
            const d = (19 * a + 16) % 30;
            const e = (2 * c + 4 * b + 6 * d) % 7;
            const f = d + e;

            let day = 22 + f;
            let month = 3;
            if (day > 31) {
                day -= 31;
                month = 4;
            }

            const easterIulian = new Date(year, month - 1, day); 
            const gregorianOffset = 13; 
            easterIulian.setDate(easterIulian.getDate() + gregorianOffset);

            return easterIulian;
        }

        const paste = getOrthodoxEasterDate(year);
        const pasteStart = new Date(paste);
        pasteStart.setDate(pasteStart.getDate() - holidayMinus);
        const pasteEnd = new Date(paste);
        pasteEnd.setDate(pasteEnd.getDate() + holidayPlus);

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
