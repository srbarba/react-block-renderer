import React, { Component } from 'react';
import { ShallowWrapper } from 'enzyme';
import { shallow } from '../enzyme';
import { Block, BlockProps, BlockTypes } from '../src';

class ClassComponent extends Component {
    render() {
        const {children, ...props} = this.props;
        return (React.createElement("div", props, children));
    }
}

const FunctionComponent = (blockProps: any): JSX.Element => {
    const {children, ...props} = blockProps;
    return React.createElement("div", props, children);
}

// Declare types
BlockTypes.getInstance().setTypes({ClassComponent, FunctionComponent});

describe('Block component', () => {
    let content: BlockProps;

    beforeEach(() => {
        content = {
            id: "1",
            type: "div",
            content: "Text content type"
        }
    });

    it('renders a div with text content', () => {
        content.type = "div";

        const result = renderBlock(content);

        expect(result.contains("Text content type")).toBeTruthy();
        expect(result.getElement().props.id).toEqual("1");
        expect(result.getElements().length).toEqual(1);
        expect(result.getElement().type).toEqual("div");
    });

    it('renders a class component', () => {
        content.type = "ClassComponent";

        const result = renderBlock(content);

        expect(result.name()).toEqual("ClassComponent");
    });

    it('renders a function component', () => {
        content.type = "FunctionComponent";

        const result = renderBlock(content);

        expect(result.name()).toEqual("FunctionComponent");
    });
});

const renderBlock = (blockContent: BlockProps): ShallowWrapper => {
    return shallow(<Block {...blockContent} />);
}