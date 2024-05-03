import {
  NativeScrollEvent,
  NativeSyntheticEvent,
  Text,
  View,
} from 'react-native';
import {Movie} from '../../../core/entities/movie.entity';
import {FlatList} from 'react-native-gesture-handler';
import {MoviePoster} from './MoviePoster';
import {useEffect, useRef} from 'react';

interface Props {
  movies: Movie[];
  title?: string;
  loadNextPage?: () => void;
}

const HorizontalCarrousel = ({movies, title, loadNextPage}: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;

    const isEndReached =
      contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;
    if (!isEndReached) return;

    isLoading.current = true;

    //CArgar las siguientes peliculas

    loadNextPage && loadNextPage();
  };

  return (
    <View style={{height: title ? 260 : 220}}>
      {title && (
        <Text
          style={{
            fontSize: 30,
            fontWeight: '300',
            marginLeft: 10,
            marginBottom: 10,
            color: '#000',
          }}>
          {title}
        </Text>
      )}

      <FlatList
        data={movies}
        horizontal
        renderItem={({item}) => (
          <MoviePoster movie={item} width={140} height={200} />
        )}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
};

export {HorizontalCarrousel};
