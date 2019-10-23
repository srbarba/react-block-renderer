import React from 'react';
import { ShallowWrapper, ReactWrapper } from 'enzyme';
import { shallow, mount, render } from '../enzyme';
import { ClassComponent, FunctionComponent } from './mock';
import { Block, BlockProps, BlockTypes } from '../src';

// Declare types
BlockTypes.getInstance().setTypes({ ClassComponent, FunctionComponent });

describe('Block component', () => {
  let props: BlockProps;

  beforeEach(() => {
    props = {
      id: '1',
      type: 'div',
      content: 'Text content'
    };
  });

  describe('renders', () => {
    it('a div with text content', () => {
      props.type = 'div';

      const result = shallowBlock(props);

      expect(result.contains('Text content')).toBeTruthy();
      expect(result.getElement().props.id).toEqual('1');
      expect(result.getElements().length).toEqual(1);
      expect(result.getElement().type).toEqual('div');
    });

    it('a class component', () => {
      props.type = 'ClassComponent';

      const result = shallowBlock(props);

      expect(result.name()).toEqual('ClassComponent');
    });

    it('a function component', () => {
      props.type = 'FunctionComponent';

      const result = mountBlock(props);

      expect(result.getElement().props.type).toEqual('FunctionComponent');
    });

    it('a div with one child level', () => {
      props.type = 'div';
      props.content = [{
        id: '2',
        type: 'div',
        content: 'Text content child'
      }];

      const result = renderBlock(props);

      expect(result.children().attr().id).toEqual('2');
    });

    it('a div with multiple child', () => {
      props.type = 'div';
      props.content = [
        {
          id: '2',
          type: 'div',
          content: 'Text content child'
        },
        {
          id: '3',
          type: 'div',
          content: 'Text content child'
        }
      ];

      const result = renderBlock(props);

      expect(result.children().length).toEqual(2);
      expect(result.children()[0].attribs.id).toEqual('2');
      expect(result.children()[1].attribs.id).toEqual('3');
    });

    it('a div with more than one child level', () => {
      props.type = 'div';
      props.content = [{
        id: '2',
        type: 'div',
        content: [{
          id: '3',
          type: 'div',
          content: 'Text content child'
        }]
      }];

      const result = renderBlock(props);

      expect(result.children().attr().id).toEqual('2');
      expect(result.children().children().attr().id).toEqual('3');
    });
  });

  describe('throws', () => {
    it('InvalidBlockTypeError on invalid tag', () => {
      try {
        props.type = 'invalid';
        shallowBlock(props);
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

const renderBlock = (blockContent: BlockProps): Cheerio => {
  return render(<Block {...blockContent} />);
};
