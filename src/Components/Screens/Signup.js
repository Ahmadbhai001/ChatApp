import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import uuid from 'uuid';
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

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobilenumber, setMobilenumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmpassword] = useState('');
// Sign up handler
  const handleSubmitPress = () => {
    const userId = uuid.v4();
    firestore()
      .collection('users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobilenumber: mobilenumber,
        userId: userId,
      })
      .then(res => {
        Alert.alert('User created successfully');
        navigation.navigate('Login');
      })
      .catch(error => {
        console.warn(error);
      });
  };

  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (mobilenumber == '') {
      isValid = false;
    }
    if (password == '') {
      isValid = false;
    }
    if (confirmpassword == '') {
      isValid = false;
    }
    if (confirmpassword !== password) {
      isValid = false;
    }
    return isValid;
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
            Sign Up
          </Text>
        </View>
        <ScrollView>
          <KeyboardAvoidingView behavior="padding" style={{}}>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={name}
                onChangeText={text => setName(text)}
                placeholder="Enter Name"
                placeholderTextColor="#000000"
                autoCapitalize="none"
                keyboardType="default"
                returnKeyType="next"
              />
            </View>
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
                value={mobilenumber}
                onChangeText={text => setMobilenumber(text)}
                placeholder="Enter Mobile Number"
                placeholderTextColor="#000000"
                autoCapitalize="none"
                keyboardType="number-pad"
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
                // secureTextEntry={true}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                value={confirmpassword}
                onChangeText={text => setConfirmpassword(text)}
                placeholder="Enter Confirm Password"
                placeholderTextColor="#000000"
                keyboardType="default"
                // onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                // secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>

            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={() => {
                if (validate()) {
                  handleSubmitPress();
                } else {
                  Alert.alert('Please Enter Correct Data');
                }
              }}>
              <Text style={styles.buttonTextStyle}>Sign Up</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate('Login')}>
              LogIn
            </Text>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </View>
  );
};
export default Signup;

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
    color: '#d3304d',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
    padding: 10,
  },
});
