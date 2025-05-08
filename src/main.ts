import * as THREE from 'three';
import { startGame } from './game';
import { EntityManager } from './entities/EntityManager';
import { SystemManager } from './systems/SystemManager';
import { InputManager } from './misc/InputManager';
import { CameraEntity } from './entities';
import {
  RenderSystem,
  InputSystem,
  MovementSystem,
  CameraSystem,
} from './systems';
import { SceneManager } from './scenes/SceneManager';
import { TransformSystem } from './systems/TransformSystem';
import { TestScene } from './scenes/TestScene';

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

  const sceneManager = new SceneManager(entityManager);
  sceneManager.addScene('test', new TestScene());
  sceneManager.load('test'); // TODO: this should be moved into a different file/function for handling scene initializations; for now this is ok.

  const camera = new CameraEntity(
    'mainCamera',
    canvas.clientWidth,
    canvas.clientHeight,
    new THREE.Vector3(0, 0, 5)
  );

  entityManager.addEntity(camera);

  const transformSystem = new TransformSystem(entityManager);
  const renderSystem = new RenderSystem(canvas, entityManager, sceneManager);
  const inputSystem = new InputSystem(entityManager, inputManager);
  const movementSystem = new MovementSystem(entityManager);
  const cameraSystem = new CameraSystem(entityManager);

  systemManager.addSystem(transformSystem);
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
