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
import FlipCards from './FlipCards';
import TabBar from './TabBar';
import AppDownload from './AppDownload';
import LognPage from './LognPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Window from './Window';
import OnboardingScreens from './OnboardingScreens';
import {FIREBASE_AUTH} from './fireConfig';
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  const [coinWallet, setCoinWallet] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const [remainingTime, setRemainingTime] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showCooldownModal, setShowCooldownModal] = useState(false);

  useEffect(() => {
    if (remainingTime !== null && remainingTime > 0) {
      const timer = setTimeout(() => {
        setRemainingTime(remainingTime - 1000);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [remainingTime]);
  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  // const [successFully, setsuccessFully] = useState(false);
  const [userInfo, setUserInfo] = useState();
  // useEffect(() => {}, [userInfo]);
  // const AboutUser = JSON.stringify(userInfo);
  useEffect(() => {
    // This effect will run when userInfo is updated
    if (userInfo && userInfo.user) {
      console.log(userInfo);
    }
  }, [userInfo]);

  return (
    // <SafeAreaView>
    // <StatusBar />
    <View style={styles.ScrollC}>
      {/* <Stack.Navigator>
        <Stack.Screen name="LognPage" component={LognPage} />
        <Stack.Screen name="Window" component={Window} />
        <Stack.Screen name="OnboardingScreens" component={OnboardingScreens} />
      </Stack.Navigator> */}
      {userInfo ? (
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
        />
      ) : (
        <LognPage setUserInfo={setUserInfo} />
      )}
      <Modal
        transparent={true}
        visible={showCooldownModal}
        animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, {width: '80%'}]}>
            <Text style={{fontSize: 20}}>
              Try after{' '}
              <Text style={{fontSize: 30, color: 'red'}}>
                {' '}
                {formatTime(remainingTime)}
              </Text>{' '}
            </Text>
            <TouchableOpacity
              onPress={() => setShowCooldownModal(false)}
              style={styles.closeModalButton}>
              <Text style={{paddingHorizontal: 30}}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* // </SafeAreaView> */}

      {/* <OnboardingScreens /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  ScrollC: {flex: 1, color: 'black'},
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  closeModalButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'lightblue',
    borderRadius: 5,
  },
});

export default App;
