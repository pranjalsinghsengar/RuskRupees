import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  TextInput,
  Image,
  Pressable,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {FIREBASE_AUTH} from './fireConfig';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
// import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  GoogleOneTapSignIn,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {RuskContext} from './Context';
import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

// import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
// import {signInWithPopup, GoogleAuthProvider} from 'firebase/auth';

// GoogleSignin.configure({
//   webClientId:
//     '744554475013-iejli0h4t7qhllcrmvj7gofdlgbdtliq.apps.googleusercontent.com',
// });

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LognPage = ({navigation}) => {
  // const Stack = createNativeStackNavigator();
  const {userInfo, coinWallet, setUserInfo, updateUser, InviteId, setUserUID} =
    useContext(RuskContext);

  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '744554475013-iejli0h4t7qhllcrmvj7gofdlgbdtliq.apps.googleusercontent.com',
    });
  }, []);

  // const handleGoogleSignIn = async () => {
  //   await signInWithPopup(firebseAuth, provider)
  //     .then(result => {
  //       // This gives you a Google Access Token. You can use it to access the Google API.
  //       const credential = GoogleAuthProvider.credentialFromResult(result);
  //       const token = credential.accessToken;
  //       // The signed-in user info.
  //       const user = result.user;
  //       if (user) {
  //         setUserInfo(user);
  //         navigation.navigate('Window');
  //       }

  //       // IdP data available using getAdditionalUserInfo(result)
  //       // ...
  //     })
  //     .catch(error => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.customData.email;
  //       // The AuthCredential type that was used.
  //       const credential = GoogleAuthProvider.credentialFromError(error);
  //       // ...
  //     });
  // };

  // const handle = () => {
  //   navigation.navigate('Window');
  // };

  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken, ...Info} = await GoogleSignin.signIn(); // Use object destructuring to get idToken and the rest of the Info
      console.log('Step 1 Done');

      // Create a Google credential with the token
      const googleCredential = await auth.GoogleAuthProvider.credential(
        idToken,
      );
      console.log('Step 2 Done');

      // Sign-in the user with the credential
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      console.log('Step 3 Done');

      // Access the UID from the userCredential
      const uid = userCredential.user.uid;
      console.log('Step 4 Done - UID', uid);

      const userSnapshot = await database().ref(`Users/${uid}`).once('value');
      const userExists = await userSnapshot.val();
      console.log('Step 5 Done 0- userExists', userExists);

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

      navigation.navigate('Referral');
      // console.log('Google Sign-In successful');
      // console.log('googleCredential ', googleCredential);
      // console.log('>>>uid ', uid);
      // console.log('>>>user ', userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  // useEffect(() => {
  //   navigation.navigate('Window');
  // }, [userInfo]);

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

            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              color={GoogleSigninButton.Color.Dark}
              onPress={
                () => handleGoogleSignIn()
                // .then(() => setsuccessFully(true))
              }
            />
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
