import { queueMove } from "./components/Player";

window.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp") {
        event.preventDefault(); //avoids page scroll
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