import { FunctionComponent, ComponentClass } from 'react';

export interface BlockType {
  [component: string]: FunctionComponent | ComponentClass;
}

export class BlockTypes {
  static getInstance(): BlockTypes {
    return (BlockTypes.instance = BlockTypes.instance || new BlockTypes());
  }

  private static instance: BlockTypes;
  protected types: BlockType;

  private constructor() {
    this.types = {};
  }

  setTypes(types: BlockType): void {
    this.types = { ...types, ...this.types };
  }

  getTypes(): BlockType {
    return this.types;
  }
}
