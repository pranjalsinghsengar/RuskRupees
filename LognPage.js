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
import React, {useEffect, useState} from 'react';
import {FIREBASE_AUTH} from './fireConfig';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
// import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
  GoogleOneTapSignIn,
  statusCodes,
  type OneTapUser,
} from '@react-native-google-signin/google-signin';

// GoogleSignin.configure({
//   webClientId:
//     '744554475013-iejli0h4t7qhllcrmvj7gofdlgbdtliq.apps.googleusercontent.com',
// });

// import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const LognPage = ({setUserInfo}) => {
  // const Stack = createNativeStackNavigator();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '744554475013-iejli0h4t7qhllcrmvj7gofdlgbdtliq.apps.googleusercontent.com',
    });
  }, []);
  const handleGoogleSignIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      const Info = await GoogleSignin.signIn();
      const {idToken} = await GoogleSignin.signIn();

      setUserInfo({
        user: {
          email: Info.user.email,
          id: Info.user.id,
          givenName: Info.user.givenName,
          familyName: Info.user.familyName,
          photo: Info.user.photo,
          name: Info.user.name,
        },
      });

      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // return auth().signInWithCredential(googleCredential);
      // console.log(Info.user);
      // console.log({idToken});
      // Create a Google credential with the token
      // setState({userInfo});
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

    // Implement the logic for Google sign-in here
    // This might involve calling an authentication service or navigating to a Google sign-in page
    // console.log('Google Sign In Pressed');
  };

  // const auth = FIREBASE_AUTH;

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
