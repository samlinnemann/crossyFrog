// import * as THREE from "three";
// import { metadata as rows } from "./components/map";
// import { player, position } from "./components/Player";

// const resultDOM = document.getElementById("result-container");
// const finalScoreDOM = document.getElementById("final-score");

// export function hitTest() {
//     const row = rows[position.currentRow - 1];
//     if (!row) return;

//     if (row.type === "car" || row.type === "truck") {
//         const playerBoundingBox = new THREE.Box3();
//         playerBoundingBox.setFromObject(player);

//         row.vehicles.forEach(({ ref }) => {
//             if (!ref) throw Error("VEHICLE REFERENCE IS MISSING");

//             const vehicleBoundingBox = new THREE.Box3();
//             vehicleBoundingBox.setFromObject(ref);

//             if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
//                 if (!resultDOM || !finalScoreDOM) return;
//                 resultDOM.style.visibility = "visible";
//                 finalScoreDOM.innerText = position.currentRow.toString();
//             }
//         });
//     }
// }