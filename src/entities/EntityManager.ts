import { ObjectIdentifier } from '../types';
import { Component, ComponentClass } from '../types/Component';
import { BaseEntity } from '../types/Entity';

export class EntityManager {
  private entities: Map<ObjectIdentifier, BaseEntity>;

  constructor() {
    this.entities = new Map<ObjectIdentifier, BaseEntity>();
  }

  addEntity(entity: BaseEntity) {
    this.entities.set(entity.id, entity);
  }

  removeEntity(id: ObjectIdentifier) {
    this.entities.delete(id);
  }

  getEntityById(id: ObjectIdentifier) {
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
