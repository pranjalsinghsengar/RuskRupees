import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Download from './Download';
import DownloadCard from './DownloadCard';
import OnboardingScreens from './OnboardingScreens';

const AppDownload = ({isFlipped, remainingTime, setCoinWallet}) => {
  const [timer, settimer] = useState(null);
  const [downloadDone, setdownloadDone] = useState(false);

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

  // const handleDownloadPress = async () => {
  //   // Open the Onboarding card
  //   setShowOnboarding(true);

  //   // Additional logic if needed
  // };

  // const handleCloseOnboarding = () => {
  //   // Close the Onboarding card
  //   setShowOnboarding(false);
  // };
  return (
    <View>
      {/* <Text>sdfsdf{formatTime(timer)}</Text> */}
      <DownloadCard
        isFlipped={isFlipped}
        Rupess="3.2₹"
        timer={timer}
        formatTime={formatTime}
        Teenpatti="https://h25.in/gold/us8t7"
        // setShowOnboarding={setShowOnboarding}
      /> 
      
    </View>
  );
};

export default AppDownload;

const styles = StyleSheet.create({});
