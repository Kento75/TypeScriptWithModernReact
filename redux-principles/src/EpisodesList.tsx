import React from 'react';
import {IEpisode} from './interfaces';

export default function EpisodesList(props: any): Array<JSX.Element> {
  const {episodes, toggleFavAction, favourites, store} = props;
  const {state, dispatch} = store;

  return episodes.map((episode: IEpisode) => {
    return (
      episode.image &&
      episode.image.medium && (
        <section key={episode.id} className="episode-box">
          <img
            src={episode.image.medium}
            alt={`Rich and Mort ${episode.name}`}
          />
          <div>{episode.name}</div>
          <section style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
              Seasion: {episode.season} Number: {episode.number}
            </div>
            <button
              type="submit"
              onClick={() => toggleFavAction(state, dispatch, episode)}
            >
              {favourites.find((fav: any) => fav.id === episode.id)
                ? 'Unfav'
                : 'Fav'}
            </button>
          </section>
        </section>
      )
    );
  });
}
