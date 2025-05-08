import { Component, ComponentClass } from './Component';
import { Entity, BaseEntity } from './Entity';
import { System, BaseSystem } from './System';
import { Scene } from './Scene';

type ObjectIdentifier = string | number;

export type {
  ObjectIdentifier,
  Entity,
  Component,
  ComponentClass,
  System,
  Scene,
};
export { BaseEntity, BaseSystem };
