import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



import Comentarios from '../screens/Comentarios';
import Home from '../screens/HomePage';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
      <Stack.Navigator>

        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        < Stack.Screen
          name="Comentarios"
          component={Comentarios}
          options={{ headerShown: false }}
        /> 

      </Stack.Navigator>
  );
}

export default StackNavigator;