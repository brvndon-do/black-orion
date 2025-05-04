import * as THREE from 'three';
import { startGame } from './game';
import { EntityManager } from './entities/EntityManager';
import { SystemManager } from './systems/SystemManager';
import { InputManager } from './misc/InputManager';
import { CubeEntity, CameraEntity } from './entities';
import {
  RenderSystem,
  InputSystem,
  MovementSystem,
  CameraSystem,
} from './systems';

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

  // TODO: scene manager
  const scene = new THREE.Scene();

  const camera = new CameraEntity(
    'mainCamera',
    canvas.clientWidth,
    canvas.clientHeight,
    new THREE.Vector3(0, 0, 5)
  );

  entityManager.addEntity(camera);

  const cubes = [
    new CubeEntity('x', 'blue', new THREE.Vector3(0, 0, 0)),
    new CubeEntity('y', 'red', new THREE.Vector3(-2, 0, 0)),
    new CubeEntity('z', 'yellow', new THREE.Vector3(2, 0, 0)),
  ];

  cubes.forEach((cube) => entityManager.addEntity(cube));

  const renderSystem = new RenderSystem(canvas, scene, entityManager);
  const inputSystem = new InputSystem(entityManager, inputManager);
  const movementSystem = new MovementSystem(entityManager);
  const cameraSystem = new CameraSystem(entityManager);

  systemManager.addSystem(renderSystem);
  systemManager.addSystem(inputSystem);
  systemManager.addSystem(movementSystem);
  systemManager.addSystem(cameraSystem);

  startGame({
    canvas,
    entityManager,
    systemManager,
    inputManager,
  });
})();
