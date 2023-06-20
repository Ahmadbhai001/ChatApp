import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import Loader from './Loader';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  //Login handlers
  const handleLogin = () => {
    setVisible(true);
    firestore()
      .collection('users')
      // Filter results
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs !== []) {
          console.log(JSON.stringify(res.docs[0].data()));
          goToNext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId,
          );
        } else {
          Alert.alert('User not found');
        }
      })
      .catch(err => {
        setVisible(false);
        console.log(err);
        Alert.alert('user not found');
      });
  };
  const goToNext = async (name, email, userId) => {
    try {
      await AsyncStorage.setItem('NAME', name);
      await AsyncStorage.setItem('EMAIL', email);
      await AsyncStorage.setItem('USERID', userId);
      navigation.navigate('Main')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainBody}>
      <View style={{flex: 1}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../assets/Logo.jpg')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'cover',
              margin: 10,
            }}
          />
          <Text
            style={{
              color: '#d3304d',
              fontSize: 30,
              marginRight: 10,
              textShadowColor: 'black',
              textShadowOffset: {height: 3},
              textShadowRadius: 4,
            }}>
            Log In
          </Text>
        </View>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" style={{marginTop: 20}}>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={email}
                onChangeText={text => setEmail(text)}
                placeholder="Enter Email"
                placeholderTextColor="#000000"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
              />
            </View>

            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={password}
                onChangeText={text => setPassword(text)}
                placeholder="Enter Password"
                placeholderTextColor="#000000"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
              />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleLogin}>
              <Text style={styles.buttonTextStyle}>Log in</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Signup')}>
              New now?<Text style={{color: '#d3304d'}}>Sign Up</Text>
            </Text>
          </KeyboardAvoidingView>
          <Loader visible={visible} />
        </ScrollView>
      </View>
    </View>
  );
};
export default Login;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 20,
  },
  buttonStyle: {
    backgroundColor: '#666666',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#666666',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputStyle: {
    flex: 1,
    color: '#000000',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,

    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#666666',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 15,
    alignSelf: 'center',
    padding: 10,
  },
});
