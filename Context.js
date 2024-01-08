import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Add this line to your `index.js`
import 'react-native-get-random-values';
import {v4 as uuid} from 'uuid';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';

const RuskContext = React.createContext();

const RuskProvider = ({children}) => {
  const [coinWallet, setCoinWallet] = useState(0);
  const [currentTab, setCurrentTab] = useState(1);
  const [remainingTime, setRemainingTime] = useState(null);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showCooldownModal, setShowCooldownModal] = useState(false);
  const [InviteId, setInviteId] = useState(null);
  const [VerifyRef, setVerifyRef] = useState('Verify');
  useEffect(() => {
    const generatedUUID = uuid();
    // Split the UUID into parts
    const parts = generatedUUID.split('-');
    // Log the parts
    const ID = parts[0];
    setInviteId(ID);
  }, []);
  // console.log('UUID:', generatedUUID);
  // console.log('Parts:', parts[0]);
  // console.log('Version:', parts[2][0]);

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
  const [userInfo, setUserInfo] = useState(null);

  // ===========================================================================================================================
  // useEffect(() => {
  //   // Load user information from AsyncStorage on component mount
  //   const loadUserInfo = async () => {
  //     try {
  //       const storedUserInfo = await AsyncStorage.getItem('userInfo');
  //       if (storedUserInfo) {
  //         setUserInfo(JSON.parse(storedUserInfo));
  //       }
  //     } catch (error) {
  //       console.error(
  //         'Error loading user information from AsyncStorage',
  //         error,
  //       );
  //     }
  //   };

  //   loadUserInfo();
  // }, []);

  // const updateUser = async newUserInfo => {
  //   setUserInfo(newUserInfo);
  //   try {
  //     // Save user information to AsyncStorage when it changes
  //     await AsyncStorage.setItem('userInfo', JSON.stringify(newUserInfo));
  //   } catch (error) {
  //     console.error('Error saving user information to AsyncStorage', error);
  //   }
  // };
  // useEffect(() => {
  //   console.log('User information changed:', userInfo);
  // }, [userInfo]);
  // const AboutUser = JSON.stringify(userInfo);

  // console.log('>>>>>>>>AboutUserAboutUserAboutUser', AboutUser);
  // ===========================================================================================================================
  const [Openprofile, setOpenprofile] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [userUID, setUserUID] = useState(null);

  // const isSignedIn = async () => {
  //   try {
  //     const isSignedIn = await GoogleSignin.isSignedIn();

  //     if (isSignedIn && !userInfo) {
  //       // If the user is signed in but userInfo is not present, fetch user info
  //       const Info = await GoogleSignin.signIn();

  //       // Update user information in the context
  //       updateUser({
  //         email: Info.user.email,
  //         id: Info.user.id,
  //         uid: Info.user.uid, // Assuming user UID is available from Google Sign-In
  //         givenName: Info.user.givenName,
  //         familyName: Info.user.familyName,
  //         photo: Info.user.photo,
  //         name: Info.user.name,
  //       });
  //     }

  //     // setState({isLoginScreenPresented: !isSignedIn});
  //   } catch (error) {
  //     // Handle errors
  //     console.error('Error checking Google Sign-In status', error);
  //   }
  // };

  // Call isSignedIn when the component mounts or as needed
  // useEffect(() => {
  //   isSignedIn();
  // }, [!userInfo]); // Empty dependency array to run it once when the component mounts

  // =================================================================================================================================================
  // Esko abhi esliy comment kiya hai kyu ki mai usko same login wale DOC ko hi follow krunga not another ---
  // pr mughe usse UID mil jati hai pr don't i have better solution

  // function onAuthStateChanged(user) {
  //   if (user) {
  //     setUser(user);
  //     const userRef = database().ref(`Users/${user.uid}`);

  //     // Set user data
  //     userRef
  //       .set({
  //         displayName: user.displayName,
  //         email: user.email,
  //         emailVerified: user.emailVerified,
  //         phoneNumber: user.phoneNumber,
  //         photoURL: user.photoURL,
  //         uid: user.uid,
  //       })
  //       .then(() => {
  //         //   // Assuming rafrealID is defined somewhere
  //         const refRef = database().ref(`Users/${user.uid}/ref`);
  //         refRef.once('value').then(snapshot => {
  //           const refValue = snapshot.val();
  //           if (refValue === null || refValue === undefined) {
  //             //       // Set reference ID if empty
  //             return refRef.set({
  //               Ref_ID: rafrealID,
  //             });
  //           }
  //           // else {
  //           //       setRefrenceId(refValue.Ref_ID); // Use Ref_ID consistently
  //           //       console.log('>>>ReferenceId', refValue.Ref_ID);
  //           //     }
  //           //     console.log('>>>refValue', refValue);
  //         });
  //         //   // Set reference ID
  //         //   // return refRef.set({
  //         //   //   Ref_ID: rafrealID,
  //         //   // });
  //       })
  //       // .then(() => {
  //       //   // Fetch reference ID from the database
  //       //   const databaseRef = database().ref(`Users/${user.uid}/ref`);

  //       //   databaseRef
  //       //     .once('value')
  //       //     .then(snapshot => {
  //       //       // Check if the snapshot has a value
  //       //       if (snapshot.exists()) {
  //       //         const Refrence_Id = snapshot.val();
  //       //         setRefrenceId(Refrence_Id);
  //       //         console.log('ReferenceId', RefrenceId);
  //       //       } else {
  //       //         console.log('Reference ID not found.');
  //       //       }
  //       //     })
  //       //     .catch(error => {
  //       //       console.error('Error fetching data:', error);
  //       //     });
  //       // })
  //       .catch(error => {
  //         console.error('Error setting user data:', error);
  //       });
  //   }

  //   if (initializing) setInitializing(false);
  // }

  // useEffect(() => {
  //   if (userInfo && userInfo.user) {
  //     const Data = database().ref(`Users/${userInfo.user.uid}`);
  //     Data.set(userInfo.user);
  //     // console.log('====>>>>refRef ', refRef);
  //   }
  // }, [userInfo]);

  // CoinWallet
  // useEffect(() => {
  //   if (userInfo && coinWallet) {
  //     const Data = database().ref(`Users/${userInfo.user.uid}/Wallet`);
  //     Data.set({Coins: coinWallet});
  //     // console.log('====>>>>refRef ', refRef);
  //   }
  // }, [coinWallet]);

  //     refRef.once('value').then(snapshot => {
  //       const refValue = snapshot.val();
  //       setRefrenceId(refValue.Ref_ID); // Use Ref_ID consistently
  //       console.log('>>>ReferenceId', refValue.Ref_ID);

  //       console.log('>>>refValue', refValue);
  //     });
  //   }
  // }, [RefrenceId === null || RefrenceId == undefined]);

  // console.log('RefrenceId', RefrenceId);

  // useEffect(() => {
  //   const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  //   return subscriber; // unsubscribe on unmount
  // }, []);

  // if (initializing) return null;
  // =================================================================================================================================================

  // console.log('userChanged ', user);
  const [randomNumber, setRandomNumber] = useState(0);
  const [AppDownloadCoins, setAppDownloadCoins] = useState(0);
  const [WhichAppDownloaded, setWhichAppDownloaded] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    if (userUID) {
      database()
        .ref(`Users/${userUID}`)
        .on('value', snapshot => {
          const dataFetch = snapshot.val();
          console.log(
            '======>>>>  inviteStatus ',
            dataFetch && dataFetch.InviteBy.inviteStatus,
          );
          // if (dataFetch && dataFetch.InviteBy === null) {
          //   navigation.navigate('Referral');
          // } else {
          dataFetch && dataFetch.InviteBy.inviteStatus === true
            ? navigation.navigate('Window')
            : navigation.navigate('Referral');
          // }
        });
    }
  }, [userUID, navigation]);

  const currentTime =  new Date().getTime();

  useEffect(() => {
    // console.log('Empty UserInfo Running');
    if (userUID) {
      database()
        .ref(`Users/${userUID}`)
        .on('value', snapshot => {
          const dataFetch = snapshot.val();
          setUserInfo(dataFetch);
          setCoinWallet(dataFetch.Wallet.coins);

        });
      console.log('ON runnning ');

      // {
      //   userInfo.InviteBy === null
      //     ? navigation.navigate('Window')
      //     : navigation.navigate('Referral');
      // }
      console.log('WhichAppDownloaded', WhichAppDownloaded);

      if (randomNumber > 0 || AppDownloadCoins > 0 || WhichAppDownloaded) {
        let numericCoinWallet = parseFloat(coinWallet);
        let numericRandomNumber = parseFloat(randomNumber);
        let numericAppDownloadCoins = parseFloat(AppDownloadCoins);

        let UpdateCoins =
          numericCoinWallet + numericRandomNumber + numericAppDownloadCoins;

        // Specify the number of decimal places you want, for example, 2
        let roundedUpdateCoins = UpdateCoins.toFixed(2);

        // Convert it back to a floating-point number if needed
        let finalUpdateCoins = parseFloat(roundedUpdateCoins);

        // Now finalUpdateCoins contains the rounded-off value
        database().ref(`Users/${userUID}/Wallet`).update({
          coins: finalUpdateCoins,
        });
        database().ref(`Users/${userUID}/AppDownload`).push({
          Apps: WhichAppDownloaded,
          timestamp: currentTime,
        });
        console.log(
          'UpdateCoins',
          finalUpdateCoins,
          'AppDownloadCoins ',
          AppDownloadCoins,
        );
        console.log('CoinWallet', numericCoinWallet);
        console.log(
          'RandomNumber',
          numericRandomNumber,
          'AppDownloadCoins',
          numericAppDownloadCoins,
        );
        console.log('Updated Coins', finalUpdateCoins);
        console.log('updated Coins Done');
        // console.log()
        console.log('WhichAppDownloaded', WhichAppDownloaded);

        // Doing NulL
        setAppDownloadCoins(0);
        setWhichAppDownloaded('');
      }
      return () => database().ref(`Users/${userUID}`).off('value');
    }
  }, [userUID, randomNumber, AppDownloadCoins, WhichAppDownloaded]);

  // console.log('userUID', userUID);
  // console.log('=>userInfo', userInfo);
  console.log('>>>>>CoinWallet', userInfo && userInfo.Wallet.coins);
  console.log(
    'RandomNumber ',
    randomNumber,
    'AppDownloadCoins ',
    AppDownloadCoins,
  );

  //  Save the Update the Coin when it Fliped

  // useEffect(() => {});

  const timestamp = 1704572325850;
const date = new Date(timestamp);

console.log("date", date);



  return (
    <RuskContext.Provider
      value={{
        formatTime,
        userInfo,
        setUserInfo,
        coinWallet,
        setCoinWallet,
        currentTab,
        setCurrentTab,
        remainingTime,
        setRemainingTime,
        lastClickTime,
        setLastClickTime,
        showCooldownModal,
        setShowCooldownModal,
        Openprofile,
        setOpenprofile,
        isFlipped,
        setIsFlipped,
        userUID,
        setUserUID,
        InviteId,
        setInviteId,
        randomNumber,
        setRandomNumber,
        // updateUser,
        AppDownloadCoins,
        setAppDownloadCoins,
        VerifyRef,
        setVerifyRef,
        WhichAppDownloaded,
        setWhichAppDownloaded,
      }}>
      {children}
    </RuskContext.Provider>
  );
};

export {RuskContext, RuskProvider};
