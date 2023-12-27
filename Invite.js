import {StyleSheet, Text, View} from 'react-native';
import React, {useContext} from 'react';
import {RuskContext} from './Context';

const Invite = () => {
  const {userInfo} = useContext(RuskContext);
  // console.log(userInfo, 'userInfo');
  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: 'white',
          // padding: 5,
          borderRadius: 15,
          width: '90%',
          flex: 1 / 4,
          padding: 15,
          borderColor: 'orange',
          borderWidth: 1,
        }}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{width: '100%'}}>
            <Text style={{fontSize: 30, color: 'orange', marginLeft: 50}}>
              Invite
            </Text>
          </View>
          <View>
            <Text style={{fontSize: 40, color: 'green'}}>
              {userInfo.inviteID}
            </Text>
          </View>
        </View>

        {/* <Text>Invite : {userInfo.inviteID}</Text> */}
      </View>
    </View>
  );
};

export default Invite;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 50,
  },
});
