import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import tw from 'twrnc';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatUser from './app/chats/ChatUser.screen';
import ChatList from './app/chats/ChatList.screen';
import Swipes from './app/swipe/Swipe.screen';

const Stack = createStackNavigator();

const Navigations = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const Tab = createBottomTabNavigator();

const Main = () => {
  return (
    <Tab.Navigator
      initialRouteName="Swipes"
      screenOptions={{
        tabBarStyle: {
          ...tw`border-solid border-t-2 border-t-black`,
        },
      }}>
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Icon
              name="home"
              size={30}
              color={props.focused ? 'black' : 'gray'}
            />
          ),
          tabBarActiveTintColor: 'black',
        }}
        name="Chats"
        component={ChatUser}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Icon
              name="comment"
              size={30}
              color={props.focused ? 'black' : 'gray'}
            />
          ),
          tabBarActiveTintColor: 'black',
        }}
        name="ChatList"
        component={ChatList}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Icon
              name="comment"
              size={30}
              color={props.focused ? 'black' : 'gray'}
            />
          ),
          tabBarActiveTintColor: 'black',
        }}
        name="ChatUser"
        component={ChatUser}
      />
      <Tab.Screen
        options={{
          headerShown: false,
          tabBarIcon: props => (
            <Icon
              name="comment"
              size={30}
              color={props.focused ? 'black' : 'gray'}
            />
          ),
          tabBarActiveTintColor: 'black',
        }}
        name="Swipes"
        component={Swipes}
      />
    </Tab.Navigator>
  );
};

export default Navigations;
