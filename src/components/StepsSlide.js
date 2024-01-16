import {Button, Linking, Modal, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Swiper from 'react-native-swiper';

const StepsSlide = ({showOnboarding, setShowOnboarding}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  //   let numericRupess = parseFloat(Rupess);

  const handleNext = async () => {
    // Logic to handle the next button click
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex === 2) {
      //   setWhichAppDownloaded(AppName);
      //   await Linking.openURL(Teenpatti);
      // setAppDownloadCoins(numericRupess);
      setShowOnboarding(false);
      setCurrentIndex(0);
      //   setTexting(true);
    }
  };
  const handleBack = () => {
    // Logic to handle the back button click
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      console.log(currentIndex);
    } else {
      setShowOnboarding(false);
    }
  };
  return (
    <Modal transparent={true} visible={showOnboarding} animationType="slide">
      <View
        style={styles.modalContainer}
        // onTouchCancel={() => setShowOnboarding(false)}
      >
        <View style={[styles.modalContent, {width: '80%', height: 450}]}>
          {/* <View style={styles.container}> */}
          <Swiper
        //   scrollToOverflowEnabled={false}
            loop={false}
            index={currentIndex}
            // showsButtons={true}
            showsPagination={true}>
            {/* Your three slides go here */}
            <View style={styles.slide}>
              <Text style={styles.english}>Download the APP</Text>
              <Text style={styles.hindi}>ऐप फ़ाइल डाउनलोड करें</Text>
              <></>
              <Text style={styles.english}>Install the APP</Text>
              <Text style={styles.hindi}>ऐप इंस्टॉल करें</Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.english}>
                Open the app and login with you mobile number
              </Text>
              <Text style={styles.hindi}>
                ऐप खोलें और अपने मोबाइल नंबर से लॉगइन करें
              </Text>
            </View>
            <View style={styles.slide}>
              <Text style={styles.english}>
                After complete the app profile the money will transfer in 18
                hour
              </Text>
              <Text style={styles.hindi}>
                ऐप प्रोफाइल पूरा करने के बाद 18 घंटे में पैसा ट्रांसफर हो जाएगा
              </Text>
            </View>
          </Swiper>

          <View style={styles.buttonContainer}>
            <Button
              title="Back"
              onPress={handleBack}
              //   disabled={currentIndex === 0}
            />
            {/* <Text>{`Slide ${currentIndex + 1}/3`}</Text> */}
            <Button
              title={currentIndex === 2 ? 'finish ' : 'Next'}
              onPress={handleNext}
              disabled={currentIndex === 3}
            />
          </View>
        </View>
      </View>
      {/* </View> */}
    </Modal>
  );
};

export default StepsSlide;

const styles = StyleSheet.create({
  english: {fontSize: 25, color: 'blue', fontWeight:'800', textAlign:'center'},
  hindi: {fontSize: 30, color: 'red',textAlign:'center'},
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
    width: '100%',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
  },
});
