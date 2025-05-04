import { CameraComponent, TransformComponent } from '../components';
import { EntityManager } from '../entities/EntityManager';
import { BaseEntity, BaseSystem } from '../types';

export class CameraSystem extends BaseSystem {
  private cameraEntity: BaseEntity | undefined;

  constructor(public entityManager: EntityManager) {
    super(0, ['camera']);
  }

  init(): void {
    this.cameraEntity = this.entityManager.getEntityById('mainCamera');

    if (this.cameraEntity == null) {
      console.error('cameraSystem: camera entity is null');
      return;
    }
  }

  update(deltaTime: number): void {
    const cameraComponent = this.cameraEntity!.getComponent(CameraComponent);
    const transformComponent =
      this.cameraEntity!.getComponent(TransformComponent);

    if (cameraComponent == null || transformComponent == null) {
      console.error('cameraSystem: necessary components were not found');
      return;
    }

    const camera = cameraComponent.getCamera();

    camera.position.set(
      transformComponent.position.x,
      transformComponent.position.y,
      transformComponent.position.z
    );
  }
}
