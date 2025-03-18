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

window.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
}, { passive: false });

window.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].clientX;
    touchEndY = event.changedTouches[0].clientY;
    
    handleGesture();
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
