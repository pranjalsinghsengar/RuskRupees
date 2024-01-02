import React, {useState, useEffect} from 'react';
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import FlipCards from './FlipCards';
// import TabBar from './TabBar';
// import AppDownload from './AppDownload';
import LognPage from './LognPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import Window from './Window';
import OnboardingScreens from './OnboardingScreens';
// import {FIREBASE_AUTH} from './fireConfig';
// import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
// import Profile from './Profile';
import {NavigationContainer} from '@react-navigation/native';
import {RuskContext, RuskProvider} from './Context';
import Window from './Window';
import Profile from './Profile';
import Invite from './Invite';
import Referral from './Referral';
import Share from './Sharring';
import Sharring from './Sharring';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    // <SafeAreaView>
    // <StatusBar />
    <NavigationContainer>
      <RuskProvider>
        {/* <View style={styles.ScrollC}> */}
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
        {/* {userInfo ? (
        Openprofile ? (
          <Profile userInfo={userInfo} coinWallet={coinWallet} />
        ) : (
          <Window
            coinWallet={coinWallet}
            setCoinWallet={setCoinWallet}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
            remainingTime={remainingTime}
            setRemainingTime={setRemainingTime}
            lastClickTime={lastClickTime}
            setLastClickTime={setLastClickTime}
            setShowCooldownModal={setShowCooldownModal}
            userInfo={userInfo}
            setOpenprofile={setOpenprofile}
          />
        )
      ) : (
        <LognPage setUserInfo={setUserInfo} />
      )} */}

        {/* // </SafeAreaView> */}

        {/* <OnboardingScreens /> */}
        {/* </View> */}
      </RuskProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  ScrollC: {flex: 1, color: 'black'},
});

export default App;
