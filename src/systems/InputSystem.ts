import { InputComponent, TransformComponent } from '../components';
import { EntityManager } from '../entities/EntityManager';
import { InputManager } from '../misc/InputManager';
import { BaseSystem } from '../types/System';

export class InputSystem extends BaseSystem {
  constructor(
    private entityManager: EntityManager,
    private inputManager: InputManager
  ) {
    super(0, ['input']);
  }

  update(deltaTime: number): void {
    const entities = this.entityManager.getEntitiesWithComponents(
      InputComponent,
      TransformComponent
    );

    for (const entity of entities) {
      const inputComponent = entity.getComponent(InputComponent);
      const transformComponent = entity.getComponent(TransformComponent);

      if (inputComponent == null || transformComponent == null) {
        console.log(
          `inputSystem: missing essential components for entity ${entity.id}`
        );
        continue;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['forward'])) {
        inputComponent.intent.move.z -= 1;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['backward'])) {
        inputComponent.intent.move.z += 1;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['left'])) {
        inputComponent.intent.move.x -= 1;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['right'])) {
        inputComponent.intent.move.x += 1;
      }
    }
  }
}
