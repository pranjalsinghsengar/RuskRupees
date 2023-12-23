import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4} from 'uuid';

const Uuid = () => {
  const [uuid, setUUID] = useState(null);
  //   useEffect(() => {
  //     const fetchUUID = async () => {
  //       let storedUUID = await AsyncStorage.getItem('uuid');
  //       if (!storedUUID) {
  //         storedUUID = uuidv4();
  //         await AsyncStorage.setItem('uuid', storedUUID);
  //       }
  //       setUUID(storedUUID);
  //     };

  //     fetchUUID();
  //   }, []);
  const uid = uuidv4();
  console.log('uuid', uid );
  return (
    <View>
      <Text>{uuid}saaaaaaaaa</Text>
    </View>
  );
};

export default Uuid;

const styles = StyleSheet.create({});
