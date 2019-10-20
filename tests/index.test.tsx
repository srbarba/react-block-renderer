import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Block, BlockTypes } from '../src';

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
    it('renders a div with text content', () => {
        const container = document.createElement('div');
        const content = {
            id: "1",
            type: "div",
            content: "Test"
        }
        ReactDOM.render(<Block {...content} />, container);

        expect(container.textContent).toMatch('Test');
        expect(container.children[0].localName).toMatch('div');
        expect(container.children[0].id).toMatch('1');
    });

    it('renders a class component', () => {
        const container = document.createElement('div');
        const content = {
            id: "1",
            type: "ClassComponent",
            content: "Test"
        }
        ReactDOM.render(<Block {...content} />, container);

        expect(container.textContent).toMatch('Test');
        expect(container.children[0].localName).toMatch('div');
        expect(container.children[0].id).toMatch('1');
    });

    it('renders a function component', () => {
        const container = document.createElement('div');
        const content = {
            id: "1",
            type: "FunctionComponent",
            content: "Test"
        }
        ReactDOM.render(<Block {...content} />, container);

        expect(container.textContent).toMatch('Test');
        expect(container.children[0].localName).toMatch('div');
        expect(container.children[0].id).toMatch('1');
    });
});