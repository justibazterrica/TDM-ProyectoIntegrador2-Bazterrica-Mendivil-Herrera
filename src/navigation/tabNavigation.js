import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';

import Home from '../screens/HomePage';
import Profile from '../screens/Profile';
import Post from '../screens/CrearPost';

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (

    <Tab.Navigator screenOptions={{ tabBarShowLabel: false }}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="home" size={24} color="black" />
        }}
      />

      <Tab.Screen
        name="NewPost"
        component={Post}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="post" size={24} color="black" />
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />
        }}
      />

    </Tab.Navigator>
  );
}

export default TabNavigator;
