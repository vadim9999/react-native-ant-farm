import React from 'react';
import { StyleSheet, Text, View, Button, Picker, ActivityIndicator } from 'react-native';

export default class Scan extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            device: "",
            // activity: true
            
          }
        this.onScan = this.onScan.bind(this)
    }
    onScan(){
        // this.setState({
        //     activity:true
        // })
        this.props.startScan()
      }
    getListOfDevices(devices){
        console.log("getListOfDevices");
        // this.setState({
        //     activity: false
        // })
        if (devices != undefined ){
            
            return (
              
                devices.map(device =>{ 
                  var pair = "";
                  if (device.uuids != undefined & device["uuids"].length > 0){
                    pair = "Пара"
                  }
                    if (device!= undefined & device.name !=undefined)
                return <Picker.Item label={device.name + " " + device.address + " " + pair} value={device.name} />
                else if( device!= undefined & device.address != undefined){
                    return <Picker.Item label={"NoName" + " " + device.address} value={"NoName"} />
                } else return <Picker.Item label={""} value={""} />
                }
            ))
        } 
    
        // var devices = ["pi","samsung"];
        
      }
      
    render(){
        return (
            <View style={styles.scan_block}> 
            <Text>Виберіть ферму</Text>
            <View style = {styles.picker_activity}>
          <Picker
            selectedValue={this.state.device}
            style={{ height: 50, width: 100 }}
            onValueChange={(itemValue, itemIndex) =>{
              console.log("Changed values");
              
              this.setState({ device: itemValue })}
            }>
            {this.getListOfDevices(this.props.devices)}
            
          </Picker>
          <ActivityIndicator animating={this.props.activity} size="small" color="#0000ff" />
          </View>
        <View style={styles.buttons}>
          <Button
          onPress={this.onScan}
          width="40"
          title="Сканувати"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          
        />
        </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      // alignItems: 'center',
      // justifyContent: 'space-between',
    },
    picker_activity:{
        flexDirection:'row'
    },
    buttons:{
      // flex:3,
      backgroundColor: 'steelblue',
      // marginTop:'4%'
    },
    scan_block:{
        paddingTop:'8%',
      flex:1,
      // justifyContent: "center",
      height: 50, 
      // backgroundColor: 'skyblue', 
      justifyContent:"center"
    }
  });