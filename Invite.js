import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {RuskContext} from './Context';

const Invite = () => {
  const {RefrenceId} = useContext(RuskContext);
  console.log(RefrenceId , "RefrenceId")
  return (
    <View>
      <Text>Invite : {RefrenceId}</Text>
    </View>
  );
};

export default Invite;

const styles = StyleSheet.create({});
