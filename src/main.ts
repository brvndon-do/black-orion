import * as THREE from 'three';
import { CubeEntity } from './entities/Cube';
import { EntityManager } from './entities/EntityManager';
import { startGame } from './game';
import { SystemManager } from './systems/SystemManager';
import { RenderSystem } from './systems/RenderSystem';
import { InputSystem } from './systems/InputSystem';
import { InputManager } from './misc/InputManager';

(() => {
  const canvas = document.querySelector('canvas');

  if (!canvas) {
    console.error('main: unable to initialize canvas');
    return;
  }

  canvas.focus();

  const entityManager = new EntityManager();
  const systemManager = new SystemManager();
  const inputManager = new InputManager();

  const camera = new THREE.PerspectiveCamera(
    75,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 5;

  const scene = new THREE.Scene();

  const cubes = [
    new CubeEntity('x', 'blue', { x: 0, y: 0, z: 0 }),
    new CubeEntity('y', 'red', { x: -2, y: 0, z: 0 }),
    new CubeEntity('z', 'yellow', { x: 2, y: 0, z: 0 }),
  ];

  cubes.forEach((cube) => entityManager.addEntity(cube));

  const renderSystem = new RenderSystem(canvas, camera, scene, entityManager);
  const inputSystem = new InputSystem(entityManager, inputManager);

  systemManager.addSystem(renderSystem);
  systemManager.addSystem(inputSystem);

  startGame({
    canvas,
    entityManager,
    systemManager,
    inputManager,
  });
})();
