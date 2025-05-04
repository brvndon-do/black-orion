import * as THREE from 'three';
import {
  CameraComponent,
  InputComponent,
  TransformComponent,
} from '../components';
import { BaseEntity } from '../types/Entity';

export class CameraEntity extends BaseEntity {
  constructor(
    public id: string,
    width: number,
    height: number,
    position: THREE.Vector3
  ) {
    super(id);

    const cameraComponent = new CameraComponent(
      {
        CameraType: THREE.PerspectiveCamera,
        cameraArgs: [75, width / height, 0.1, 1000],
      },
      position
    );
    const transformComponent = new TransformComponent();
    const inputComponent = new InputComponent({
      forward: 'w',
      backward: 's',
      left: 'a',
      right: 'd',
    });

    this.addComponent(CameraComponent, cameraComponent);
    this.addComponent(TransformComponent, transformComponent);
    this.addComponent(InputComponent, inputComponent);
  }
}
