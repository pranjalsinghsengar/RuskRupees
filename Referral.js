import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';

const Referral = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flex: 1 / 3, backgroundColor: 'red', borderRadius: 15}}>
        <Text>Referral</Text>
        <TextInput placeholder="Type Referral" />
      </View>
    </View>
  );
};

export default Referral;

const styles = StyleSheet.create({});
