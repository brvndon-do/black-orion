import * as THREE from 'three';
import { TransformComponent } from '../components/Transform';
import { BaseEntity } from '../types/Entity';
import { MeshComponent } from '../components/Mesh';

export class CubeEntity extends BaseEntity {
  constructor(
    public id: string,
    public color: string,
    public position: { x: number; y: number; z: number }
  ) {
    super(id);

    const transformComponent = new TransformComponent(
      new THREE.Vector3(position.x, position.y, position.z)
    );

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshPhongMaterial({ color });
    const meshComponent = new MeshComponent(new THREE.Mesh(geometry, material));

    this.addComponent(TransformComponent, transformComponent);
    this.addComponent(MeshComponent, meshComponent);
  }
}
