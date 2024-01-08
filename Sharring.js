import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
  View,
  Image,
  ImageBackground,
} from 'react-native';
import React from 'react';

const Sharring = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Crome Download LInk',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <ImageBackground
      source={require('./assets/RuskRupees3.png')} // Replace with the actual path to your background image
      style={styles.container}>
      <TouchableOpacity style={styles.ShareContainer} onPress={onShare}>
        <ImageBackground
          source={require('./assets/inviteCard/pexels-eva-bronzini-7605209.jpg')} // Replace with the actual path to your background image
        >
          <Image
            source={require('./assets/LOGO2.png')}
            style={{
              width: 100,
              height: 50,
              marginHorizontal: 25,
              marginTop: 15,
            }}
          />
          <View
            style={{
              // width: '100%',
              padding: 40,
              gap: 10,
              alignItems: 'center',
              flexDirection: 'row-reverse',
              justifyContent: 'space-between',
            }}>
            <Image
              source={require('./assets/appIcon/ic_launchercopy.png')}
              style={{width: 100, height: 100}}
            />
            <View style={{width: '70%'}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '800',
                  fontSize: 22,
                }}>
                Share Your App NOW
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </ImageBackground>
  );
};

export default Sharring;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ShareContainer: {
    // flex: 1 / 4,
    width: '80%',
    // borderWidth: 1,
    // padding: 100,
    backgroundColor: 'white',
    overflow: 'hidden',
    borderRadius: 20,
  },
});
