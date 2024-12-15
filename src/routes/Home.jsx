import React, { useState, useCallback } from "react";
import Rechendreieck from "../components/Rechendreieck";
import { injectEasyMode } from "../number-injection-strategies/injectEasyMode";
import { injectMediumMode } from "../number-injection-strategies/injectMediumMode";
import { injectHardMode } from "../number-injection-strategies/injectHardMode";
import { sumStrategy } from "../solution-strategies/sumStrategy";

export default function Home() {
    const strategies = [
        { label: "Alles innen", value: injectEasyMode },
        { label: "1 innen, 2 außen", value: injectMediumMode },
        { label: "Alles außen", value: injectHardMode },
        { label: "Gemischt", value: "random" },
    ];

    const maxValues = [5, 10, 20, 50, 100]; // Predefined maxValues for the dropdown

    const [selectedStrategy, setSelectedStrategy] = useState(() => injectEasyMode);
    const [selectedMaxValue, setSelectedMaxValue] = useState(10); // Default maxValue
    const [nextTrigger, setNextTrigger] = useState(0);

    const getRandomStrategy = useCallback(() => {
        const nonRandomStrategies = strategies.filter((s) => s.value !== "random");
        const randomChoice = nonRandomStrategies[Math.floor(Math.random() * nonRandomStrategies.length)];
        return randomChoice.value;
    }, [strategies]);

    const getCurrentStrategy = useCallback(() => {
        if (selectedStrategy === "random") {
            return () => getRandomStrategy()({ maxValue: selectedMaxValue });
        } else {
            return () => selectedStrategy({ maxValue: selectedMaxValue });
        }
    }, [selectedStrategy, selectedMaxValue, getRandomStrategy]);

    return (
        <div className="flex flex-col items-center justify-center">
            <Rechendreieck
                solutionStrategy={sumStrategy}
                numberInjectionStrategy={getCurrentStrategy()}
                key={nextTrigger} // Force re-render when `nextTrigger` changes
            />

            {/* Controls Section */}
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-6">
                {/* Dropdown to Select Strategy */}
                <select
                    className="select select-bordered w-40"
                    value={strategies.find((s) => s.value === selectedStrategy)?.label || "Easy"}
                    onChange={(e) => {
                        const selected = strategies.find((s) => s.label === e.target.value);
                        setSelectedStrategy(() => selected?.value);
                    }}
                >
                    {strategies.map((strategy) => (
                        <option key={strategy.label} value={strategy.label}>
                            {strategy.label}
                        </option>
                    ))}
                </select>

                {/* Dropdown to Select Max Value */}
                <select
                    className="select select-bordered w-40"
                    value={selectedMaxValue}
                    onChange={(e) => setSelectedMaxValue(Number(e.target.value))}
                >
                    {maxValues.map((value) => (
                        <option key={value} value={value}>
                            Max: {value}
                        </option>
                    ))}
                </select>

                <button
                    className="btn btn-primary"
                    style={{ color: "#ffffff", fontWeight: "bold" }} // Pure white text with bold font
                    onClick={() => setNextTrigger((prev) => prev + 1)}
                >
                    Nächste Aufgabe
                </button>

            </div>
        </div>
    );
}
