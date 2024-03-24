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
import Navigation from './src/routes/Navigation';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <SafeAreaView>
    <NavigationContainer>
      <RuskProvider>
        <Navigation/>
      </RuskProvider>
    </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ScrollC: {flex: 1, color: 'black'},
});

export default App;
