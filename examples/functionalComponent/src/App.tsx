import { React, Component } from 'react';
import { Block } from 'react-block-renderer';
import './App.css';

// Create a React functional component
export const FunctionComponent = (blockProps: any): JSX.Element => {
  const { children, ...props } = blockProps;
  return React.createElement('div', props, children);
};

// Add the component to the blockTypes list
BlockTypes.getInstance().setTypes({ FunctionComponent });

const App: React.FC = () => {
  // Create the block object properties
  const blockProps = {
    id: "1",
    type: "FunctionComponent",
    content: "Function component example"
  };
  return (
    <div className="App">
      <div className="App-content">
        <!-- Add the Block tag and pass the block properties -->
        <Block {...blockProps} />
      </div>
    </div>
  );
}

export default App;
