import { EntityManager } from '../entities/EntityManager';
import { ObjectIdentifier, Scene } from '../types';

export class SceneManager {
  private currentScene: Scene | undefined;
  private scenes: Map<ObjectIdentifier, Scene>;

  constructor(private entityManager: EntityManager) {
    this.scenes = new Map<ObjectIdentifier, Scene>();
  }

  addScene(id: ObjectIdentifier, scene: Scene) {
    this.scenes.set(id, scene);
  }

  removeScene(id: ObjectIdentifier) {
    this.scenes.delete(id);
  }

  getCurrentScreen() {
    return this.currentScene;
  }

  load(id: ObjectIdentifier) {
    const scene = this.scenes.get(id);

    if (scene == null) {
      throw new Error(`sceneManager: unable to retrieve scene ${id}`);
    }

    scene.setup(this.entityManager);

    this.currentScene = scene;
  }
}
