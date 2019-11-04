import React, { FunctionComponent, ComponentClass } from 'react';
import { style, classes, types } from 'typestyle';
import { BlockTypes, BlockType } from './blockTypes';
import { InvalidBlockTypeError } from './invalidBlockTypeError';
import vaildHTMLTag from './validateHTMLTag';

export type BlockType = BlockType;
export { BlockTypes, InvalidBlockTypeError };

export interface Property {
  [key: string]: (() => any) | string | number | Property | Property[];
}

export interface BasicBlockProps {
  id: string;
  key?: string | number;
  className?: string;
  properties?: Property;
  styles?: types.NestedCSSProperties | types.NestedCSSProperties[];
}

export interface BlockProps extends BasicBlockProps {
  type: string;
  content: string | BlockProps[];
}

export const Block = (blockProperties: BlockProps): JSX.Element => {
  const blockTypes: BlockType = BlockTypes.getInstance().getTypes();

  const getBlockType = (
    type: string,
    blockProps: BlockProps
  ): string | FunctionComponent | ComponentClass => {
    const blockType = blockTypes[type] || vaildHTMLTag(type) || null;

    if (!blockType) {
      throw new InvalidBlockTypeError(
        `Invalid block type ${type}. With ID: ${blockProps.id}`
      );
    }

    return blockType;
  };

  const prepareStyles = (
    styles: types.NestedCSSProperties | types.NestedCSSProperties[]
  ): string => {
    return styles instanceof Array ? style(...styles) : style(styles);
  };

  const prepareProps = (blockProps: BasicBlockProps): BasicBlockProps => {
    const { className, styles, properties, ...props } = blockProps;
    const blockClasses = styles
      ? classes(prepareStyles(styles), className)
      : className;

    return { className: blockClasses, ...properties, ...props };
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

    return React.createElement(
      blockType,
      prepareProps(props),
      prepareContent(content)
    );
  };

  return renderBlock(blockProperties);
};
