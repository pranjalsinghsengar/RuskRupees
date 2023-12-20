import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import FlipCard from 'react-native-flip-card';

const FlipCards = () => {
  const [card1Flipped, setCard1Flipped] = useState(false);
  const [walletCoins, setWalletCoins] = useState(0);

  // const frontAnimatedStyle = useAnimatedStyle(() => {
  //   const spinVal = interpolate(spin.value, [0, 1], [0, 180]);
  //   return {
  //     transform: [
  //       {
  //         rotateY: withTiming(`${spinVal}deg`, { duration: 500 }),
  //       },
  //     ],
  //   };
  // }, []);
  const spin = useSharedValue(0);

  const cardRefs = [useRef(), useRef()]; // Add refs for each card

  const flipCardHandler = (cardNumber, index) => {
    spin.value = withSpring(spin.value === 0 ? 180 : 0);

    // Access the Animated.View component using refs and call the flip method
    cardRefs[index].current.flip();

    // Show the value of the clicked card in an alert
    Alert.alert(`Card ${cardNumber} clicked`);
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = spin.value;
    return {
      transform: [{rotateY: `${spinVal}deg`}],
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const spinVal = spin.value;
    return {
      transform: [{rotateY: `${spinVal + 180}deg`}],
    };
  });
  return (
    <View style={styles.container}>
      <View style={styles.walletContainer}>
        <Text style={styles.walletText}>Coins:</Text>
        <Text style={styles.walletText}>{walletCoins}</Text>
      </View>

      <View style={styles.cardsContainer}>
        <Animated.View style={[styles.front, frontAnimatedStyle]}>
          <Text>Front View</Text>
        </Animated.View>
        <Animated.View style={[styles.back, backAnimatedStyle]}>
          <Text>Back View</Text>
        </Animated.View>
      </View>

      {/* <View style={styles.cardsContainer}>
        <Animated.View style={styles.front}>
          <Text>Front View</Text>
        </Animated.View>
        <Animated.View style={styles.back}>
          <Text>Back View</Text>
        </Animated.View>
      </View> */}
    </View>
  );
};

export default FlipCards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  front: {
    height: 400,
    width: 250,
    backgroundColor: '#D8D9CF',
    borderRadius: 16,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    height: 400,
    width: 250,
    backgroundColor: '#FF8787',
    borderRadius: 16,
    backfaceVisibility: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },

  walletContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletText: {
    marginRight: 5,
  },
  cardsContainer: {
    width: '85%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  flipCardContainer: {
    height: 300,
    // backgroundColor: 'green',
    borderRadius: 10,
  },
  frontCardDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    borderRadius: 15,
  },
  backCardDetails: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 15,
  },
});
