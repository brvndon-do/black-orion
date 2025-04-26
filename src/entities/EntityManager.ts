import { Component, ComponentClass } from '../types/Component';
import { BaseEntity } from '../types/Entity';

export class EntityManager {
  private entities: Map<string | number, BaseEntity>;

  constructor() {
    this.entities = new Map<string | number, BaseEntity>();
  }

  addEntity(entity: BaseEntity) {
    this.entities.set(entity.id, entity);
  }

  removeEntity(id: string | number) {
    this.entities.delete(id);
  }

  getEntityById(id: string | number) {
    return this.entities.get(id);
  }

  getEntitiesWithComponents<T extends Component[]>(
    ...componentClasses: { [K in keyof T]: ComponentClass<T[K]> }
  ) {
    return Array.from(this.entities.values()).filter((x) =>
      componentClasses.every((y) => x.hasComponent(y))
    );
  }
}
