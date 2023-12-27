// FlipCards.js
import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import Cards from './Cards';
import AppDownload from './AppDownload';
import {RuskContext} from './Context';

const FlipCards = ({navigation}) => {
  const {
    formatTime,
    userInfo,
    setUserInfo,
    currentTab,
    setCurrentTab,
    coinWallet,
    setCoinWallet,
    remainingTime,
    showCooldownModal,
    setShowCooldownModal,
    setLastClickTime,
    lastClickTime,
    setRemainingTime,
    isFlipped,
    setIsFlipped,
    randomNumber,
    setRandomNumber,
  } = useContext(RuskContext);

  // const [showModal, setShowModal] = useState(false);
  const [showCards, setshowCards] = useState(false);

  const toggleFlip = () => {
    const currentTime = new Date().getTime();
    if (currentTime - lastClickTime > 40000) {
      // If more than 1.5 hours have passed since the last click
      setIsFlipped(!isFlipped);
      setTimeout(() => {
        setshowCards(true);
      }, 500);
      setLastClickTime(currentTime);
      setRemainingTime(null);
    } else {
      // Display a message or take appropriate action for cooldown period
      setShowCooldownModal(true);
      console.log('You need to wait for the cooldown period to end.');
    }
  };

  const closeModal = () => {
    setshowCards(false);
    // setShowModal(false);
    setTimeout(() => {
      setIsFlipped(false);
      setRemainingTime(40000); // 1.5 hours in milliseconds
      setRandomNumber(0);
    }, 700);
  };

  useEffect(() => {
    if (isFlipped) {
      // Generate a random number between 1 and 10
      const randomNum = Math.floor(Math.random() * 10) + 1;
      setRandomNumber(randomNum);
    }
  }, [isFlipped]);

  // useEffect(() => {
  //   setCoinWallet(prevCoins => prevCoins + randomNumber);
  // }, [randomNumber]);
  let numericRandomNumber = parseFloat(randomNumber);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', gap: 15}}>
          {/* Youtube Link */}
          <TouchableOpacity>
            <Image
              source={require('./assets/invite.png')}
              style={styles.InviteImg}
            />
          </TouchableOpacity>

          {/* InviteLink */}

          <TouchableOpacity onPress={() => setCurrentTab(2)}>
            <Image
              source={require('./assets/invite.png')}
              style={styles.InviteImg}
            />
          </TouchableOpacity>
        </View>
        <Image
          source={require('./assets/Frame766.png')}
          style={{width: 356, height: 80, marginTop: 10}}
        />

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            position: 'relative',
          }}>
          {/* <Image
            source={require('./assets/Frame765.png')}
            style={{
              width: '100%',
              height: 'auto',
              marginTop: 10,
              position: 'absolute',
            }}
          /> */}
          <Cards setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
          <Cards setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
          <Cards setIsFlipped={setIsFlipped} isFlipped={isFlipped} />
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={!isFlipped ? toggleFlip : null}>
          <Text style={styles.buttonText}>
            Flip{' '}
            {remainingTime !== null && remainingTime > 0 && (
              <Text>in: {formatTime(remainingTime)}</Text>
            )}
          </Text>
        </TouchableOpacity>

        {showCards && (
          <View style={styles.congratsContainer}>
            <View style={styles.InnercongratsContainer}>
              <Text style={styles.congratsText}>Congratulations!</Text>
              <Text style={styles.randomNumberText}>
                You got {randomNumber}
              </Text>
              <TouchableOpacity
                style={styles.closeContainer}
                onPress={closeModal}>
                <Text>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
      <Text style={{fontSize: 25}}>Download app to earn more... </Text>
      <AppDownload
        isFlipped={isFlipped}
        remainingTime={remainingTime}
        setCoinWallet={setCoinWallet}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // margin: 30,
    padding: 10,
  },
  InviteImg: {
    width: 100,
    height: 150,
  },
  heading: {
    marginBottom: 30,
    color: 'green',
    fontSize: 30,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  modalCloseButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  congratsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:""
  },
  InnercongratsContainer: {
    backgroundColor: '#efeff0',
    paddingVertical: 200,
    paddingHorizontal: 70,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  congratsText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'red',
  },
  randomNumberText: {
    fontSize: 18,
    color: 'red',
  },
  closeContainer: {
    position: 'absolute',
    bottom: 50,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FlipCards;
