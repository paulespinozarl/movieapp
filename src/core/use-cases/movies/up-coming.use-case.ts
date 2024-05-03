import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {MovieMaper} from '../../../infrastructure/mappers/movies.mapper';
import {UpComingResponse} from '../../../infrastructure/interfaces/movie-db.responses';
import type {Movie} from '../../entities/movie.entity';

export const moviesUpComingUseCase = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const upComing = await fetcher.get<UpComingResponse>('/upcoming');
    return upComing.results.map(MovieMaper.fromMovieDBResultToEntity);
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching movies - UpComingUseCase');
  }
};
