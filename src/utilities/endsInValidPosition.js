import { calculateFinalPosition } from "./calculateFinalPosition";
import { minTileIndex, maxTileIndex } from "../constants";
import { metadata as rows } from "../components/map";

export function endsInValidPosition(currentPosition, moves) {
    //Calc where plower ends up after move
    const finalPosition = calculateFinalPosition(currentPosition, moves);

    //edge of map detection
    if (
        finalPosition.rowIndex === -1 || 
        finalPosition.tileIndex === minTileIndex - 1 ||
        finalPosition.tileIndex === maxTileIndex + 1
    ) {
        //invalid move ignore move
        return false;
    }

    //tree detection
    const finalRow = rows[finalPosition.rowIndex - 1];
    if (
        finalRow &&
        finalRow.type === "forest" &&
        finalRow.trees.some((tree) =>
            tree.tileIndex === finalPosition.tileIndex
        )
    ) {
        //ignore move
        return false;
    }

    return true;
}