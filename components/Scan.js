import React from 'react';
import { StyleSheet, Text, View, Button, Picker, ActivityIndicator } from 'react-native';
import { setListener, init, onStartScan, getThis, bindListeners } from "../selector/selector"
import EasyBluetooth from 'easy-bluetooth-classic';

export default class Scan extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            device: "",
            activity: true,
            devices:[]
            
          }
        this.onScan = this.onScan.bind(this)
    }
  
    componentWillMount() {
      init();
      this.onScan()
    // bindListeners(this)
    // this.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(this.onDeviceFound.bind(this));
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
    }

  
  onDataRead(data) {
      console.log("onDataRead");
      if ("OK" == data) {
        console.log("Data is received");
      }
      console.log(data);
    }
    onScan(){
        // this.setState({
        //     activity:true
        // })
        
        if(this.state.activity != true){
          this.setState({
            activity: true
          })}

        onStartScan().then(function (result){
          console.log("in promise");
          
          console.log(result);
          this.setState({
          devices: result,
          activity: false
        })
        }.bind(this)
        )
        .catch(function (ex) {
          console.warn(ex);
        });

       
      }

      componentWillUnmount() {
        // this.onDeviceFoundEvent.remove();
        // this.onStatusChangeEvent.remove();
        this.onDataReadEvent.remove();
        // this.onDeviceNameEvent.remove();
      }
    
    getListOfDevices(devices){
        console.log("getListOfDevices");
        // this.setState({
        //     activity: false
        // })
        if (devices != undefined ){
            if (devices.length == 1)
              this.props.getDevice(devices[0])
            return (

                devices.map(device =>{
                   
                  var pair = "";
                  if (device.uuids != undefined & device["uuids"].length > 0){
                    pair = "Пара"
                  }
                    if (device!= undefined & device.name !=undefined)
                return <Picker.Item label={device.name + " " + device.address + " " + pair} value={device.address} />
                else if( device!= undefined & device.address != undefined){
                    return <Picker.Item label={"NoName" + " " + device.address} value={device.address} />
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
              var device = this.state.devices.find( device =>{
                return device.address == itemValue
              })

              this.props.getDevice(device)

              this.setState({ device: itemValue })}
            }>
            {this.getListOfDevices(this.state.devices)}
            
          </Picker>
          <ActivityIndicator animating={this.state.activity} size="small" color="#0000ff" />
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