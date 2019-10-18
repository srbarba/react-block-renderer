// https://github.com/Microsoft/TypeScript-Babel-Starter
import React from 'react';
import { types } from "typestyle";

export interface BlockProps {
    id: string,
    type: string,
    key?: string | number,
    content?: string | BlockProps[],
    className?: string,
    properties?: {[key: string]: string},
    styles?: types.NestedCSSProperties | types.NestedCSSProperties[]
  }

export const Block = (properties: BlockProps): JSX.Element => {

  const renderBlock = (blockProps: BlockProps): JSX.Element => {
    const {type, content, ...props} = blockProps;

    return React.createElement(type, props, content);
  };

  return renderBlock(properties);
}