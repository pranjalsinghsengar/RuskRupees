import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import Download from './Download';
import DownloadCard from './DownloadCard';
import OnboardingScreens from './OnboardingScreens';
import {RuskContext} from './Context';

const AppDownload = () => {
  const {isFlipped, remainingTime,setAppDownloadCoins} = useContext(RuskContext);

  const [timer, settimer] = useState(null);

  useEffect(() => {
    if (remainingTime !== null) {
      const t = remainingTime - 5100000;
      settimer(t);
    }
  }, [remainingTime]);
  //   console.log(timer)

  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const PayRupess = 3.2

  let numericRupess = parseFloat(PayRupess);

  const moneyHandler = () => {
    setAppDownloadCoins(numericRupess);
  };

  // const handleDownloadPress = async () => {
  //   // Open the Onboarding card
  //   setShowOnboarding(true);

  //   // Additional logic if needed
  // };

  // const handleCloseOnboarding = () => {
  //   // Close the Onboarding card
  //   setShowOnboarding(false);
  // };
  const teenpatti_IMAGE = require('./assets/AppImages/teenpatti.jpg');
  const TeenpattiMaster_IMAGE = require('./assets/AppImages/TeenpattiMaster.jpg');
  const TRURUS_IMAGE = require('./assets/AppImages/TRURUS.jpg');

  return (
    <View>
      {/* <Text>sdfsdf{formatTime(timer)}</Text> */}
      <DownloadCard
        isFlipped={isFlipped}
        Rupess={PayRupess}
        Sign="₹"
        timer={timer}
        formatTime={formatTime}
        Teenpatti="https://h25.in/gold/us8t7"
        ImgSrc={teenpatti_IMAGE}
        AppName="teenpatti"
        // setShowOnboarding={setShowOnboarding}
      />
      <DownloadCard
        isFlipped={isFlipped}
        Rupess={PayRupess + 1}

        Sign="₹"
        timer={timer}
        formatTime={formatTime}
        Teenpatti="https://h27.in/m/us8t7"
        ImgSrc={TeenpattiMaster_IMAGE}
        AppName="teenpatti Master"
        // setShowOnboarding={setShowOnboarding}
      />
      <DownloadCard
        isFlipped={isFlipped}
        Rupess={PayRupess - 0.5}

        Sign="₹"
        timer={timer}
        formatTime={formatTime}
        Teenpatti="https://h25.in/gold/us8t7"
        ImgSrc={TRURUS_IMAGE}
        AppName="taurus"

        // setShowOnboarding={setShowOnboarding}
      />
      <View style={{alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            padding: 15,
            paddingHorizontal: 40,
            backgroundColor: 'green',
            borderRadius: 15,
            marginTop: 10,
          }}
          onPress={moneyHandler}>
          <Text style={{color: 'white', fontWeight: '600', fontSize: 20}}>
            Steps
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AppDownload;

const styles = StyleSheet.create({});
