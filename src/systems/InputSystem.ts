import { InputComponent } from '../components/Input';
import { TransformComponent } from '../components/Transform';
import { EntityManager } from '../entities/EntityManager';
import { InputManager } from '../misc/InputManager';
import { BaseSystem } from '../types/System';

export class InputSystem extends BaseSystem {
  private rotationSpeed = 2.0;
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

      if (this.inputManager.isKeyPressed(inputComponent.bindings['left'])) {
        transformComponent.rotation.x -= deltaTime * this.rotationSpeed;
        transformComponent.rotation.y -= deltaTime * this.rotationSpeed;
      } else if (
        this.inputManager.isKeyPressed(inputComponent.bindings['right'])
      ) {
        transformComponent.rotation.x += deltaTime * this.rotationSpeed;
        transformComponent.rotation.y += deltaTime * this.rotationSpeed;
      }
    }
  }
}
