import React, { Component } from 'react';
import { Block, BlockTypes } from 'react-block-renderer';
import './App.css';

// Create a React class component
export class ClassComponent extends Component<any> {
  render() {
    const { children, 'function-prop': functionProp, ...props } = this.props;
    return React.createElement('div', props, children);
  }
}

// Add the component to the blockTypes list
BlockTypes.getInstance().setTypes({ ClassComponent });

const App: React.FC = () => {
  // Create the block object properties
  const blockProps = {
    id: "1",
    type: "ClassComponent",
    content: "Class component example"
  };
  return (
    <div className="App">
      <div className="App-content">
        {/* <!-- Add the Block tag and pass the block properties --> */}
        <Block {...blockProps} />
      </div>
    </div>
  );
}

export default App;
