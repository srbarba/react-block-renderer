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

  describe('renders', () => {
    it('a div with text content', () => {
      content.type = 'div';

      const result = shallowBlock(content);

      expect(result.contains('Text content type')).toBeTruthy();
      expect(result.getElement().props.id).toEqual('1');
      expect(result.getElements().length).toEqual(1);
      expect(result.getElement().type).toEqual('div');
    });

    it('a class component', () => {
      content.type = 'ClassComponent';

      const result = shallowBlock(content);

      expect(result.name()).toEqual('ClassComponent');
    });

    it('a function component', () => {
      content.type = 'FunctionComponent';

      const result = mountBlock(content);

      expect(result.getElement().props.type).toEqual('FunctionComponent');
    });
  });

  describe('throws', () => {
    it('InvalidBlockTypeError on invalid tag', () => {
      try {
        content.type = 'invalid';
        shallowBlock(content);
      } catch (e) {
        expect(e.message).toEqual('Invalid block type invalid. With ID: 1');
      }
    });
  });
});

const shallowBlock = (blockContent: BlockProps): ShallowWrapper => {
  return shallow(<Block {...blockContent} />);
};

const mountBlock = (blockContent: BlockProps): ReactWrapper => {
  return mount(<Block {...blockContent} />);
};
