import React from 'react';
import { ShallowWrapper, ReactWrapper } from 'enzyme';
import { shallow, mount, render } from '../enzyme';
import { ClassComponent, FunctionComponent } from './mock';
import { Block, BlockProps, BlockTypes } from '../src';

describe('Block component', () => {
  let props: BlockProps;
  BlockTypes.getInstance().setTypes({ ClassComponent, FunctionComponent });

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

      const result = mountBlock(props);

      expect(result.getElement().props.type).toEqual('ClassComponent');
    });

    it('a function component', () => {
      props.type = 'FunctionComponent';

      const result = mountBlock(props);

      expect(result.getElement().props.type).toEqual('FunctionComponent');
    });

    it('a div with one child level', () => {
      props.content = [{
        id: '2',
        type: 'div',
        content: 'Text content child'
      }];

      const result = renderBlock(props);

      expect(result.children().attr().id).toEqual('2');
    });

    it('a div with multiple child', () => {
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

    it('a div with className', () => {
      props.className = 'customClassName';

      const result = shallowBlock(props);
      
      expect(result.getElement().props.className).toEqual('customClassName');
    });

    it('a div with custom styles object', () => {
      props.styles = {opacity: 0};

      const result = mountBlock(props);

      expect(result.find("div").get(0).props.className).toBeDefined();
      expect(result.getElement().props.styles.opacity).toEqual(0);
    });

    it('a div with custom styles array', () => {
      props.styles = [
        {opacity: 0},
        {display: 'inline'}
      ];

      const result = mountBlock(props);

      expect(result.find("div").get(0).props.className).toBeDefined();
      expect(result.getElement().props.styles[0].opacity).toEqual(0);
      expect(result.getElement().props.styles[1].display).toEqual('inline');
    });

    it('a component with custom properties', () => {
      const functionProp = () => null;

      props.type = 'FunctionComponent';
      props.properties = {
        "string-prop": "value",
        "number-prop": 1,
        "object-prop": {
          property: "value"
        },
        "array-prop": [
          {property: "value"}
        ],
        "function-prop": functionProp
      };

      const result = mountBlock(props);

      expect(result.getElement().props).toHaveProperty("properties");
      expect(result.getElement().props.properties).toHaveProperty("string-prop");
      expect(result.getElement().props.properties["string-prop"]).toEqual("value");
      expect(result.getElement().props.properties).toHaveProperty("number-prop");
      expect(result.getElement().props.properties["number-prop"]).toEqual(1);
      expect(result.getElement().props.properties).toHaveProperty("object-prop");
      expect(result.getElement().props.properties["object-prop"]).toEqual({property: "value"});
      expect(result.getElement().props.properties).toHaveProperty("array-prop");
      expect(result.getElement().props.properties["array-prop"]).toEqual([{property: "value"}]);
      expect(result.getElement().props.properties).toHaveProperty("function-prop");
      expect(result.getElement().props.properties["function-prop"]).toEqual(functionProp);
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
