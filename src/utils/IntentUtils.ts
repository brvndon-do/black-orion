import { InputComponent, TransformComponent } from '../components';

export const applyIntent = (
  transformComponent: TransformComponent,
  intent: InputComponent['intent'],
  delta: number,
  speed: number
) => {
  transformComponent.position.addScaledVector(intent.move, delta * speed);
  transformComponent.rotation.addScaledVector(intent.rotate, delta * speed);
};
