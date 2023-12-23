import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import FlipCards from './FlipCards';

const TabBar = ({setCoinWallet}) => {

  return (
    <View style={{flex: 1}}>
      {currentTab == 1 && (
        <View>
          <FlipCards setCoinWallet={setCoinWallet} />
        </View>
      )}
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({});
