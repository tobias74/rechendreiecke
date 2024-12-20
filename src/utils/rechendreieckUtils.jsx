// rechendreieckUtils.js

export const TRIANGLE_BASE_LINE_LENGTH = 500;

export const calculateVertices = (xOffset, yOffset) => {
    const sideLength = TRIANGLE_BASE_LINE_LENGTH;
    const height = (Math.sqrt(3) / 2) * sideLength;

    const topVertex = { x: xOffset * sideLength, y: yOffset * sideLength };
    const bottomLeft = { x: xOffset * sideLength - sideLength / 2, y: yOffset * sideLength + height };
    const bottomRight = { x: xOffset * sideLength + sideLength / 2, y: yOffset * sideLength + height };

    return { topVertex, bottomLeft, bottomRight, height };
};

export const calculateMidpoints = ({ topVertex, bottomLeft, bottomRight }) => {
    const centroid = {
        x: (topVertex.x + bottomLeft.x + bottomRight.x) / 3,
        y: (topVertex.y + bottomLeft.y + bottomRight.y) / 3,
    };

    const midTop = {
        x: (topVertex.x + bottomRight.x) / 2,
        y: (topVertex.y + bottomRight.y) / 2,
    };

    const midBottom = {
        x: (bottomLeft.x + bottomRight.x) / 2,
        y: (bottomLeft.y + bottomRight.y) / 2,
    };

    const midLeft = {
        x: (topVertex.x + bottomLeft.x) / 2,
        y: (topVertex.y + bottomLeft.y) / 2,
    };

    return { centroid, midTop, midBottom, midLeft };
};

export const calculateInputOffsets = () => {
    const sideLength = TRIANGLE_BASE_LINE_LENGTH;
    const inputWidth = sideLength * (0.1 * 1.5) * 1.3;
    const inputHeight = sideLength * 0.10;
    const halfInputWidth = inputWidth / 2;
    const halfInputHeight = inputHeight / 2;

    return {
        topInside: { x: -halfInputWidth, y: -sideLength * 0.25 - halfInputHeight },
        bottomLeftInside: { x: -sideLength * 0.2 - halfInputWidth, y: sideLength * 0.12 - halfInputHeight },
        bottomRightInside: { x: sideLength * 0.2 - halfInputWidth, y: sideLength * 0.12 - halfInputHeight },
        bottomOutside: { x: -halfInputWidth, y: sideLength * 0.1 - halfInputHeight },
        topLeftOutside: { x: -sideLength * 0.2 - halfInputWidth, y: -sideLength * 0.08 - halfInputHeight },
        topRightOutside: { x: sideLength * 0.2 - halfInputWidth, y: -sideLength * 0.08 - halfInputHeight },
    };
};

export const calculateBoxDimensions = () => {
    const sideLength = TRIANGLE_BASE_LINE_LENGTH;
    return {
        boxWidth: sideLength * 1.2,
        boxHeight: sideLength * (Math.sqrt(3) / 2) * 1.4,
    };
};
