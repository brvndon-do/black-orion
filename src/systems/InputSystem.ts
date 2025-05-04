import { InputComponent, TransformComponent } from '../components';
import { EntityManager } from '../entities/EntityManager';
import { InputManager } from '../misc/InputManager';
import { BaseSystem } from '../types/System';

export class InputSystem extends BaseSystem {
  constructor(
    public entityManager: EntityManager,
    public inputManager: InputManager
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

      if (this.inputManager.isKeyPressed(inputComponent.bindings['up'])) {
        inputComponent.intent.rotate.x += 1;
        inputComponent.intent.rotate.y += 1;
      }

      if (this.inputManager.isKeyPressed(inputComponent.bindings['down'])) {
        inputComponent.intent.rotate.x -= 1;
        inputComponent.intent.rotate.y -= 1;
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
