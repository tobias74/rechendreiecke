export const sumStrategy = ({ inside, outside }) => {

    if (inside.includes(null) || outside.includes(null)) return false; // Ensure all inputs are filled

    return (
        outside[0] === inside[1] + inside[2] && // Bottom outside = Bottom-left + Bottom-right
        outside[1] === inside[0] + inside[1] && // Top-left outside = Top + Bottom-left
        outside[2] === inside[0] + inside[2]    // Top-right outside = Top + Bottom-right
    );
};
