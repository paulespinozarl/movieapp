import {useRoute} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import {Text, View} from 'react-native';
import {RootStackParams} from '../../navigation/StackNavigation';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movie/MovieHeader';
import {MovieDetails} from '../../components/movie/MovieDetails';
import {ScrollView} from 'react-native-gesture-handler';

interface Props extends StackScreenProps<RootStackParams, 'Details'> {}

const Details = ({route}: Props) => {
  const {movieId} = route.params;

  const {isLoading, movie, cast = []} = useMovie(movieId);

  if (isLoading) {
    return <Text>Loading</Text>;
  }

  return (
    <ScrollView>
      <MovieHeader
        poster={movie!.poster}
        originalTitle={movie!.originalTitle}
        title={movie!.title}
      />

      <MovieDetails movie={movie!} cast={cast} />
    </ScrollView>
  );
};

export {Details};
