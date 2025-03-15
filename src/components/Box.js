import * as THREE from "three";
import { tileSize } from "../constants";

export function Cargo(tileIndex, height) {
    const cargo = new THREE.Group();
    cargo.position.x = tileIndex * tileSize;

    const frame = new THREE.Mesh(
        new THREE.BoxGeometry(20, 20, 20),
        new THREE.MeshLambertMaterial({
            color: 0x4d2926,
            flatShading: true,
        })
    );
    frame.position.z = 10;
    cargo.add(frame);
    
    return cargo;
}