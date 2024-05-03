import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMaper} from '../../../infrastructure/mappers/movies.mapper';
import {TopRatedResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import type {Movie} from '../../entities/movie.entity';

export const moviesTopRatedUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<TopRatedResponse>('/top_rated');
    return topRated.results.map(MovieMaper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - TopRatedUseCase');
  }
};
