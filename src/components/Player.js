import * as THREE from "three";
import { endsInValidPosition } from "../utilities/endsInValidPosition";
import { metadata as rows, addRows } from "./map";

export const player = Player();

function Player() {
  const player = new THREE.Group();

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(15, 15, 5),
    new THREE.MeshLambertMaterial({ 
      color: "lightGreen", 
      flatShading: true,
    })
  );
  body.position.z = 10;
  body.castShadow = true;
  body.receiveShadow = true;
  player.add(body);

  const leftBackFoot = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 2),
    new THREE.MeshLambertMaterial({ 
      color: "green", 
      flatShading: true,
    })
  );
  leftBackFoot.position.z = 8;
  leftBackFoot.position.x = -7;
  leftBackFoot.position.y = -6;
  leftBackFoot.castShadow = true;
  leftBackFoot.receiveShadow = true;
  player.add(leftBackFoot);

  const rightBackFoot = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 2),
    new THREE.MeshLambertMaterial({ 
      color: "green", 
      flatShading: true,
    })
  );
  rightBackFoot.position.z = 8;
  rightBackFoot.position.x = 7;
  rightBackFoot.position.y = -6;
  rightBackFoot.castShadow = true;
  rightBackFoot.receiveShadow = true;
  player.add(rightBackFoot);

  const leftFrontFoot = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 2),
    new THREE.MeshLambertMaterial({ 
      color: "green", 
      flatShading: true,
    })
  );
  leftFrontFoot.position.z = 8;
  leftFrontFoot.position.x = -7;
  leftFrontFoot.position.y = 6;
  leftFrontFoot.castShadow = true;
  leftFrontFoot.receiveShadow = true;
  player.add(leftFrontFoot);

  const rightFrontFoot = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 2),
    new THREE.MeshLambertMaterial({ 
      color: "green", 
      flatShading: true,
    })
  );
  rightFrontFoot.position.z = 8;
  rightFrontFoot.position.x = 7;
  rightFrontFoot.position.y = 6;
  rightFrontFoot.castShadow = true;
  rightFrontFoot.receiveShadow = true;
  player.add(rightFrontFoot);

  const rightEye = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 6),
    new THREE.MeshLambertMaterial({ 
      color: "green", 
      flatShading: true,
    })
  );
  rightEye.position.z = 13;
  rightEye.position.x = 4;
  rightEye.position.y = 3;
  rightEye.castShadow = true;
  rightEye.receiveShadow = true;
  player.add(rightEye);

  const leftEye = new THREE.Mesh(
    new THREE.BoxGeometry(5, 5, 6),
    new THREE.MeshLambertMaterial({ 
      color: "green", 
      flatShading: true,
    })
  );
  leftEye.position.z = 13;
  leftEye.position.x = -3;
  leftEye.position.y = 3;
  leftEye.castShadow = true;
  leftEye.receiveShadow = true;
  player.add(leftEye);

  const palyerContainer= new THREE.Group();
  palyerContainer.add(player);

  return palyerContainer;
}

export const position = {
  currentRow: 0,
  currentTile: 0,
};

export const movesQueue = [];

export function initializePlayer() {
  //initialize three.js player object
  player.position.x = 0;
  player.position.y = 0;
  player.children[0].z = 0;

  //initialize metadata
  position.currentRow = 0;
  position.currentTile = 0;

  //clear moves queue
  movesQueue.length = 0;

  
}

export function queueMove(direction) {
  const isValidMove = endsInValidPosition(
    {
      rowIndex: position.currentRow,
      tileIndex: position.currentTile,
    },
    [...movesQueue, direction]
  );

  if (!isValidMove) return;

  movesQueue.push(direction);
}

export function stepCompleted() {
  const direction = movesQueue.shift();

  if (direction === "forward") position.currentRow += 1;
  if (direction === "backward") position.currentRow -= 1;
  if (direction === "left") position.currentTile -= 1;
  if (direction === "right") position.currentTile += 1;

  //add new rows for player
  if (position.currentRow > rows.length - 10) addRows();

  //score update
  const scoreDOM = document.getElementById("score");
  if (scoreDOM) scoreDOM.innerText = position.currentRow.toString();
}

