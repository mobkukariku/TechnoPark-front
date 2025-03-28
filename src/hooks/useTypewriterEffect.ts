import { useState, useEffect } from "react";

export const useTypewriterEffect = (text: string, speed = 200) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex >= text.length) return;

        const interval = setInterval(() => {
            setDisplayedText(text.slice(0, currentIndex + 1));
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed, currentIndex]);

    return displayedText;
};
