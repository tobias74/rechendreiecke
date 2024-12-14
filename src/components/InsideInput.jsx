import { TRIANGLE_BASE_LINE_LENGTH } from "../utils/rechendreieckUtils";

export default function InsideInput({
    x,
    y,
    placeholder,
    onChange,
    disabled = false,
    sideLength = TRIANGLE_BASE_LINE_LENGTH,
}) {
    const size = sideLength * 0.1; // 10% of side length
    const fontSize = sideLength * 0.05; // Font size as 5% of side length
    const textColor = "#1A1A1A"; // Consistent "almost black" color

    return (
        <foreignObject x={x} y={y} width={size * 1.3} height={size}>
            <input
                type="number"
                className={`w-full h-full text-center input input-bordered rounded-lg`}
                style={{
                    fontSize: `${fontSize}px`, // Apply responsive font size
                    color: textColor, // Set consistent font color
                }}
                placeholder={placeholder}
                onChange={onChange}
                disabled={disabled}
            />
        </foreignObject>
    );
}
