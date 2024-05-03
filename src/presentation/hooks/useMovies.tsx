import {useEffect, useState} from 'react';
import {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [upComing, setUpComing] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const nowPlayingPromises = UseCases.moviesNowPlayingUseCase(movieDBFetcher);
    const popularPromises = UseCases.moviesPopularUseCase(movieDBFetcher);
    const topRatedPromises = UseCases.moviesTopRatedUseCase(movieDBFetcher);
    const upComingPromises = UseCases.moviesUpComingUseCase(movieDBFetcher);

    const [nowPlayingMovies, popularMovies, topRatedMovies, upComingMovies] =
      await Promise.all([
        nowPlayingPromises,
        popularPromises,
        topRatedPromises,
        upComingPromises,
      ]);

    setNowPlaying(nowPlayingMovies);
    setPopular(popularMovies);
    setTopRated(topRatedMovies);
    setUpComing(upComingMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    popular,
    topRated,
    upComing,

    popularNextPage: async () => {
      popularPageNumber++;
      const popularMovies = await UseCases.moviesPopularUseCase(
        movieDBFetcher,
        {
          page: popularPageNumber,
        },
      );
      setPopular(prev => [...prev, ...popularMovies]);
    },
  };
};

export {useMovies};
