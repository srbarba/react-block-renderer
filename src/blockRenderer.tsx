import React, { FunctionComponent, ComponentClass } from 'react';
import { types } from 'typestyle';
import { BlockTypes, BlockType } from './blockTypes';

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
    type: string
  ): string | FunctionComponent | ComponentClass => {
    return (typeof blockTypes[type] === 'function' && blockTypes[type]) || type;
  };

  const renderBlock = (blockProps: BlockProps): JSX.Element => {
    const { type, content, ...props } = blockProps;

    return React.createElement(getBlockType(type), props, content);
  };

  return renderBlock(properties);
};
