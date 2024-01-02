import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
  View,
} from 'react-native';
import React from 'react';

const Sharring = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: 'Crome Download LInk',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };
  return (
    <TouchableOpacity onPress={onShare}>
      <Text>Share</Text>
    </TouchableOpacity>
  );
};

export default Sharring;

const styles = StyleSheet.create({});
