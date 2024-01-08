import {
  Button,
  Image,
  Linking,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useState} from 'react';
import OnboardingScreens from './OnboardingScreens';
import Swiper from 'react-native-swiper';
import {RuskContext} from './Context';

const DownloadCard = ({Sign,AppName, ImgSrc, isFlipped, Rupess, timer, Teenpatti}) => {
  const {setAppDownloadCoins, setWhichAppDownloaded} = useContext(RuskContext);
  const [Texting, setTexting] = useState(false);
  const handleDownloadPress = async () => {
    // const playStoreLink = {Teenpatti};
    // await Linking.openURL(Teenpatti);

    if (Texting === false) {
      setShowOnboarding(true);
    }
  };
  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  let numericRupess = parseFloat(Rupess);

  const handleNext = async () => {
    // Logic to handle the next button click
    console.log(currentIndex);
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === 2) {
      setWhichAppDownloaded(AppName)
      await Linking.openURL(Teenpatti);
      // setAppDownloadCoins(numericRupess);
      setShowOnboarding(false);
      setTexting(true);
    }
  };
  const handleBack = () => {
    // Logic to handle the back button click
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  return (
    <TouchableOpacity
      onPress={handleDownloadPress}
      style={{
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 10,
        backgroundColor: 'white',
        marginVertical: 5,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: 50,
          height: 50,
          // backgroundColor: 'red',
          borderRadius: 8,
          overflow: 'hidden',
        }}>
        <Image
          source={ImgSrc}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}>
        {Texting ? (
          <Text>Complete All steps</Text>
        ) : (
          <>
            <Text style={{fontSize: 30}}>
              {numericRupess}
              {Sign}
            </Text>
            {/*  */}
            {/* {timer !== null && timer < 0 ? ( */}
            <Image
              source={require('./assets/DownloadingUpdates.png')}
              style={{width: 40, height: '80%'}}
            />
          </>
        )}
        {/* ) : (
          <Text style={{fontSize: 30, color: 'green'}}>
            {timer < 5400000 ? formatTime(timer) : '30:00'}
          </Text>
        )} */}
      </View>
      <Modal transparent={true} visible={showOnboarding} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, {width: '80%', height: 450}]}>
            {/* <View style={styles.container}> */}
            <Swiper
              loop={false}
              index={currentIndex}
              showsButtons={false}
              showsPagination={false}>
              {/* Your three slides go here */}
              <View style={styles.slide}>
                <Text>Slide 1</Text>
              </View>
              <View style={styles.slide}>
                <Text>Slide 2</Text>
              </View>
              <View style={styles.slide}>
                <Text>Slide 3</Text>
              </View>
            </Swiper>

            <View style={styles.buttonContainer}>
              <Button
                title="Back"
                onPress={handleBack}
                disabled={currentIndex === 0}
              />
              {/* <Text>{`Slide ${currentIndex + 1}/3`}</Text> */}
              <Button
                title={currentIndex === 2 ? 'Download ' : 'Next'}
                onPress={handleNext}
                disabled={currentIndex === 3}
              />
            </View>
          </View>
        </View>
        {/* </View> */}
      </Modal>
    </TouchableOpacity>
  );
};

export default DownloadCard;

const styles = StyleSheet.create({
  container: {
    // flex: 1/2,
    justifyContent: 'center',
    alignItems: 'center',
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
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});
