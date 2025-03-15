import { queueMove } from "./components/Player";

// Prevent scrolling when swiping
document.addEventListener("touchstart", (event) => {
    event.preventDefault();
}, { passive: false });

document.addEventListener("touchmove", (event) => {
    event.preventDefault();
}, { passive: false });

// Keyboard Controls
window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        event.preventDefault();
        queueMove("forward");
    } else if (event.key === "ArrowDown") {
        event.preventDefault();
        queueMove("backward");
    } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        queueMove("left");
    } else if (event.key === "ArrowRight") {
        event.preventDefault();
        queueMove("right");
    }
});

// Touch Controls
let touchStartX = 0;
let touchStartY = 0;
let touchEndX = 0;
let touchEndY = 0;
let touchStartedOnGameArea = false;

const gameArea = document.getElementById("game");
const restartButton = document.getElementById("retry");

window.addEventListener("touchstart", (event) => {
    if (event.target === restartButton) {
        return; // Don't register a swipe if touching the restart button
    }

    if (gameArea.contains(event.target)) {
        touchStartedOnGameArea = true;
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }
}, { passive: false });

window.addEventListener("touchend", (event) => {
    if (!touchStartedOnGameArea) return; // Ignore swipes that didn’t start in the game area

    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    
    handleGesture();
    touchStartedOnGameArea = false; // Reset flag
});

restartButton.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent the click from triggering other events
    restartGame(); // Call your restart function here
});

function handleGesture() {
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        if (deltaX > 30) {
            queueMove("right"); // Swipe right
        } else if (deltaX < -30) {
            queueMove("left"); // Swipe left
        }
    } else {
        // Vertical swipe
        if (deltaY > 30) {
            queueMove("backward"); // Swipe down
        } else if (deltaY < -30) {
            queueMove("forward"); // Swipe up
        }
    }
}
