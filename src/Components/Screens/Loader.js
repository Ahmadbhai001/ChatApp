import { ActivityIndicator, Dimensions, Modal, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
<View style={styles.modalView}>
    <View style={styles.mainView}>
        <ActivityIndicator size={'large'}/>

    </View>

</View>
    </Modal>
  )
}

export default Loader

const styles = StyleSheet.create({
    modalView:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
         backgroundColor:"rgba(175, 158, 167, 0.36)",
        justifyContent:"center",
        alignItems: "center",
    
    },
    mainView: {
        width:100,
        height:100,
         backgroundColor:"#EEE7E5",
        borderRadius:50,
        justifyContent:"center",
        alignContent:"center",
    },
})