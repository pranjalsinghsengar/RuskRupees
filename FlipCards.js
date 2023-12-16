import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FlipCard from 'react-native-flip-card';

const FlipCards = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <FlipCard style={{width: 200, height: 300}}>
        {/* Front side content */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'blue',
          }}>
          <Text>Card 1 Front</Text>
        </View>
        {/* Back side content */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'red',
          }}>
          <Text>Card 1 Back</Text>
        </View>
      </FlipCard>

      {/* Repeat the above structure for Card 2 and Card 3 */}
    </View>
  );
};

export default FlipCards;

const styles = StyleSheet.create({});
