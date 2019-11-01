import React, { Component } from 'react';

export class ClassComponent extends Component<any> {
  render() {
    const { children, 'function-prop': functionProp, ...props } = this.props;
    return React.createElement('div', props, children);
  }
}

export const FunctionComponent = (blockProps: any): JSX.Element => {
  const { children, 'function-prop': functionProp, ...props } = blockProps;
  return React.createElement('div', props, children);
};
