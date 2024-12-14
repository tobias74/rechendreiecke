import React, { useState, useCallback } from "react";
import Rechendreieck from "../components/Rechendreieck";
import { injectEasyMode } from "../number-injection-strategies/injectEasyMode";
import { injectMediumMode } from "../number-injection-strategies/injectMediumMode";
import { injectHardMode } from "../number-injection-strategies/injectHardMode";
import { sumStrategy } from "../solution-strategies/sumStrategy";

export default function Home() {
    const strategies = [
        { label: "Easy", value: injectEasyMode },
        { label: "Medium", value: injectMediumMode },
        { label: "Hard", value: injectHardMode },
        { label: "Random", value: "random" },
    ];

    const [selectedStrategy, setSelectedStrategy] = useState(() => injectEasyMode);
    const [nextTrigger, setNextTrigger] = useState(0);

    const getRandomStrategy = useCallback(() => {
        const nonRandomStrategies = strategies.filter((s) => s.value !== "random");
        const randomChoice = nonRandomStrategies[Math.floor(Math.random() * nonRandomStrategies.length)];
        return randomChoice.value;
    }, [strategies]);

    const getCurrentStrategy = useCallback(() => {
        if (selectedStrategy === "random") {
            return getRandomStrategy();
        } else {
            return selectedStrategy;
        }
    }, [selectedStrategy, getRandomStrategy]);

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

                {/* Next Button */}
                <button
                    className="btn btn-primary"
                    onClick={() => setNextTrigger((prev) => prev + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
}
