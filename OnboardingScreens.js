import React, {useState} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import Swiper from 'react-native-swiper';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    // Logic to handle the next button click
    if (currentIndex < 2) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    // Logic to handle the back button click
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <View style={styles.container}>
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
        <Text>{`Slide ${currentIndex + 1}/3`}</Text>
        <Button
          title="Next"
          onPress={handleNext}
          disabled={currentIndex === 2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

export default Onboarding;
