import * as THREE from "three";
import { tileSize } from "../constants";
import { Wheel } from "./Wheel";

export function Truck(initialTileIndex, direction, color) {
    const truck = new THREE.Group();
    truck.position.x = initialTileIndex * tileSize;
    if (!direction) truck.rotation.z = Math.PI;

    const cargo = new THREE.Mesh(
        new THREE.BoxGeometry(70, 35, 35),
        new THREE.MeshLambertMaterial({
            color: "silver",
            flatShading: true,
        })
    );
    cargo.position.x = -15;
    cargo.position.z = 25;
    truck.add(cargo);

    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(35, 30, 30),
        new THREE.MeshLambertMaterial({ color, flatShading: true })
    );
    cabin.position.x = 20;
    cabin.position.z = 20;
    truck.add(cabin);

    const hood = new THREE.Mesh(
        new THREE.BoxGeometry(30, 30 ,15),
        new THREE.MeshLambertMaterial({ color, flatShading: true })
    );
    hood.position.x = 40;
    hood.position.z = 13;
    truck.add(hood);

    const frontWheel = Wheel(37);
    truck.add(frontWheel);

    const middleWheel = Wheel(5);
    truck.add(middleWheel);

    const backWheel = Wheel(-35);
    truck.add(backWheel);

    return truck;
}