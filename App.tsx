import React, {useState, useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import FlipCards from './FlipCards';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar />
      <FlipCards />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  leftContainer: {
    flex: 1,
  },
  coinContainer: {
    alignItems: 'flex-end',
    marginRight: 10,
  },
  coinText: {
    fontSize: 18,
    fontWeight: '600',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  downloadButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
    fontWeight: '600',
  },
});

export default App;
