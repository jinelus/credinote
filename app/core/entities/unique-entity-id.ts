import { v4 as uuidv4 } from 'uuid';

export class UniqueEntityId {
  private value: string

  constructor(value?: string) {
    this.value = value ?? uuidv4()
  }

  toString() {
    return this.value
  }

  toValue() {
    return this.value
  }

  equals(id: UniqueEntityId) {
    return this.value === id.value
  }
}
