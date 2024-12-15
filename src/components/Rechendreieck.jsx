// Rechendreieck.js
import React, { useEffect, useState } from "react";
import DreieckInput from "./DreieckInput";
import ConfettiEffect from "./ConfettiEffect";
import {
    calculateVertices,
    calculateMidpoints,
    calculateInputOffsets,
    calculateBoxDimensions,
} from "../utils/rechendreieckUtils";

export default function Rechendreieck({
    solutionStrategy,
    numberInjectionStrategy,
}) {
    const [values, setValues] = useState({
        inside: [null, null, null],
        outside: [null, null, null],
        isPreset: {
            inside: [false, false, false],
            outside: [false, false, false],
        },
    });

    const [isCorrect, setIsCorrect] = useState(false);
    const [triggerConfetti, setTriggerConfetti] = useState(false);

    // Calculate geometry
    const { topVertex, bottomLeft, bottomRight, height } = calculateVertices(0.6, 0.08);
    const { centroid, midTop, midBottom, midLeft } = calculateMidpoints({
        topVertex,
        bottomLeft,
        bottomRight,
    });
    const inputOffsets = calculateInputOffsets();
    const { boxWidth, boxHeight } = calculateBoxDimensions();

    const handleInputChange = (type, index, value) => {
        if (isCorrect) return; // Prevent input changes if the result is correct
        setValues((prev) => ({
            ...prev,
            [type]: prev[type].map((v, i) =>
                i === index ? (value === "" ? null : parseFloat(value)) : v
            ),
        }));
    };

    // Initialize values using the numberInjectionStrategy
    useEffect(() => {
        if (numberInjectionStrategy) {
            const { inside, outside } = numberInjectionStrategy();
            setValues({
                inside,
                outside,
                isPreset: {
                    inside: inside.map((v) => v !== null),
                    outside: outside.map((v) => v !== null),
                },
            });
        }
    }, [numberInjectionStrategy]);

    // Check correctness using the solutionStrategy
    useEffect(() => {
        const valid = solutionStrategy(values);
        setIsCorrect(valid);

        // Trigger confetti if correct
        if (valid) {
            setTriggerConfetti(true);
        }
    }, [values, solutionStrategy]);

    return (
        <div className="w-full h-full flex justify-center items-center">
            {/* Confetti Effect */}
            <ConfettiEffect
                width={window.innerWidth}
                height={window.innerHeight}
                trigger={triggerConfetti}
            />

            <svg
                className="max-w-[80vw] max-h-[80vh] w-full h-auto"
                viewBox={`0 0 ${boxWidth} ${boxHeight}`}
                preserveAspectRatio="xMidYMid meet"
            >
                {/* Triangle */}
                <polygon
                    points={`${topVertex.x},${topVertex.y} ${bottomLeft.x},${bottomLeft.y} ${bottomRight.x},${bottomRight.y}`}
                    className={`transition-fill duration-300 ${isCorrect ? "correct" : ""
                        }`}
                    fill={isCorrect ? "#32CD32" : "#f3f3f3"} // Green if correct
                    stroke="#000"
                    strokeWidth="2"
                />

                {/* Internal Lines */}
                <line x1={midTop.x} y1={midTop.y} x2={centroid.x} y2={centroid.y} stroke="#000" strokeWidth="2" />
                <line x1={midBottom.x} y1={midBottom.y} x2={centroid.x} y2={centroid.y} stroke="#000" strokeWidth="2" />
                <line x1={midLeft.x} y1={midLeft.y} x2={centroid.x} y2={centroid.y} stroke="#000" strokeWidth="2" />

                {/* Inside Inputs */}
                <DreieckInput
                    x={centroid.x + inputOffsets.topInside.x}
                    y={centroid.y + inputOffsets.topInside.y}
                    placeholder={values.inside[0] ?? "?"}
                    onChange={(e) => handleInputChange("inside", 0, e.target.value)}
                    disabled={values.isPreset.inside[0] || isCorrect}
                />
                <DreieckInput
                    x={centroid.x + inputOffsets.bottomLeftInside.x}
                    y={centroid.y + inputOffsets.bottomLeftInside.y}
                    placeholder={values.inside[1] ?? "?"}
                    onChange={(e) => handleInputChange("inside", 1, e.target.value)}
                    disabled={values.isPreset.inside[1] || isCorrect}
                />
                <DreieckInput
                    x={centroid.x + inputOffsets.bottomRightInside.x}
                    y={centroid.y + inputOffsets.bottomRightInside.y}
                    placeholder={values.inside[2] ?? "?"}
                    onChange={(e) => handleInputChange("inside", 2, e.target.value)}
                    disabled={values.isPreset.inside[2] || isCorrect}
                />

                {/* Outside Inputs */}
                <DreieckInput
                    x={midBottom.x + inputOffsets.bottomOutside.x}
                    y={midBottom.y + inputOffsets.bottomOutside.y}
                    placeholder={values.outside[0] ?? "?"}
                    onChange={(e) => handleInputChange("outside", 0, e.target.value)}
                    disabled={values.isPreset.outside[0] || isCorrect}
                />
                <DreieckInput
                    x={midLeft.x + inputOffsets.topLeftOutside.x}
                    y={midLeft.y + inputOffsets.topLeftOutside.y}
                    placeholder={values.outside[1] ?? "?"}
                    onChange={(e) => handleInputChange("outside", 1, e.target.value)}
                    disabled={values.isPreset.outside[1] || isCorrect}
                />
                <DreieckInput
                    x={midTop.x + inputOffsets.topRightOutside.x}
                    y={midTop.y + inputOffsets.topRightOutside.y}
                    placeholder={values.outside[2] ?? "?"}
                    onChange={(e) => handleInputChange("outside", 2, e.target.value)}
                    disabled={values.isPreset.outside[2] || isCorrect}
                />
            </svg>
        </div>
    );
}
