export function calculateFinalPosition(currentPosition, moves) {
    if (moves.length === 0) return currentPosition;
    
    // Get the last move (most recent input)
    const latestMove = moves[moves.length - 1];

    switch (latestMove) {
        case "forward":
            return {
                rowIndex: currentPosition.rowIndex + 1,
                tileIndex: currentPosition.tileIndex,
            };
        case "backward":
            return {
                rowIndex: currentPosition.rowIndex - 1,
                tileIndex: currentPosition.tileIndex,
            };
        case "left":
            return {
                rowIndex: currentPosition.rowIndex,
                tileIndex: currentPosition.tileIndex - 1,
            };
        case "right":
            return {
                rowIndex: currentPosition.rowIndex,
                tileIndex: currentPosition.tileIndex + 1,
            };
        default:
            return currentPosition;
    }
}
