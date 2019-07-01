import React from 'react';
import ReactDOM from 'react-dom';

function App(): JSX.Element {
  const sum = (a: number, b: number): number => a + b;

  return <h1>Hello! {sum(15, 15)}</h1>;
}

export default App;

const root = document.getElementById('app-root');

ReactDOM.render(<App />, root);
