import * as THREE from "three";
import { Renderer } from "./components/Renderer";
import { Camera } from "./components/Camera";
import { DirectionalLight } from "./components/DirectionalLight";
import { player, initializePlayer } from "./components/Player";
import { map, initializeMap } from "./components/map";
import { animateVehicles } from "./animateVehicles";
import { animatePlayer } from "./animatePlayer";
import { metadata as rows } from "./components/map";
import { position } from "./components/Player";
//import { hitTest } from "./hitTest";
import "./style.css";
import "./collectUserInput";

const scene = new THREE.Scene();
scene.add(player);
scene.add(map);

const ambientLight = new THREE.AmbientLight();
scene.add(ambientLight);

const dirLight = DirectionalLight();
dirLight.target = player;
player.add(dirLight);

const camera = Camera();
player.add(camera);

const scoreDOM = document.getElementById("score");
const resultDOM = document.getElementById("result-container");
const finalScoreDOM = document.getElementById("final-score");
let isGameOver = false; // Track game state
const renderer = Renderer();
renderer.setAnimationLoop(animate);

initializeGame();

const retryButton = document.querySelector("#retry");

if (retryButton) {
    retryButton.addEventListener("click", initializeGame);
    retryButton.addEventListener("touchend", (event) => {
        event.preventDefault(); // Prevents ghost clicks
        initializeGame();
    });
}

function initializeGame() {
    isGameOver = false; // Reset game state
    initializePlayer();
    initializeMap();

    // UI initialization
    if (scoreDOM) scoreDOM.innerText = "0";
    if (resultDOM) resultDOM.style.visibility = "hidden";

    // Restart animation loop
    renderer.setAnimationLoop(animate);
}

function gameOver() {
    isGameOver = true;
    
    if (resultDOM) resultDOM.style.visibility = "visible";

    // Ensure position and currentRow exist before accessing them
    if (finalScoreDOM && position?.currentRow !== undefined) {
        finalScoreDOM.innerText = position.currentRow.toString();
    } else {
        finalScoreDOM.innerText = "0"; // Fallback if position is undefined
    }

    renderer.setAnimationLoop(null); // Stop animation loop
}

function animate() {
    if (isGameOver) return; // Stop game updates if game over

    animateVehicles();
    animatePlayer();
    hitTest();

    renderer.render(scene, camera);
}

// Update hit detection to trigger game over
export function hitTest() {
    const row = rows[position.currentRow - 1];
    if (!row) return;

    if (row.type === "car" || row.type === "truck") {
        const playerBoundingBox = new THREE.Box3();
        playerBoundingBox.setFromObject(player);

        row.vehicles.forEach(({ ref }) => {
            if (!ref) throw Error("VEHICLE REFERENCE IS MISSING");

            const vehicleBoundingBox = new THREE.Box3();
            vehicleBoundingBox.setFromObject(ref);

            if (playerBoundingBox.intersectsBox(vehicleBoundingBox)) {
                gameOver();
            }
        });
    }
}
