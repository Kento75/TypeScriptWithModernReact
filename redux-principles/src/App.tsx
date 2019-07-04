import React, {Fragment, useContext} from 'react';
import {Store} from './Store';

function App(): JSX.Element {
  const {state, dispatch} = useContext(Store);

  React.useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const URL =
      'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes,
    });
  };

  console.log(state);
  return (
    <Fragment>
      <h1>Rick and Morty</h1>
      <p>Pick your favorite episode!!</p>
    </Fragment>
  );
}

export default App;
