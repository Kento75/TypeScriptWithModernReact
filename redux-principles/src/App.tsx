import React, {Fragment, useContext} from 'react';
import {Store} from './Store';
import {IEpisode, IAction} from './interfaces';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

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

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favourites.includes(episode);
    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode,
    };

    if (episodeInFav) {
      const favWithoutEpisode = state.favourites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      );
      dispatchObj = {
        type: 'REMOVE_FAV',
        payload: favWithoutEpisode,
      };
    }

    return dispatch(dispatchObj);
  };

  const props = {
    episodes: state.episodes,
    toggleFavAction,
    favourites: state.favourites,
  };

  console.log(state);
  return (
    <Fragment>
      <header className="header">
        <div>
          <h1>Rick and Morty</h1>
          <p>Pick your favorite episode!!</p>
        </div>
        <div>favourites(s): {state.favourites.length}</div>
      </header>
      <React.Suspense fallback={<div>loading...</div>}>
        <section className="episode-layout">
          <EpisodeList {...props} />
        </section>
      </React.Suspense>
    </Fragment>
  );
}

export default App;
