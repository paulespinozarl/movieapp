import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {FullMovie} from '../../core/entities/movie.entity';
import {Cast} from '../../core/entities/cast.entity';

const useMovie = (movieId: number) => {
  const [isLoading, setIsloading] = useState(true);
  const [movie, setMovie] = useState<FullMovie>();
  const [cast, setCast] = useState<Cast[]>();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    setIsloading(true);
    const fullMoviePromise = UseCases.getMovieByUseCase(
      movieDBFetcher,
      movieId,
    );
    const castPromise = UseCases.getMovieCastUseCase(movieDBFetcher, movieId);

    const [FullMovie, cast] = await Promise.all([
      fullMoviePromise,
      castPromise,
    ]);

    setMovie(FullMovie);
    setCast(cast);

    setIsloading(false);
  };

  return {loadMovie, movie, isLoading, cast};
};

export {useMovie};
