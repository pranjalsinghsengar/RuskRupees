import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {RuskContext} from './Context';
import Clipboard from '@react-native-clipboard/clipboard';

const Invite = () => {
  const {userInfo} = useContext(RuskContext);
  // console.log(userInfo, 'userInfo');
  const [copytext, setCopyText] = useState('Copy');
  const handleCopyToClipboard = () => {
    Clipboard.setString(userInfo.inviteID);
    setCopyText('Copied');
    setTimeout(() => {
      setCopyText('Copy');
    }, 3000);
    // alert('Text copied to clipboard!');
  };
  return (
    <ImageBackground
      source={require('./assets/RuskRupees3.png')} // Replace with the actual path to your background image
      style={styles.container}>
      <View
        style={{
          backgroundColor: 'black',
          // padding: 5,
          borderRadius: 15,
          overflow: 'hidden',
          width: '90%',
          flex: 1 / 3,
          // padding: 15,
          borderColor: 'white',
          borderWidth: 1,

          shadowColor: 'black',
          shadowOffset: {
            width: 0,
            height: 9,
          },
          shadowOpacity: 0.48,
          shadowRadius: 11.95,

          elevation: 18,
        }}>
        <Image
          source={require('./assets/inviteCard/pexels-fernando-makoto-1429567.jpg')}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: -1,
          }}
        />
        <Image
          source={require('./assets/LOGO2.png')}
          style={{width: 100, height: 50, marginHorizontal: 25, marginTop: 8}}
        />
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '100%'}}>
            {/* <Text style={{fontSize: 30, color: 'orange', marginLeft: 50}}>
              Invite
            </Text> */}
          </View>
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: '700',
                color: 'white',
                letterSpacing: 3,
              }}>
              {userInfo.inviteID}
            </Text>
          </View>
        </View>

        {/* <Text>Invite : {userInfo.inviteID}</Text> */}
      </View>
      <TouchableOpacity
        onPress={handleCopyToClipboard}
        style={{
          marginTop: 50,
          backgroundColor: 'black',
          padding: 5,
          paddingHorizontal: 30,
          borderRadius: 50,

          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,

          elevation: 3,
        }}>
        <Text
          style={[
            copytext === 'Copied' ? {color: 'red'} : {color: 'white'},
            {fontSize: 15},
          ]}>
          {copytext}
        </Text>
      </TouchableOpacity>

      {/* history */}

      {/* <View
        style={{
          width: '80%',
          marginVertical: 50,
          backgroundColor: 'white',
          flex: 1,
          borderRadius: 20,
          padding: 10,
        }}>
        <Text>HISTORY</Text>

        
      </View> */}
    </ImageBackground>
  );
};

export default Invite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
});
