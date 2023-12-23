import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const Home = () => {
  return (
    <View>
      <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
        <Cards
          setIsFlipped={setIsFlipped}
          isFlipped={isFlipped}
          onFlipComplete={onFlipComplete}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={toggleFlip}>
        <Text style={styles.buttonText}>Flip</Text>
      </TouchableOpacity>

      {isFlipped && (
        <View style={styles.congratsContainer}>
          <View style={styles.InnercongratsContainer}>
            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.randomNumberText}>You got {randomNumber}</Text>
            <TouchableOpacity
              style={styles.closeContainer}
              onPress={closeModal}>
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
