import { EntityManager } from './entities/EntityManager';
import { InputManager } from './misc/InputManager';
import { SystemManager } from './systems/SystemManager';

type GameConfiguration = {
  canvas: HTMLCanvasElement;
  entityManager: EntityManager;
  systemManager: SystemManager;
  inputManager: InputManager;
};

let lastTimestamp = performance.now();

export const startGame = ({
  canvas,
  entityManager,
  systemManager,
  inputManager,
}: GameConfiguration) => {
  systemManager.initSystems();

  canvas.addEventListener('keydown', (e) => {
    inputManager.keyDown(e.key);
  });

  canvas.addEventListener('keyup', (e) => {
    inputManager.keyUp(e.key);
  });

  const gameLoop = (currentTimestamp: number) => {
    const deltaTime = (currentTimestamp - lastTimestamp) / 1000;
    lastTimestamp = currentTimestamp;

    systemManager.update(deltaTime);

    requestAnimationFrame(gameLoop);
  };

  requestAnimationFrame(gameLoop);
};
