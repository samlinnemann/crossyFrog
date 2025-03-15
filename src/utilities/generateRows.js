import * as THREE from "three";
import { minTileIndex, maxTileIndex } from "../constants";

export function generateRows(amount) {
    const rows = [];
    for (let i = 0; i < amount; i++) {
        const rowData = generateRow();
        rows.push(rowData);
    }
    return rows;
}

function generateRow() {
    const type = randomElement(["car", "truck", "forest"]);
    if (type === "car") return generateCarLaneMetadata();
    if (type === "truck") return generateTruckLaneMetadata();
    return generateForestMetadata();
}

function randomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateForestMetadata() {
    const occupiedTiles = new Set();
    const trees = Array.from({ length: 4}, () => {
        let tileIndex;
        do {
            tileIndex = THREE.MathUtils.randInt(minTileIndex, maxTileIndex);
        } while (occupiedTiles.has(tileIndex));
        occupiedTiles.add(tileIndex);

        const height = randomElement([20, 45, 60]);

        return { tileIndex, height };
    });

    return { type: "forest", trees};
}

function generateCarLaneMetadata() {
    const direction = randomElement([true, false]);
    const speed = randomElement([200]);

    const occupiedTiles = new Set();

    const vehicles = Array.from({ length: 3 }, () => {
        let initialTileIndex;
        do {
            initialTileIndex = THREE.MathUtils.randInt(
                minTileIndex,
                maxTileIndex
            );
        } while (occupiedTiles.has(initialTileIndex));
        occupiedTiles.add(initialTileIndex - 1);
        occupiedTiles.add(initialTileIndex);
        occupiedTiles.add(initialTileIndex + 1);

        const color = randomElement(["yellow", "white"]);

        return { initialTileIndex, color };
    });

    return { type: "car", direction, speed, vehicles};
}

function generateTruckLaneMetadata() {
    const direction = randomElement([true, false]);
    const speed = randomElement([125, 150, 200]);

    const occupiedTiles = new Set();

    const vehicles = Array.from({ length: 2 }, () => {
        let initialTileIndex;
        do {
            initialTileIndex = THREE.MathUtils.randInt(
                minTileIndex,
                maxTileIndex
            );
        } while (occupiedTiles.has(initialTileIndex));
        occupiedTiles.add(initialTileIndex - 2);
        occupiedTiles.add(initialTileIndex - 1);
        occupiedTiles.add(initialTileIndex);
        occupiedTiles.add(initialTileIndex + 1);
        occupiedTiles.add(initialTileIndex + 2);

        const color = randomElement(["darkGrey", "white", "red"]);

        return { initialTileIndex, color };
    });

    return { type: "truck", direction, speed, vehicles};
}