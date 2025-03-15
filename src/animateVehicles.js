import * as THREE from "three";
import { metadata as rows } from "./components/map";
import { minTileIndex, maxTileIndex, tileSize } from "./constants";

const clock = new THREE.Clock();

export function animateVehicles() {
    const delta = clock.getDelta();

    //Animate vehicles
    rows.forEach((rowData) => {
        if (rowData.type === "car" || rowData.type === "truck") {
            const beginningOfRow = (minTileIndex - 2) * tileSize;
            const endOfRow = (maxTileIndex + 2) * tileSize;

            rowData.vehicles.forEach(({ ref }) => {
                if (!ref) throw Error("VEHICLE REFERENCE IS MISSING");

                if (rowData.direction) {
                    ref.position.x = 
                    ref.position.x > endOfRow 
                    ? beginningOfRow 
                    : ref.position.x + rowData.speed * delta;
                } else {
                    ref.position.x =
                    ref.position.x < beginningOfRow
                    ? endOfRow
                    : ref.position.x - rowData.speed * delta;
                }
            }); 
        }
    });
}