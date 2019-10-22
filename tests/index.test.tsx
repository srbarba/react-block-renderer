import React from 'react';
import { ShallowWrapper, ReactWrapper } from 'enzyme';
import { shallow, mount } from '../enzyme';
import { ClassComponent, FunctionComponent } from './mock';
import { Block, BlockProps, BlockTypes } from '../src';

// Declare types
BlockTypes.getInstance().setTypes({ ClassComponent, FunctionComponent });

describe('Block component', () => {
  let content: BlockProps;

  beforeEach(() => {
    content = {
      id: '1',
      type: 'div',
      content: 'Text content type'
    };
  });

  it('renders a div with text content', () => {
    content.type = 'div';

    const result = shallowBlock(content);

    expect(result.contains('Text content type')).toBeTruthy();
    expect(result.getElement().props.id).toEqual('1');
    expect(result.getElements().length).toEqual(1);
    expect(result.getElement().type).toEqual('div');
  });

  it('renders a class component', () => {
    content.type = 'ClassComponent';

    const result = shallowBlock(content);

    expect(result.name()).toEqual('ClassComponent');
  });

  it('renders a function component', () => {
    content.type = 'FunctionComponent';

    const result = mountBlock(content);

    expect(result.getElement().props.type).toEqual('FunctionComponent');
  });
});

const shallowBlock = (blockContent: BlockProps): ShallowWrapper => {
  return shallow(<Block {...blockContent} />);
};

const mountBlock = (blockContent: BlockProps): ReactWrapper => {
  return mount(<Block {...blockContent} />);
};
