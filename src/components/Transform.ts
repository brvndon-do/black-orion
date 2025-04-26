import * as THREE from 'three';
import { Component } from '../types/Component';

export class TransformComponent implements Component {
  public type = 'transform';

  constructor(
    public position: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    public rotation: THREE.Vector3 = new THREE.Vector3(0, 0, 0),
    public scale: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  ) {}
}
