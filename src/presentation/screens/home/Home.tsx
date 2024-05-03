import {Text, View} from 'react-native';
import {useMovies} from '../../hooks/useMovies';
import {ScrollView} from 'react-native-gesture-handler';
import {PosterCarousel} from '../../components/movies/PosterCarousel';
import {HorizontalCarrousel} from '../../components/movies/HorizontalCarrousel';

const Home = () => {
  const {isLoading, nowPlaying, popular, topRated, upComing, popularNextPage} =
    useMovies();

  if (isLoading) {
    return <Text style={{color: '#000'}}>Cargando...</Text>;
  }
  return (
    <ScrollView>
      <View style={{marginTop: 20, paddingBottom: 30}}></View>
      <PosterCarousel movies={nowPlaying} />
      <HorizontalCarrousel
        movies={popular}
        title="Populares"
        loadNextPage={popularNextPage}
      />
      <HorizontalCarrousel movies={topRated} title="Mejor calificadas" />
      <HorizontalCarrousel movies={upComing} title="Estrenos" />
    </ScrollView>
  );
};

export {Home};
