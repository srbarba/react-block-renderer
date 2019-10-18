import React from 'react';
import ReactDOM from 'react-dom';
import { Block } from '../src';

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
});