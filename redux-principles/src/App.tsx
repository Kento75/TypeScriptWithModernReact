import React, {Fragment, useContext} from 'react';
import {Store} from './Store';

interface IEpisode {
  airdate: string;
  airstamp: string;
  airtime: string;
  id: number;
  image: {medium: string; original: string};
  name: string;
  number: number;
  runtime: number;
  season: number;
  summary: string;
  url: string;
}

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
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favorite episode!!</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map(
          (episode: IEpisode) =>
            episode.image &&
            episode.image.medium && (
              <section key={episode.id} className="episode-box">
                <img
                  src={episode.image.medium}
                  alt={`Rich and Mort ${episode.name}`}
                />
                <div>{episode.name}</div>
                <section>
                  Seasion: {episode.season} Number: {episode.number}
                </section>
              </section>
            )
        )}
      </section>
    </Fragment>
  );
}

export default App;
