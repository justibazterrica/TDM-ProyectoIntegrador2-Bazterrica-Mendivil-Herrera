import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


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
      />

      <Tab.Screen
        name="NewPost"
        component={Post}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
      />

    </Tab.Navigator>
  );
}

export default TabNavigator;
