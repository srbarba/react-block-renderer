import React from 'react';
import { ShallowWrapper, ReactWrapper } from 'enzyme';
import { shallow, mount, render } from '../enzyme';
import { ClassComponent, FunctionComponent } from './components';
import {
  Block,
  BlockProps,
  BlockTypes,
  Property,
  InvalidBlockTypeError
} from '../src';

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
    const itWithTextContent = () => {
      it('with text content', () => {
        const result = mountBlock(props);

        expect(result.contains('Text content')).toBeTruthy();
        expect(result.getElement().props.id).toEqual('1');
        expect(result.getElements().length).toEqual(1);
        expect(result.getElement().props.type).toEqual(props.type);
      });
    };

    const itWithOneChildLevel = () => {
      it('with one child level', () => {
        props.content = [
          {
            id: '2',
            type: 'div',
            content: 'Text content child'
          }
        ];

        const result = renderBlock(props);

        expect(result.children().length).toBeGreaterThan(0);
        expect(result.children().attr().id).toEqual('2');
      });
    };

    const itWithMultipleChilds = () => {
      it('with multiple childs', () => {
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
    };

    const itWithMoreThanOneChildLevel = () => {
      it('with more than one child level', () => {
        props.content = [
          {
            id: '2',
            type: 'div',
            content: [
              {
                id: '3',
                type: 'div',
                content: 'Text content child'
              }
            ]
          }
        ];

        const result = renderBlock(props);

        expect(result.children().attr().id).toEqual('2');
        expect(
          result
            .children()
            .children()
            .attr().id
        ).toEqual('3');
      });
    };

    const itWithClassName = () => {
      it('with className', () => {
        props.className = 'customClassName';

        const result = shallowBlock(props);

        expect(result.getElement().props.className).toEqual('customClassName');
      });
    };

    const itWithCustomStylesObject = () => {
      it('with custom styles object', () => {
        props.styles = { opacity: 0 };

        const result = mountBlock(props);

        expect(result.find('div').get(0).props.className).toBeDefined();
        expect(result.getElement().props.styles.opacity).toEqual(0);
      });
    };

    const itWithCustomStylesArray = () => {
      it('with custom styles array', () => {
        props.styles = [{ opacity: 0 }, { display: 'inline' }];

        const result = mountBlock(props);

        expect(result.find('div').get(0).props.className).toBeDefined();
        expect(result.getElement().props.styles[0].opacity).toEqual(0);
        expect(result.getElement().props.styles[1].display).toEqual('inline');
      });
    };

    const expectToHavePropertiesWithValues = (
      elementProps: Property,
      properties: Property
    ) => {
      Object.keys(properties).forEach(key => {
        expect(elementProps).toHaveProperty(key);
        expect(elementProps[key]).toEqual(properties[key]);
      });
    };

    const itWithCustomProperties = () => {
      it('with custom properties', () => {
        props.properties = {
          'string-prop': 'value',
          'number-prop': 1,
          'object-prop': {
            property: 'value'
          },
          'array-prop': [{ property: 'value' }]
        };

        const result = mountBlock(props);

        expect(result.getElement().props).toHaveProperty('properties');
        expectToHavePropertiesWithValues(
          result.getElement().props.properties,
          props.properties
        );
      });
    };

    const itWithFunctionProperty = () => {
      it('with custom properties', () => {
        props.properties = { 'function-prop': () => null };

        const result = mountBlock(props);

        expect(result.getElement().props).toHaveProperty('properties');
        expectToHavePropertiesWithValues(
          result.getElement().props.properties,
          props.properties
        );
      });
    };

    describe('div component', () => {
      beforeEach(() => (props.type = 'div'));

      itWithTextContent();
      itWithOneChildLevel();
      itWithMultipleChilds();
      itWithMoreThanOneChildLevel();
      itWithClassName();
      itWithCustomStylesObject();
      itWithCustomStylesArray();
      itWithCustomProperties();
    });

    describe('ClassComponent component', () => {
      beforeEach(() => (props.type = 'ClassComponent'));

      itWithTextContent();
      itWithOneChildLevel();
      itWithMultipleChilds();
      itWithMoreThanOneChildLevel();
      itWithClassName();
      itWithCustomStylesObject();
      itWithCustomStylesArray();
      itWithCustomProperties();
      itWithFunctionProperty();
    });

    describe('FunctionComponent component', () => {
      beforeEach(() => (props.type = 'FunctionComponent'));

      itWithTextContent();
      itWithOneChildLevel();
      itWithMultipleChilds();
      itWithMoreThanOneChildLevel();
      itWithClassName();
      itWithCustomStylesObject();
      itWithCustomStylesArray();
      itWithCustomProperties();
      itWithFunctionProperty();
    });
  });

  describe('throws', () => {
    it('InvalidBlockTypeError on invalid tag', () => {
      try {
        props.type = 'invalid';
        shallowBlock(props);
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidBlockTypeError);
        expect(error.message).toEqual('Invalid block type invalid. With ID: 1');
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
