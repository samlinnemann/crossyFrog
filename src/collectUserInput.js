import { queueMove } from "./components/Player";

// Prevent scrolling when swiping
document.addEventListener("touchstart", (event) => {
    if (event.target.id !== "retry") {
        event.preventDefault();
    }
}, { passive: false });

document.addEventListener("touchmove", (event) => {
    if (event.target.id !== "retry") {
        event.preventDefault();
    }
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
let isTouchOnButton = false;

window.addEventListener("touchstart", (event) => {
    // Check if touch is on retry button
    isTouchOnButton = event.target.id === "retry";
    
    if (!isTouchOnButton && event.touches.length === 1) {
        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;
    }
});

window.addEventListener("touchend", (event) => {
    // Don't process game controls if the touch started on a button
    if (!isTouchOnButton && event.changedTouches.length === 1) {
        touchEndX = event.changedTouches[0].clientX;
        touchEndY = event.changedTouches[0].clientY;
        handleGesture();
    }
    
    // Reset the flag
    isTouchOnButton = false;
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
        } else {
            // Tap detected (minimal vertical movement)
            queueMove("forward");
        }
    }
}