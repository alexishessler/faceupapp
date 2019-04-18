import React from 'react';
import {
 View,
 ImageBackground,
 ScrollView,
 StyleSheet,
 Modal,
 TouchableHighlight,
 Alert,
 Image
} from 'react-native';
import {Avatar, Text, Button, Divider, List, ListItem} from 'react-native-elements'
import ModalPicture from './ModalPicture/ModalPicture';

import { connect } from 'react-redux';

class LibraryScreen extends React.Component {

 render() {

   // const list = [
   //   {
   //     img: 'https://images.unsplash.com/photo-1531251445707-1f000e1e87d0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2681&q=80',
   //     gender: 'Female',
   //     age: 32,
   //   },
   //   {
   //     img: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
   //     gender: 'Male',
   //     age: 39,
   //   },
   //   {
   //     img: 'https://images.unsplash.com/photo-1519362909365-f8591adb630e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
   //     gender: 'Female',
   //     age: 24,
   //   },
   // ]

   var items = this.props.pictures.map((element, i) => {
     console.log("return de", i)
     console.log("AFFICHAAAAAAAAGE", this.props.pictures)
     return (
       <ModalPicture
          item={i+1}
          key={i}
          img={element.pictureUrl}
          gender={element.pictureGender}
          age={element.pictureAge}/>
   )
   })

   return (
     <ImageBackground style={{flex:1}} source={require("../../assets/library-background.jpg")}>
     <ScrollView style={styles.container}>
            <List>
              {items}
            </List>
          </ScrollView>
     </ImageBackground>
   );
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   paddingTop: 10,
   opacity: 0.8,
 },
 subtitle:{
   flexDirection:'column',
   padding:10,
   paddingTop:5,
 },
 ratingText:{
   color: 'grey',
 },
 picNumber:{
   paddingLeft: 10,
   fontWeight: 'bold',
   fontSize: 18
 }
});


function mapStateToProps(state) {
  return { pictures: state.pictures }
}

export default connect(
    mapStateToProps,
    null
)(LibraryScreen);
