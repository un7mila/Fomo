import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import ChatUser from './app/chats/ChatUser.screen';
import ChatList from './app/chats/ChatList.screen';
import Swipes from './app/swipe/Swipe.screen';
import SignInScreen from './app/user/SignIn.screen';
import {SafeAreaView} from 'react-native';
import Profile from 'app/profile/Profile.screen';
import useInitialize from 'hooks/useInitialize';

const Stack = createStackNavigator();

const Navigations = () => {
  const {initialized, isSignIn} = useInitialize();
  if (!initialized) {
    return null;
  }
  return (
    <Stack.Navigator>
      {isSignIn ? (
        <>
          <Stack.Screen
            name="Main"
            options={{
              headerShown: false,
            }}
            component={MainScreen}
          />
          <Stack.Screen name="ChatUser" component={ChatUser} />
        </>
      ) : (
        <Stack.Screen
          name="SignIn"
          options={{
            headerShown: false,
          }}
          component={SignInScreen}
        />
      )}
    </Stack.Navigator>
  );
};

const Tab = createBottomTabNavigator();

const MainScreen = () => {
  return (
    <SafeAreaView style={{height: '100%'}}>
      <Tab.Navigator
        initialRouteName="Profile"
        screenOptions={{
          tabBarStyle: {},
        }}>
        <Tab.Screen
          options={{
            headerShown: false,
            tabBarIcon: props => (
              <Icon
                name="user"
                size={30}
                color={props.focused ? 'black' : 'gray'}
              />
            ),
            tabBarActiveTintColor: 'black',
          }}
          name="Profile"
          component={Profile}
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
                name="heart"
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
    </SafeAreaView>
  );
};

export default Navigations;
