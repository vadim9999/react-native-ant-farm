import React from 'react';
import { StyleSheet, Text, View, Button, Picker } from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import Scan from "./components/Scan"
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: [],
      devices:[],
      connection: "Не підключено",
      language:"",
      activity: true
    }

    this.onPress = this.onPress.bind(this)
    this.onConnect = this.onConnect.bind(this)
    this.onStartScan = this.onStartScan.bind(this)
  }

  config = {
    "uuid":
    "00001101-0000-1000-8000-00805f9b34fb",
    "deviceName": "Samsung",
    "bufferSize": 1024,
    "characterDelimiter": "\n"
  }

  init() {
    EasyBluetooth.init(this.config)
      .then(function (config) {
        console.log("config done!");
      })
      .catch(function (ex) {
        console.warn(ex);
      });
  }
  
  componentWillMount() {
    this.init();
    this.onStartScan()
    // EasyBluetooth.startScan()
    //   .then(function (devices) {
    //     console.log("all devices found:");
    //     this.setState({
    //       devices: devices
    //     })
    //     console.log(devices);
    //   }.bind(this))
    //   .catch(function (ex) {
    //     console.warn(ex);
    //   });
    this.onDeviceFoundEvent = EasyBluetooth.addOnDeviceFoundListener(this.onDeviceFound.bind(this));
    this.onStatusChangeEvent = EasyBluetooth.addOnStatusChangeListener(this.onStatusChange.bind(this));
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
    this.onDeviceNameEvent = EasyBluetooth.addOnDeviceNameListener(this.onDeviceName.bind(this));
  }
  onDeviceFound(device) {
    console.log("onDeviceFound");
    console.log(device);
    
    if (device.name == "raspberrypi") {
      this.setState({
        "device": device
      })
    }
  }

  onDataRead(data) {
    console.log("onDataRead");
    if ("OK" == data) {
      console.log("Data is received");
    }
    console.log(data);
  }

  onDeviceName(name) {
    console.log("onDeviceName");
    console.log(name);
  }
  componentWillUnmount() {
    this.onDeviceFoundEvent.remove();
    this.onStatusChangeEvent.remove();
    this.onDataReadEvent.remove();
    this.onDeviceNameEvent.remove();
  }

  onStatusChange(status) {
    console.log("onStatusChange");
    console.log(status);
  }
  onPress() {
    EasyBluetooth.writeln("Works in React Native!")
      .then(() => {
        console.log("Writing...")
      })
      .catch((ex) => {
        console.warn(ex);
      })
  }
  setConnection() {
    this.setState({
      connection: "З'єднання встановлено'"
    })
  }
  getDevice() {
    return this.state.device
  }
  onConnect() {
    var device = this.getDevice()

    EasyBluetooth.connect(device)
      .then(() => {
        console.log("Connected!");
        Alert.alert('Підключено до ферми успішно!')
        this.setConnection()
        console.log(device);
      }).catch((ex) => {
        Alert.alert('Сталася помилка при підключенні до ферми')
        console.warn(ex);
      })
  }

  onStartScan(){
    console.log("Started scanning");
    if(this.state.activity != true){
    this.setState({
      activity: true
    })}
    EasyBluetooth.startScan()
      .then(function (devices) {
        console.log("all devices found:");
        // Todo add destroy dublicates
        // console.log(devices);
        var obj = {};

        for (var i = 0, len = devices.length; i < len; i++)
          obj[devices[i]['address']] = devices[i];

        result = new Array();
        for (var address in obj)
          result.push(obj[address]);
        
        
        console.log(result);
        
        this.setState({
          devices: result,
          activity: false
        })
        console.log(result);
      }.bind(this))
      .catch(function (ex) {
        console.warn(ex);
      });
  }

  render() {
    console.log(this.state);
    
    return (
      <View style={styles.container}>

      <Scan activity = {this.state.activity} startScan = {this.onStartScan} devices = {this.state.devices} />

      <View style={styles.buttons}>

      <Button
          onPress={this.onPress}
          title="Відправити дані"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Button
          onPress={this.onConnect}
          title="Підключитися до ферми"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
        <Text>
          Підключення
          <Text>{this.state.connection}</Text>
          <Text>{this.state.language}</Text>
          {/* <Text>{this.state}</Text> */}
        </Text>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  buttons:{
    flex:3,
    backgroundColor: 'steelblue',
  },
  scan_block:{
    flex:1,
    // justifyContent: "flex-start",
    height: 50, 
    backgroundColor: 'skyblue', 
    justifyContent:"center"
  }
});
