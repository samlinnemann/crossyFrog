import * as THREE from "three";
import { tileSize } from "../constants";

export function box(tileIndex, height) {
    const box = new THREE.Group();
    box.position.x = tileIndex * tileSize;

    const Cargo = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30, height),
        new THREE.MeshLambertMaterial({
            color: "brown",
            flatShading: true,
        })
    );
    Cargo.position.z = 0;
    Cargo.castShadow = true;
    Cargo.receiveShadow = true;
    box.add(Cargo);
    
    return box;
}