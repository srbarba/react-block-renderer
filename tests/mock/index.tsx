import React, { Component } from 'react';

export class ClassComponent extends Component {
  render() {
    const { children, ...props } = this.props;
    return React.createElement('div', props, children);
  }
}

export const FunctionComponent = (blockProps: any): JSX.Element => {
  const { children, ...props } = blockProps;
  return React.createElement('div', props, children);
};
