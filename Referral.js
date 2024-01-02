import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {RuskContext} from './Context';
import database from '@react-native-firebase/database';

const Referral = ({navigation}) => {
  const {userUID, userInfo, setAppDownloadCoins, VerifyRef, setVerifyRef} =
    useContext(RuskContext); //context

  const [referralCode, setReferralCode] = useState('');
  const {} = useState();

  const handleVerify = async () => {
    console.log('Referral Code:', referralCode);

    // Query the database to check if the referral code exists
    const referralSnapshot = await database()
      .ref(`Users/`)
      .orderByChild('inviteID')
      .equalTo(referralCode)
      .once('value');
    const referralExists = referralSnapshot.val();

    if (referralExists && referralCode !== userInfo.inviteID) {
      console.log('Referral Code exists in the database.');
      setVerifyRef('Verified');
      setAppDownloadCoins(6); //Set For Update Coins
      database().ref(`Users/${userUID}/InviteBy`).set({
        inviteStatus: true,
        referral_ID: referralCode,
      });
    } else {
      console.log('Referral Code does not exist in the database.');
      setVerifyRef('Invalid');
      setTimeout(() => {
        setVerifyRef('Try again');
      }, 2000);
    }

    // Additional verification logic goes here
  };
  return (
    <ImageBackground
      source={require('./assets/RuskRupees3.png')} // Replace with the actual path to your background image
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {/* <Image
        source={require('./assets/fire.png')}
        style={{
          height: 200,
          width: 300,
          marginTop: 60,
        }}
      /> */}
      <View
        style={{
          //   ,
          width: '80%',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          backgroundColor: 'white',
          borderRadius: 15,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 6,
          },
          shadowOpacity: 0.37,
          shadowRadius: 7.49,

          elevation: 4,
          padding: 10,
          paddingVertical: 30,
        }}>
        <Text style={{marginVertical: 20, fontWeight: 900, fontSize: 30}}>
          R E F E <Text style={{color: 'red'}}>R ₹</Text> A L
        </Text>
        {VerifyRef === 'Verified' ? (
          <Text style={{fontSize: 50, fontWeight: '900', color: 'green'}}>
            {referralCode}
          </Text>
        ) : (
          <TextInput
            placeholder="Type Referral"
            style={{
              borderColor: 'red',
              borderWidth: 1,
              width: '80%',
              padding: 10,
              marginBottom: 30,
              borderRadius: 10,
              color: 'black',

              //   shadowColor: '#000000',
              //   shadowOffset: {
              //     width: 0,
              //     height: 2,
              //   },
              //   shadowOpacity: 0.17,
              //   shadowRadius: 2.54,
              //   elevation: 1,
            }}
            value={referralCode}
            onChangeText={text => setReferralCode(text)}
            //   editable={VerifyRef !== 'Verified'} // Disable input if verified
          />
        )}

        {VerifyRef !== 'Verified' && (
          <TouchableOpacity
            style={styles.BtnStyle}
            onPress={async () => {
              if (VerifyRef !== 'Verified') {
                setVerifyRef('Please Wait');
                await handleVerify();
              }
            }}>
            <Text>{VerifyRef}</Text>
          </TouchableOpacity>
        )}
        {VerifyRef === 'Invalid' && (
          <Text style={{color: 'red'}}>
            Code is Incorrect.. please try again.
          </Text>
        )}

        {VerifyRef === 'Verified' ? (
          <View
            style={[styles.MarginTop, {width: '100%', alignItems: 'center'}]}>
            <Text style={{color: 'green', marginVertical: 10}}>
              {VerifyRef}
            </Text>
            <TouchableOpacity
              style={styles.BtnStyle}
              onPress={() => navigation.navigate('Window')}>
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity
            style={styles.MarginTop}
            onPress={() => navigation.navigate('Window')}>
            <Text>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* <Image
        source={require('./assets/Businessmanollectedbitcoins.png')}
        style={{
          height: 500,
          width: 300,
          position: 'absolute',
          bottom: 10,
          right: 10,
        }}
      /> */}
    </ImageBackground>
  );
};

export default Referral;

const styles = StyleSheet.create({
  BtnStyle: {
    backgroundColor: '#D6FFC9',
    width: '50%',
    alignItems: 'center',
    borderRadius: 10,
    padding: '2%',
  },
  MarginTop: {
    marginTop: 100,
  },
});
