import {View, Text} from 'react-native';
import React from 'react';

const Navigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LognPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Referral"
        component={Referral}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Window"
        component={Window}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="OnboardingScreens"
        component={OnboardingScreens}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Invite"
        component={Invite}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Sharring"
        component={Sharring}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navigation;
