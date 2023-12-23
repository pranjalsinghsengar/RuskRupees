import {
  Alert,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext} from 'react';
import {RuskContext} from './Context';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Uuid from './Uuid';

const Profile = ({navigation, user}) => {
  const {setUserUID, userInfo, coinWallet, setUser, setUserInfo} =
    useContext(RuskContext);

  const imgeUrl = userInfo ? userInfo.photo : null;

  const SignOutHandle = async () => {
    try {
      await GoogleSignin.signOut();
      await setUserInfo(null);
      await setUserUID(null); // Remember to remove the user from your app's state as well
      await navigation.navigate('Login');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ImageBackground
      source={require('./assets/RuskRupees3.png')} // Replace with the actual path to your background image
      style={styles.backgroundImage}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 30,
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
          {/* <TouchableOpacity
            style={{
              backgroundColor: 'gold',
              width: 50,
              height: 50,
              borderRadius: 8,
              overflow: 'hidden',
            }}
            onPress={OpenAccountHandler}>
            <Image
              source={{uri: imgeUrl}}
              style={{width: '100%', height: '100%'}}
            />
          </TouchableOpacity> */}
        </View>
      </View>
      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Image
          source={{uri: imgeUrl}}
          style={{width: 100, height: 100, margin: 20, borderRadius: 10}}
        />
        <View style={{gap: 10}}>
          <View style={styles.TextCard}>
            <Text style={styles.TextBold}>Name: </Text>
            <Text>{userInfo && userInfo.name}</Text>
          </View>
          <View style={styles.TextCard}>
            <Text style={[styles.TextBold]}>Email: </Text>
            <Text>{userInfo && userInfo.email}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          backgroundColor: 'white',
          padding: 15,
          borderRadius: 8,
          paddingHorizontal: 20,
          position: 'absolute',
          bottom: 100,
          borderColor: 'red',
          borderWidth: 1,
        }}
        onPress={SignOutHandle}>
        <Text style={{color: 'black'}}>Sign out</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Profile;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' depending on your image's aspect ratio
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  TextCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  TextBold: {
    fontWeight: '600',
  },
  WalletImage: {
    height: 40,
    width: 40,
  },
});
