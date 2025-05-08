import { Component, ComponentClass } from '../types';

export const areComponentsNull = <T extends Component[]>(
  ...componentClasses: { [K in keyof T]: ComponentClass<T[K]> }
) => {
  return componentClasses.some((x) => x == null);
};
