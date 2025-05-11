import * as THREE from 'three';
import { InputComponent, TransformComponent } from '../components';

export const applyIntent = (
  transformComponent: TransformComponent,
  intent: InputComponent['intent'],
  deltaTime: number,
  speed: number
) => {
  const localDirection = intent.move.clone();
  const rotation = new THREE.Quaternion().setFromEuler(
    new THREE.Euler(
      transformComponent.rotation.x,
      transformComponent.rotation.y,
      transformComponent.rotation.z
    )
  );
  const worldDirection = localDirection.applyQuaternion(rotation);
  worldDirection.multiplyScalar(deltaTime * speed);

  transformComponent.position.add(worldDirection);
};
