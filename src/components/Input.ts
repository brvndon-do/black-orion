import { Component } from '../types/Component';

export class InputComponent implements Component {
  public type = 'input';

  constructor(public bindings: Record<string, string> = {}) {}
}
