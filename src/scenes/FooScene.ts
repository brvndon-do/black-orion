import * as THREE from 'three';
import { EntityManager } from '../entities/EntityManager';
import { Scene } from '../types';
import { CubeEntity } from '../entities';

export class FooScene implements Scene {
  public name = 'Foo';
  public threeScene: THREE.Scene;
  private light: THREE.DirectionalLight;

  constructor() {
    this.threeScene = new THREE.Scene();
    this.light = new THREE.DirectionalLight('white', 10);
  }

  setup(entityManager: EntityManager) {
    this.light.position.set(-1, 2, 4);

    entityManager.addEntity(
      new CubeEntity('q', 'orange', new THREE.Vector3(0, 0, 0))
    );

    this.threeScene.add(this.light);
  }
}
