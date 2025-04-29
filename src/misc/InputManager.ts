export class InputManager {
  private keys: Set<string> = new Set<string>();

  keyDown(key: string) {
    this.keys.add(key);
  }

  keyUp(key: string) {
    this.keys.delete(key);
  }

  isKeyPressed(key: string) {
    return this.keys.has(key);
  }
}
