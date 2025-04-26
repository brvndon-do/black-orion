import { BaseSystem } from '../types/System';

export class SystemManager {
  private systems: BaseSystem[] = [];

  addSystem(system: BaseSystem): void {
    this.systems.push(system);
    this.systems.sort((a, b) => a.priority - b.priority);
  }

  removeSystem(system: BaseSystem): void {
    this.systems = this.systems.filter((x) => x !== system);
  }

  getSystemsByTag(tag: string): BaseSystem[] {
    return this.systems.filter((x) => x.tags.includes(tag));
  }

  update(deltaTime: number) {
    for (const system of this.systems) {
      system.update(deltaTime);
    }
  }

  init(): void {
    for (const system of this.systems) {
      system.init();
    }
  }

  dispose(): void {
    for (const system of this.systems) {
      system.dispose();
    }
  }
}
