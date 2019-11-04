import React from 'react';
import { Block } from 'react-block-renderer';
import './App.css';

const App: React.FC = () => {
  // Create the block object properties
  const blockProps = {
    id: "1",
    type: "div",
    content: "Basic HTML tags example"
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
