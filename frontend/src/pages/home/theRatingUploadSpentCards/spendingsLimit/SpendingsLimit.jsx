import { useState } from "react";
import "./SpendingsLimit.css";
import { toast } from 'react-toastify';

export default function SpendingsLimit({ onLimitaConfirm }) {
    const [showInput, setShowInput] = useState(false);
    const [valoare, setValoare] = useState("");

    const handleConfirm = () => {
        const numar = parseInt(valoare, 10);
        if (numar > 100 && numar < 999999) {
            onLimitaConfirm(numar);
            setShowInput(false);
        } else {
            toast.error('Introduceți un număr mai mare de 100 și mai mic ca 999.999!', {autoClose: 5000});
        }
    };

    return (
        <div className="spendings-limit-home-page-container">
            {!showInput && (
                <button
                    onClick={() => setShowInput(true)}
                    className="spendings-limit-home-page-button"
                >
                    Setează limită cheltuieli pe această lună
                </button>
            )}

            {showInput && (
                <div className="spendings-limit-home-page-input-container">
                    <input
                        type="number"
                        value={valoare}
                        onChange={(e) => setValoare(e.target.value)}
                        placeholder="Introduceți limita"
                        className="spendings-limit-home-page-input"
                    />
                    <button
                        onClick={handleConfirm}
                        className="spendings-limit-home-page-confirm-btn"
                    >
                        Confirmă limita
                    </button>
                </div>
            )}
        </div>
    );
}
