import React, { FunctionComponent, ComponentClass } from 'react';
import { types } from 'typestyle';
import { BlockTypes, BlockType } from './blockTypes';
import vaildHTMLTag from './validateHTMLTag';

export class InvalidBlockTypeError extends Error {
  constructor(type?: string, id?: string) {
    super(`Invalid block type ${type}. With ID: ${id}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export interface BlockProps {
  id: string;
  type: string;
  key?: string | number;
  content?: string | BlockProps[];
  className?: string;
  properties?: { [key: string]: string };
  styles?: types.NestedCSSProperties | types.NestedCSSProperties[];
}

export const Block = (properties: BlockProps): JSX.Element => {
  const blockTypes: BlockType = BlockTypes.getInstance().getTypes();

  const getBlockType = (
    type: string,
    blockProps: BlockProps
  ): string | FunctionComponent | ComponentClass => {
    const blockType = blockTypes[type] || vaildHTMLTag(type) || null;

    if (!blockType) {
      throw new InvalidBlockTypeError(type, blockProps.id);
    }

    return blockType;
  };

  const renderBlock = (blockProps: BlockProps): JSX.Element => {
    const { type, content, ...props } = blockProps;

    return React.createElement(getBlockType(type, blockProps), props, content);
  };

  return renderBlock(properties);
};
