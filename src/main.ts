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
import { FooScene } from './scenes/FooScene';

(() => {
  const canvas = document.querySelector('canvas');

  if (!canvas) {
    throw new Error('main: unable to initialize canvas');
  }

  canvas.focus();

  // instantiate managers
  const entityManager = new EntityManager();
  const systemManager = new SystemManager();
  const inputManager = new InputManager();

  const sceneManager = new SceneManager(entityManager);
  sceneManager.addScene('test', new TestScene());
  sceneManager.addScene('test2', new FooScene());
  sceneManager.load('test'); // TODO: this should be moved into a different file/function for handling scene initializations; for now this is ok.

  const camera = new CameraEntity(
    'mainCamera',
    canvas.clientWidth,
    canvas.clientHeight,
    new THREE.Vector3(0, 0, 5)
  );

  entityManager.addEntity(camera);

  // instantiate systems
  const transformSystem = new TransformSystem(entityManager);
  const renderSystem = new RenderSystem(canvas, entityManager, sceneManager);
  const inputSystem = new InputSystem(entityManager, inputManager);
  const movementSystem = new MovementSystem(entityManager);
  const cameraSystem = new CameraSystem(canvas, entityManager);

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
    sceneManager,
  });
})();
