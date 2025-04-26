import * as THREE from 'three';
import { BaseSystem } from '../types/System';
import { EntityManager } from '../entities/EntityManager';
import { TransformComponent } from '../components/Transform';
import { MeshComponent } from '../components/Mesh';

export class RenderSystem extends BaseSystem {
  private renderer: THREE.WebGLRenderer;
  private light: THREE.DirectionalLight;

  private addedObjects: Set<THREE.Object3D>;

  constructor(
    public canvas: HTMLCanvasElement,
    public camera: THREE.PerspectiveCamera,
    public scene: THREE.Scene,
    public entityManager: EntityManager
  ) {
    super(0, ['render']);

    this.addedObjects = new Set<THREE.Object3D>();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.light = new THREE.DirectionalLight('white', 5);
  }

  init(): void {
    this.scene.add(this.light);
  }

  update(deltaTime: number): void {
    const entities = this.entityManager.getEntitiesWithComponents(
      TransformComponent,
      MeshComponent
    );

    for (const entity of entities) {
      const transformComponent = entity.getComponent(TransformComponent);
      const meshComponent = entity.getComponent(MeshComponent);

      if (transformComponent == null || meshComponent == null) {
        console.log(
          `renderSystem: missing essential components for entity ${entity.id}`
        );
        continue;
      }

      if (!this.addedObjects.has(meshComponent.mesh)) {
        this.scene.add(meshComponent.mesh);
        this.addedObjects.add(meshComponent.mesh);
      }

      meshComponent.mesh.position.set(
        transformComponent.position.x,
        transformComponent.position.y,
        transformComponent.position.z
      );
      meshComponent.mesh.rotation.x = deltaTime;
      meshComponent.mesh.rotation.y = deltaTime;
    }

    this.renderer.render(this.scene, this.camera);
  }
}
