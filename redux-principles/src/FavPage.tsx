import React, {useContext} from 'react';
import {Store} from './Store';
import {IEpisodeProps} from './interfaces';
import {toggleFavAction} from './Actions';

const EpisodeList = React.lazy<any>(() => import('./EpisodesList'));

export default function FavPage(): JSX.Element {
  const {state, dispatch} = useContext(Store);

  const props: IEpisodeProps = {
    episodes: state.favourites,
    store: {state, dispatch},
    toggleFavAction,
    favourites: state.favourites,
  };

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <div className="episode-layout">
        <EpisodeList {...props} />
      </div>
    </React.Suspense>
  );
}
