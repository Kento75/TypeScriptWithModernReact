import React, {Fragment, useContext} from 'react';
import {Store} from './Store';

function App(): JSX.Element {
  const store = useContext(Store);
  return (
    <Fragment>
      {console.log(store)}
      <h1>Rick and Morty</h1>
      <p>Pick your favorite </p>
    </Fragment>
  );
}

export default App;
