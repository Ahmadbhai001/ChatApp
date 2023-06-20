import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SheetProvider} from 'react-native-actions-sheet';

const Settings = () => {
  return (
    <SheetProvider>
      <Text style={{color: 'black'}}>Hi, I am here.</Text>
    </SheetProvider>
  );
};

export default Settings;

const styles = StyleSheet.create({});
