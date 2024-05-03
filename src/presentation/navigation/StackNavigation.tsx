import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/home/Home';
import {Details} from '../screens/details/Details';

export type RootStackParams = {
  Home: undefined;
  Details: {movieId: number};
};

const Stack = createStackNavigator<RootStackParams>();

const StackNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
};

export {StackNavigation};
