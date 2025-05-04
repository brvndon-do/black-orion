import * as THREE from 'three';
import { BaseSystem } from '../types/System';
import { EntityManager } from '../entities/EntityManager';
import { TransformComponent } from '../components/Transform';
import { MeshComponent } from '../components/Mesh';
import { CameraComponent } from '../components/Camera';

export class RenderSystem extends BaseSystem {
  private camera!: THREE.Camera;
  private renderer: THREE.WebGLRenderer;

  // TODO: create light system?
  private light: THREE.DirectionalLight;

  private addedObjects: Set<THREE.Object3D>;

  constructor(
    public canvas: HTMLCanvasElement,
    public scene: THREE.Scene,
    public entityManager: EntityManager
  ) {
    super(0, ['render']);

    this.addedObjects = new Set<THREE.Object3D>();

    this.renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
    this.light = new THREE.DirectionalLight('white', 5);
  }

  init(): void {
    this.light.position.set(-1, 2, 4);
    this.scene.add(this.light);

    const cameraEntity = this.entityManager.getEntityById('mainCamera'); // TODO: this might be a lazy way to do it... find a proper way later
    const cameraComponent = cameraEntity!.getComponent(CameraComponent);

    this.camera = cameraComponent!.getCamera();
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

      meshComponent.mesh.rotation.set(
        transformComponent.rotation.x,
        transformComponent.rotation.y,
        transformComponent.rotation.z
      );
    }

    this.renderer.render(this.scene, this.camera);
  }
}
