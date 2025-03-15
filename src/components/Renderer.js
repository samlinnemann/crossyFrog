import * as THREE from "three";

export function Renderer() {
    const canvas = document.querySelector("canvas.game");
    if (!canvas) throw new Error("CANVAS NOT FOUND");

    const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        canvas: canvas,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    return renderer;
}