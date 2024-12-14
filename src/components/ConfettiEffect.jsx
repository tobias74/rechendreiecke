import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiEffect({ width, height, trigger, confettiSource }) {
    const [recycle, setRecycle] = useState(false);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (trigger) {
            setIsActive(true);
            setRecycle(true);
            const stopRecycle = setTimeout(() => setRecycle(false), 1000); // Stop new confetti after 1 second
            const hideConfetti = setTimeout(() => setIsActive(false), 5000); // Completely hide confetti after 5 seconds

            return () => {
                clearTimeout(stopRecycle);
                clearTimeout(hideConfetti);
            };
        }
    }, [trigger]);

    if (!isActive) return null;

    return (
        <Confetti
            width={width}
            height={height}
            numberOfPieces={500}
            gravity={0.2}
            recycle={recycle}
        />
    );
}
