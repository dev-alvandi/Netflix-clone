import React, { Fragment } from 'react';

import CardSlider from './CardSlider';
import LoaderSlider from './LoaderSlider';

export default React.memo(function Slider({ movies, isLoading }) {
  const getMoviesFromRange = (from, to) => {
    return movies.slice(from, to);
  };

  return (
    <div>
      {isLoading && <LoaderSlider />}
      {!isLoading && (
        <Fragment>
          <CardSlider title="Trending Now" data={getMoviesFromRange(0, 10)} />
          <CardSlider title="New Releases" data={getMoviesFromRange(10, 20)} />
          <CardSlider
            title="Blockbuster Movies"
            data={getMoviesFromRange(20, 30)}
          />
          <CardSlider
            title="Popular on Netflix"
            data={getMoviesFromRange(30, 40)}
          />
          <CardSlider title="Action movies" data={getMoviesFromRange(40, 50)} />
          <CardSlider title="Epics" data={getMoviesFromRange(50, 60)} />
        </Fragment>
      )}
    </div>
  );
});
