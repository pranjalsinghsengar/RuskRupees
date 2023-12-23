import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect} from 'react';
import FlipCards from './FlipCards';
import {Modal} from '@mui/base';
import {RuskContext} from './Context';
import Invite from './Invite';

const Window = ({navigation, setOpenprofile}) => {
  const {
    userInfo,
    setUserInfo,
    currentTab,
    setCurrentTab,
    coinWallet,
    setCoinWallet,
    remainingTime,
    showCooldownModal,
    setShowCooldownModal,
  } = useContext(RuskContext);

  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  // useEffect(() => {
  //   // Redirect to the login screen if userInfo is not available
  //   if (!userInfo) {
  //     navigation.navigate('Login');
  //   } else {

  //   }
  // }, [userInfo, navigation]);

  const imageUrl = userInfo ? userInfo.photo : null;
  // console.log(userInfo)
  // console.log('imageUrl', userInfo.user);
  // console.log('Image ', AboutUser.user);
  const OpenAccountHandler = () => {
    // setOpenprofile(true);
    navigation.navigate('Profile');
  };
  // console.log('datafrom backend ', userInfo);
  return (
    <View
      style={{
        height: '100%',
        paddingHorizontal: 15,
        paddingTop: 15,
        backgroundColor: '#efeff0',
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        {/* <Text style={styles.heading}> */}
        <Image
          source={require('./assets/LOGO2.png')}
          style={{width: 100, height: 50}}
        />
        {/* </Text> */}
        <View style={{flexDirection: 'row', gap: 10}}>
          <View
            style={{
              padding: 5,
              paddingHorizontal: 20,
              backgroundColor: 'white',
              gap: 10,
              flexDirection: 'row',
              alignItems: 'center',
              borderRadius: 10,
            }}>
            <Image
              source={require('./assets/CoinWallet.png')}
              style={styles.WalletImage}
            />

            <Text style={{fontSize: 20}}>{coinWallet}</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'gold',
              width: 50,
              height: 50,
              borderRadius: 8,
              overflow: 'hidden',
            }}
            onPress={OpenAccountHandler}>
            <Image
              source={{uri: imageUrl}}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          gap: 15,
          marginTop: 10,
          borderWidth: 1,
          borderColor: 'grey',
          padding: 10,
          borderRadius: 15,
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          style={[
            currentTab === 1 && styles.SelectionTabBar,
            styles.tabBarText,
          ]}
          onPress={() => setCurrentTab(1)}>
          <Text style={styles.textColor}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            currentTab === 2 && styles.SelectionTabBar,
            styles.tabBarText,
          ]}
          onPress={() => {
            setCurrentTab(2);
          }}>
          <Text style={styles.textColor}>Invites</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            currentTab === 3 && styles.SelectionTabBar,
            styles.tabBarText,
          ]}
          onPress={() => setCurrentTab(3)}>
          <Text style={styles.textColor}>Share</Text>
        </TouchableOpacity>
      </View>

      {currentTab === 1 && <FlipCards />}
      {currentTab === 2 && <Invite />}

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
    </View>
  );
};

export default Window;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textColor: {
    color: 'black',
  },
  leftContainer: {
    flex: 1,
  },
  SelectionTabBar: {
    backgroundColor: '#efeff0',
    borderWidth: 1,
    borderColor: '#A8A8A8',
  },
  tabBarText: {
    paddingHorizontal: 20,
    padding: 5,
    borderRadius: 8,
  },
  coinContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  coinText: {
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
  },
  WalletImage: {
    height: 40,
    width: 40,
  },
  walletText: {
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
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
