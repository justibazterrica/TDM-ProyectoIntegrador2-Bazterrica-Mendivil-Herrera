import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import Home from '../screens/HomePage';
import Profile from '../screens/Profile';
import Post from '../screens/CrearPost';
import Comentarios from '../screens/Comentarios';
import comentariosNavegacion from './comentariosNavegacion';
import { TurboModuleRegistry } from 'react-native';


const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (

    <Tab.Navigator screenOptions={{ tabBarShowLabel: true }}>

      <Tab.Screen
        name="Home"
        component={comentariosNavegacion}
        options = {{headerShown: false}}
      />

      <Tab.Screen
        name="NewPost"
        component={Post}
        options = {{headerShown: false}}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options = {{headerShown: false}}
        
      />
      
    </Tab.Navigator>
  );
}

export default TabNavigator;
