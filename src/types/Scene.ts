import * as THREE from 'three';
import { EntityManager } from '../entities/EntityManager';

export interface Scene {
  name: string;
  threeScene: THREE.Scene;
  setup: (entityManager: EntityManager) => void;
  cleanup?: () => void;
}
