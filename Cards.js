// Cards.js
import React, {useState, useEffect, useContext} from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import FlipCard from 'react-native-flip-card';
import {RuskContext} from './Context';

const Cards = () => {
  const {isFlipped} = useContext(RuskContext);

  return (
    <FlipCard
      style={[styles.card, styles.shadow]}
      friction={6}
      perspective={1000}
      flipHorizontal={true}
      flipVertical={false}
      flip={isFlipped}
      clickable={false}
      //   onFlipEnd={() => onFlipComplete && onFlipComplete(randomNumber)}
    >
      {/* Front */}
      <View style={styles.imageContainer}>
        <Image source={require('./assets/Frame769.png')} style={styles.image} />
      </View>

      {/* Back */}
      <View style={styles.imageContainer}>
        <Image source={require('./assets/Frame770.png')} style={styles.image} />
        {/* {isFlipped && (
          <View style={styles.congratsContainer}>
            <Text style={styles.congratsText}>Congratulations!</Text>
            <Text style={styles.randomNumberText}>You got {randomNumber}</Text>
          </View>
        )} */}
      </View>
    </FlipCard>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    height: 200,

    // flex: 1,
    borderRadius: 10,
    // backgroundColor: 'grey',
    // overflow: 'hidden',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
});

export default Cards;
