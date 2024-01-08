import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  Image,
  Pressable,
  Alert,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// import {
//   getAuth,
//   linkWithCredential,
//   signInWithPopup,
//   GoogleAuthProvider,
// } from 'firebase/auth';

// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';

import {
  GoogleSignin,
  GoogleSigninButton,
  GoogleOneTapSignIn,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {RuskContext} from './Context';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import FIREBASE_AUTH from './src/firebase/fireConfig';
import {borderRadius} from '@mui/system';
// import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

// GoogleSignin.configure({
//   webClientId:
//     '744554475013-iejli0h4t7qhllcrmvj7gofdlgbdtliq.apps.googleusercontent.com',
// });

const LognPage = ({navigation}) => {
  // const Stack = createNativeStackNavigator();
  const {
    userInfo,
    coinWallet,
    setUserInfo,
    updateUser,
    InviteId,
    userUID,
    setUserUID,
  } = useContext(RuskContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/contacts.readonly'],
      webClientId:
        '744554475013-iejli0h4t7qhllcrmvj7gofdlgbdtliq.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  const [loadingText, setloadingText] = useState(null);

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken, ...Info} = await GoogleSignin.signIn(); // Use object destructuring to get idToken and the rest of the Info
      console.log('Step 1 Done');
      setloadingText('Fetching Your data...');

      // // Create a Google credential with the token
      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken,
      );
      console.log('Step 2 Done');

      // // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      console.log('Step 3 Done');

      // // Access the UID from the userCredential
      const uid = userCredential.user.uid;
      console.log('Step 4 Done - UID', uid);

      const userSnapshot = await database().ref(`Users/${uid}`).once('value');
      const userExists = await userSnapshot.val();
      console.log('Step 5 Done 0- userExists', userExists);
      // Alert.alert('userExists');
      let userData;
      if (!userExists) {
        console.log('userExists');

        await database().ref(`Users/${uid}`).set({
          email: Info.user.email,
          id: Info.user.id,
          uid: uid,
          givenName: Info.user.givenName,
          familyName: Info.user.familyName,
          photo: Info.user.photo,
          name: Info.user.name,
          inviteID: InviteId,
        });
        await database().ref(`Users/${uid}/Wallet`).set({
          coins: coinWallet,
        });
        await database()
          .ref(`Users/${uid}/InviteBy`)
          .set({inviteStatus: false});
        // Set userData for updating local state
        userData = {
          email: Info.user.email,
          id: Info.user.id,
          uid: uid,
          givenName: Info.user.givenName,
          familyName: Info.user.familyName,
          photo: Info.user.photo,
          name: Info.user.name,
        };
      } else {
        // If the user already exists, update the existing record
        await database().ref(`Users/${uid}`).update({
          email: Info.user.email,
          id: Info.user.id,
          uid: uid,
          givenName: Info.user.givenName,
          familyName: Info.user.familyName,
          photo: Info.user.photo,
          name: Info.user.name,
          //   // inviteID: InviteId,
        });

        // Fetch the updated user data from the database
        // userData = (await database().ref(`Users/${uid}`).once('value')).val();
      }
      setUserUID(uid);
      console.log('Start Navigating...');
      setloadingText('Almost Done');

      console.log('Google Sign-In successful');
      console.log('googleCredential ', googleCredential);
      console.log('>>>uid ', uid);
      console.log('>>>user ', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        Alert.alert('Something went wrong', error.toString());
        console.log(error);
        this.setState({
          error,
        });
      }
    }

    if (userUID) {
      await setloadingText('Done');
      setTimeout(() => {
        setloadingText(null);
      }, 5000);
    } else {
      setloadingText(null);
    }
  };

  // const provider = new GoogleAuthProvider();
  // const auth = FIREBASE_AUTH;
  // const loginUsingWeb = async () => {
  //   try {
  //     // Step 1: User tries to sign in using Google.
  //     let result = await signInWithPopup(getAuth(), new GoogleAuthProvider());
  //   } catch (error) {
  //     // Step 2: User's email already exists.
  //     if (error.code === 'auth/account-exists-with-different-credential') {
  //       // The pending Google credential.
  //       let pendingCred = error.credential;

  //       // Step 3: Save the pending credential in temporary storage,

  //       // Step 4: Let the user know that they already have an account
  //       // but with a different provider, and let them choose another
  //       // sign-in method.
  //     }
  //   }

  //   // ...

  //   try {
  //     // Step 5: Sign the user in using their chosen method.
  //     let result = await signInWithPopup(getAuth(), userSelectedProvider);

  //     // Step 6: Link to the Google credential.
  //     // TODO: implement `retrievePendingCred` for your app.
  //     let pendingCred = retrievePendingCred();

  //     if (pendingCred !== null) {
  //       // As you have access to the pending credential, you can directly call the
  //       // link method.
  //       let user = await linkWithCredential(result.user, pendingCred);
  //     }

  //     // Step 7: Continue to app.
  //   } catch (error) {
  //     // ...
  //   }
  // };

  return (
    <View
      style={{height: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <ImageBackground
        source={require('./assets/RuskRupees3.png')} // Replace with the actual path to your background image
        style={styles.backgroundImage}>
        <View>
          <Image
            source={require('./assets/LOGO2.png')}
            style={{
              height: 100,
              width: 200,
              alignSelf: 'center', // Align the image horizontally in the center
              marginTop: 60, // Set top margin to 50 pixels
            }}
          />
        </View>

        <View style={styles.container}>
          <View style={styles.formContainer}>
            {/* Email input field */}
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#000"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={text => setEmail(text)}
            />

            {/* Password input field */}
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#000"
              secureTextEntry
              autoCapitalize="none"
              value={password}
              onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.buttonText}>SignIn</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>Or</Text>

            {/* Sign In with Google button */}
            {/* <TouchableOpacity
              style={styles.googleSignInButton}
              onPress={
                () => handleGoogleSignIn()
                // .then(() => setsuccessFully(true))
              }>
              <Image
                source={require('./assets/ic_launcher_round.png')} // Replace with the actual path to your Google icon
                style={styles.googleIcon}
              />
              <Text style={styles.buttonText}>Sign In with Google</Text>
            </TouchableOpacity> */}
            <View
              style={{
                backgroundColor: '#3498db',
                padding: 8,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {loadingText === null ? (
                <GoogleSigninButton
                  size={GoogleSigninButton.Size.Wide}
                  color={GoogleSigninButton.Color.Dark}
                  // backgroundColor={GoogleSigninButton.backgroundColor.Dark}
                  onPress={
                    // () => handleGoogleSignIn()
                    () => handleGoogleSignIn()
                    // .then(() => setsuccessFully(true))
                  }
                />
              ) : (
                <Text style={{fontSize: 20, color: 'white'}}>
                  {loadingText}
                </Text>
              )}
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default LognPage;

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch' depending on your image's aspect ratio
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    // backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  signInButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    marginVertical: 10,
  },
  input: {
    height: 40,
    // borderColor: 'gray',
    // borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Adjust the opacity as needed
  },
  googleSignInButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dd4b39', // Google red color
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
