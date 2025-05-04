import { InputComponent, TransformComponent } from '../components';
import { EntityManager } from '../entities/EntityManager';
import { BaseSystem } from '../types/System';

export class MovementSystem extends BaseSystem {
  private speed = 2.0;

  constructor(public entityManager: EntityManager) {
    super(0, ['movement']);
  }

  init(): void {}
  update(deltaTime: number): void {
    const entities = this.entityManager.getEntitiesWithComponents(
      TransformComponent,
      InputComponent
    );

    for (const entity of entities) {
      const transformComponent = entity.getComponent(TransformComponent);
      const inputComponent = entity.getComponent(InputComponent);

      // TODO: maybe make utility class to check if component is not null
      if (transformComponent == null || inputComponent == null) {
        console.log('movementSystem: missing essential components'); // TODO: create a const for common log messages
        continue;
      }

      transformComponent.position.x +=
        inputComponent.intent.move.x * deltaTime * this.speed;
      transformComponent.position.y +=
        inputComponent.intent.move.y * deltaTime * this.speed;
      transformComponent.position.z +=
        inputComponent.intent.move.z * deltaTime * this.speed;

      transformComponent.rotation.x +=
        inputComponent.intent.rotate.x * deltaTime * this.speed;
      transformComponent.rotation.y +=
        inputComponent.intent.rotate.y * deltaTime * this.speed;
      transformComponent.rotation.z +=
        inputComponent.intent.rotate.z * deltaTime * this.speed;

      inputComponent.resetIntent();
    }
  }
}
