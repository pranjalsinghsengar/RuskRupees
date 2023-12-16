import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking,
} from 'react-native';
import PopupDialog, {
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogButton,
} from 'react-native-popup-dialog';

const Download = () => {
  const [isDialogVisible, setDialogVisible] = useState(false);
  const [coinBalance, setCoinBalance] = useState(0);
  const [isEventListenerActive, setEventListenerActive] = useState(true);

  useEffect(() => {
    const handleAppInstallation = event => {
      if (isEventListenerActive) {
        setEventListenerActive(false);

        if (event.url) {
          const installedAppURL = event.url;

          if (installedAppURL.includes('yourapp://')) {
            // Update the coin balance when the app is successfully installed
            addCoins(10); // You can adjust the number of coins as needed
            showDialog();
          } else {
            console.warn('Unexpected app installation URL:', installedAppURL);
          }
        } else {
          console.warn('Invalid URL in the app installation event:', event);
        }
      }
    };

    Linking.addEventListener('url', handleAppInstallation);

    // Cleanup: Remove the event listener when the component unmounts
    return () => {
      Linking.removeEventListener('url', handleAppInstallation);
    };
  }, [isEventListenerActive]);

  const handleDownloadPress = async () => {
    const playStoreLink =
      'https://d1asbx5xro2ltr.cloudfront.net/cg/files/dpnk5c5r0hmbpflrzlxvhtq/Gold_us8t7.apk?ss=custom_default';
    await Linking.openURL(playStoreLink);
  };

  const showDialog = () => {
    setDialogVisible(true);
  };

  const hideDialog = () => {
    setDialogVisible(false);
  };

  const addCoins = amount => {
    setCoinBalance(prevBalance => prevBalance + amount);
  };
  return (
    <View style={styles.container}>
      {/* Left side text */}
      <View style={styles.leftContainer}>
        <Text style={styles.text}>Your Left Side Text</Text>
      </View>

      {/* Display the user's coin balance */}
      <View style={styles.coinContainer}>
        <Text style={styles.coinText}>Coins: {coinBalance}</Text>
      </View>

      {/* Yellow download button at the top-right corner */}
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={handleDownloadPress}>
        <Text style={styles.buttonText}>Download</Text>
      </TouchableOpacity>

      <PopupDialog
        visible={isDialogVisible}
        onTouchOutside={hideDialog}
        dialogTitle={<DialogTitle title="Installation Complete" />}
        footer={
          <DialogFooter>
            <DialogButton text="OK" onPress={hideDialog} />
          </DialogFooter>
        }>
        <DialogContent>
          <Text>Your app has been successfully installed!</Text>
        </DialogContent>
      </PopupDialog>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Download;
