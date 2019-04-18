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
import {Avatar, Text, Button, Divider, List, ListItem, Badge} from 'react-native-elements'

export default class HomeScreen extends React.Component {

  constructor(){
    super()
    this.setModalVisible = this.setModalVisible.bind(this)
    this.setModalInvisible = this.setModalInvisible.bind(this)
    this.state = {
      modalVisible: false,
    }
  }

  setModalVisible() {
   this.setState({modalVisible: true});
 }

  setModalInvisible() {
   this.setState({modalVisible: false});
 }

 render() {

   return (

     <View>
        <ListItem
          onPress={this.setModalVisible}
          avatar={
          <Avatar
            small
            rounded
            source={{uri: this.props.img}}
            overlayContainerStyle={{backgroundColor: '#e67e22'}}/>}
          title={
            <View>
             <Text style={styles.picNumber}>Pic:#{this.props.item}</Text>
            </View>
          }
          subtitle={
            <View style={styles.subtitle}>
              <Text style={styles.ratingText}>Gender: {this.props.gender} | Age: {this.props.age}</Text>
            </View>
          }
        />

        <View>
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}>
            <ImageBackground style={{flex:1}} source={{uri: this.props.img}}>
              <View
               style={{flex: 1, alignItems: 'center', marginTop: 40}}>

               <Button
                 title="Go back"
                 style={{width:200}}
                 backgroundColor='#022F40'
                 color='#FFFFFF'
                 onPress={this.setModalInvisible}/>

                 <Text style={styles.title}>
                   Pic #{this.props.item}
                 </Text>
                 <View style={styles.descDisplay}>
                   <Badge containerStyle={{ backgroundColor: '#0090C1', margin: 5}}>
                     <Text style={{color: '#FFFFFF'}}>{this.props.gender}</Text>
                   </Badge>
                   <Badge containerStyle={{ backgroundColor: '#0090C1', margin: 5}}>
                     <Text style={{color: '#FFFFFF'}}>{this.props.age}</Text>
                   </Badge>
                </View>
              </View>
            </ImageBackground>
          </Modal>

        </View>
      </View>

  );
 }

}

const styles = StyleSheet.create({
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
 },
 title: {
   fontSize: 25,
   fontWeight: 'bold',
   margin: 15,
 },
 descDisplay: {
   flexDirection: 'row',
 },
});
