import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMaper} from '../../../infrastructure/mappers/movies.mapper';
import {MovieDBMovie} from '../../../infrastructure/interfaces/movie-db.responses';
import {FullMovie} from '../../entities/movie.entity';

export const getMovieByUseCase = async (
  fetcher: HttpAdapter,
  movieId: number,
): Promise<FullMovie> => {
  try {
    const movie = await fetcher.get<MovieDBMovie>(`${movieId}`);
    const fullMovie = MovieMaper.fromMovieDBToEntity(movie);
    return fullMovie;
  } catch (error) {
    throw new Error(`Cannot get movie by id: ${movieId}`);
  }
};
