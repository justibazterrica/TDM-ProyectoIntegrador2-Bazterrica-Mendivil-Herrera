import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../screens/HomePage';
import Posteo from '../components/Posteo';
import Comentarios from '../screens/Comentarios';
import NuevoComentario from '../screens/NuevoComentario';
import Comentar from '../components/Comentar';

const Stack = createNativeStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomePage"
          component={HomePage}
            options={{ headerShown: false }}
        />



      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;