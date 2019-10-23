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
  content: string | BlockProps[];
  key?: string | number;
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

  const prepareContent = (
    content: string | BlockProps[]
  ): string | JSX.Element[] => {
    return !(content instanceof Array)
      ? content
      : content.reduce(
          (result: JSX.Element[], blockProps: BlockProps, keyValue: number) =>
            result.concat(renderBlock({ key: keyValue, ...blockProps })),
          []
        );
  };

  const renderBlock = (blockProps: BlockProps): JSX.Element => {
    const { type, content, ...props } = blockProps;
    const blockType = getBlockType(type, blockProps);

    return React.createElement(blockType, props, prepareContent(content));
  };

  return renderBlock(properties);
};
