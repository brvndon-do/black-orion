import * as THREE from 'three';
import { CubeEntity } from './entities/Cube';
import { EntityManager } from './entities/EntityManager';
import { RenderSystem } from './systems/RenderSystem';
import { SystemManager } from './systems/SystemManager';

let systemManager: SystemManager;
let entityManager: EntityManager;

let lastTimestamp = performance.now();

export const startGame = () => {
  const canvas = document.querySelector('canvas');

  if (!canvas) {
    console.error('game: unable to initialize canvas');
    return;
  }

  entityManager = new EntityManager();
  systemManager = new SystemManager();

  const cubes = [
    new CubeEntity('x', 'blue', { x: 0, y: 0, z: 0 }),
    new CubeEntity('y', 'red', { x: -2, y: 0, z: 0 }),
    new CubeEntity('z', 'yellow', { x: 2, y: 0, z: 0 }),
  ];

  cubes.forEach((cube) => entityManager.addEntity(cube));

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const scene = new THREE.Scene();

  const renderSystem = new RenderSystem(canvas, camera, scene, entityManager);

  systemManager.addSystem(renderSystem);

  systemManager.init();

  requestAnimationFrame(gameLoop);
};

const gameLoop = (currentTimestamp: number) => {
  // const deltaTime = (currentTimestamp - lastTimestamp) / 100;
  currentTimestamp *= 0.001;
  systemManager.update(currentTimestamp);

  requestAnimationFrame(gameLoop);
};
