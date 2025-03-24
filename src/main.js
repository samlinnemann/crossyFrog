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

// 🔧 Added for high score UI
const highScoreDOM = document.getElementById("high-score");
const newHighScoreDOM = document.getElementById("new-highscore");

let isGameOver = false;
const renderer = Renderer();
renderer.setAnimationLoop(animate);

initializeGame();

const retryButton = document.querySelector("#retry");
if (retryButton) {
    retryButton.addEventListener("click", (e) => {
        e.preventDefault();
        initializeGame();
    });
    retryButton.addEventListener("touchstart", (e) => {
        e.preventDefault();
        initializeGame();
    });
}

function initializeGame() {
    isGameOver = false;
    initializePlayer();
    initializeMap();

    if (scoreDOM) scoreDOM.innerText = "0";
    if (resultDOM) resultDOM.style.visibility = "hidden";

    // 🔧 Hide "NEW HIGH SCORE!" on restart
    if (newHighScoreDOM) newHighScoreDOM.style.display = "none";

    disableUserInput();

    renderer.setAnimationLoop(() => {
        isGameOver = false;
        animate();
    });
}

function animate() {
    if (isGameOver) return;

    animateVehicles();
    animatePlayer();
    hitTest();

    renderer.render(scene, camera);
}

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

function gameOver() {
    isGameOver = true;

    if (resultDOM) resultDOM.style.visibility = "visible";

    const score = position?.currentRow ?? 0;

    if (finalScoreDOM) finalScoreDOM.innerText = score.toString();

    // 🔧 High score logic
    const storedHighScore = parseInt(localStorage.getItem("highScore") || "0", 10);
    if (score > storedHighScore) {
        localStorage.setItem("highScore", score.toString());
        if (highScoreDOM) highScoreDOM.innerText = score.toString();
        if (newHighScoreDOM) newHighScoreDOM.style.display = "block";
    } else {
        if (highScoreDOM) highScoreDOM.innerText = storedHighScore.toString();
        if (newHighScoreDOM) newHighScoreDOM.style.display = "none";
    }

    renderer.setAnimationLoop(null);
}

document.getElementById("gameOverButton")?.addEventListener("click", () => {
    if (isGameOver) {
        console.log("Game Over button pressed.");
    }
});

function disableUserInput() {
    document.body.style.pointerEvents = "none";
    setTimeout(() => {
        document.body.style.pointerEvents = "auto";
    }, 500);
}
