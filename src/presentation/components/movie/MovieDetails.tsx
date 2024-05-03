import {Text, View} from 'react-native';
import {FullMovie} from '../../../core/entities/movie.entity';
import {Formatter} from '../../../config/helpers/formatter';
import {Cast} from '../../../core/entities/cast.entity';
import {FlatList} from 'react-native-gesture-handler';
import {CastActor} from '../cast/CastActor';

interface Props {
  movie: FullMovie;
  cast: Cast[];
}

const MovieDetails = ({movie, cast}: Props) => {
  return (
    <>
      <View style={{marginHorizontal: 20}}>
        <View style={{flexDirection: 'column'}}>
          <Text style={{color: '#000'}}>{movie.rating}</Text>
          <Text style={{marginLeft: 5, color: '#000'}}>
            - {movie.genres.join(', ')}
          </Text>
        </View>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            color: '#000',
          }}>
          Historia
        </Text>
        <Text style={{fontSize: 16, color: '#000'}}>{movie.description}</Text>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            color: '#000',
          }}>
          Presupuesto
        </Text>
        <Text style={{fontSize: 18, color: '#000'}}>
          {Formatter.currency(movie.budget)}
        </Text>
      </View>
      <View style={{marginTop: 10, marginBottom: 50}}>
        <Text
          style={{
            fontSize: 23,
            marginVertical: 10,
            fontWeight: 'bold',
            marginHorizontal: 20,
            color: '#000',
          }}>
          Actores
        </Text>

        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => <CastActor actor={item} />}
        />
      </View>
    </>
  );
};

export {MovieDetails};
