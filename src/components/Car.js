import * as THREE from "three";
import { tileSize } from "../constants";

export function Car(initialTileIndex, direction, color, color2) {
    const car = new THREE.Group();
    car.position.x = initialTileIndex * tileSize;
    if (!direction) car.rotation.z = Math.PI;

    const main = new THREE.Mesh(
        new THREE.BoxGeometry(55, 22, 10),
        new THREE.MeshLambertMaterial({ color, flatShading: true })
    );
    main.position.z = 12;
    main.castShadow = true;
    main.receiveShadow = true;
    car.add(main);

    const main2 = new THREE.Mesh(
        new THREE.BoxGeometry(50, 11, 10),
        new THREE.MeshLambertMaterial({ color, flatShading: true })
    );
    main2.position.x = 10;
    main2.position.z = 12;
    main2.castShadow = true;
    main2.receiveShadow = true;
    car.add(main2);

    const cabin = new THREE.Mesh(
        new THREE.BoxGeometry(30, 15, 8),
        new THREE.MeshLambertMaterial({
            color,
            flatShading: true,
        })
    );
    cabin.position.x = -10;
    cabin.position.z = 22;
    cabin.castShadow = true;
    cabin.receiveShadow = true;
    car.add(cabin);

    const window = new THREE.Mesh(
        new THREE.BoxGeometry(15, 12, 5),
        new THREE.MeshLambertMaterial({ 
            color: color2,
            flatShading: true })
    );
    window.position.x = 10;
    window.position.z = 20;
    window.castShadow = true;
    window.receiveShadow = true;
    car.add(window);

    const window2 = new THREE.Mesh(
        new THREE.BoxGeometry(20, 6, 5),
        new THREE.MeshLambertMaterial({ 
            color: color2, 
            flatShading: true })
    );
    window2.position.x = 15;
    window2.position.z = 20;
    window2.castShadow = true;
    window2.receiveShadow = true;
    car.add(window2);

    const frontWheel = new THREE.Mesh(
        new THREE.BoxGeometry(10, 28, 10),
        new THREE.MeshLambertMaterial({
            color: "#E00000",
            flatShading: true,
        })
    );
    frontWheel.position.x = 18;
    frontWheel.position.z = 6;
    car.add(frontWheel);

    const backLeftWheel = new THREE.Mesh(
        new THREE.BoxGeometry(15, 8, 15),
        new THREE.MeshLambertMaterial({
            color: "#E00000",
            flatShading: true,
        })
    );
    backLeftWheel.position.x = -25;
    backLeftWheel.position.z = 10;
    backLeftWheel.position.y = 12;
    car.add(backLeftWheel);

    const backRightWheel = new THREE.Mesh(
        new THREE.BoxGeometry(15, 8, 15),
        new THREE.MeshLambertMaterial({
            color: "#E00000",
            flatShading: true,
        })
    );
    backRightWheel.position.x = -25;
    backRightWheel.position.z = 10;
    backRightWheel.position.y = -12;
    car.add(backRightWheel);

    const backLeftWing = new THREE.Mesh(
        new THREE.BoxGeometry(20, 4, 10),
        new THREE.MeshLambertMaterial({
            color: color2,
            flatShading: false
        })
    );
    backLeftWing.position.x = -25;
    backLeftWing.position.y = 8;
    backLeftWing.position.z = 26;
    car.add(backLeftWing);

    const backRightWing = new THREE.Mesh(
        new THREE.BoxGeometry(20, 4, 10),
        new THREE.MeshLambertMaterial({
            color: color2,
            flatShading: true
        })
    );
    backRightWing.position.x = -25;
    backRightWing.position.y = -8;
    backRightWing.position.z = 26;
    car.add(backRightWing);

    const topFrontGrill = new THREE.Mesh(
        new THREE.BoxGeometry(3, 10, 2),
        new THREE.MeshLambertMaterial({
            color: "#E00000",
            flatShading: true,
        })
    ) 

    topFrontGrill.position.x = -15;
    topFrontGrill.position.z = 26;
    car.add(topFrontGrill);

    const topMidGrill = new THREE.Mesh(
        new THREE.BoxGeometry(3, 10, 2),
        new THREE.MeshLambertMaterial({
            color: "#E00000",
            flatShading: true,
        })
    ) 

    topMidGrill.position.x = -20;
    topMidGrill.position.z = 26;
    car.add(topMidGrill);

    const toBackGrill = new THREE.Mesh(
        new THREE.BoxGeometry(3, 10, 2),
        new THREE.MeshLambertMaterial({
            color: "#E00000",
            flatShading: true,
        })
    ) 

    toBackGrill.position.x = -25;
    toBackGrill.position.z = 26;
    car.add(toBackGrill);

    return car;
}