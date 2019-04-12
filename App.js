import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, TextInput, CheckBox } from 'react-native';
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
      activity: true,
      routerName: "",
      routerPassword: "",
      visiblePassword: false,
      editable: false,
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
    this.onConnect()
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
      <View style={styles.content}>
      <Scan activity = {this.state.activity} startScan = {this.onStartScan} devices = {this.state.devices} />
      <View style={styles.wifi_form}>
      <TextInput
        
        style={styles.textInput}
        onChangeText={(routerName) => this.setState({routerName})}
        value={this.state.routerName}
        editable = {this.state.editable}
        placeholder = "Введіть ім'я роутера"
      />
      <TextInput
      style={styles.textInput}
        onChangeText={(routerPassword) => this.setState({routerPassword})}
        secureTextEntry = {!this.state.visiblePassword}
        value={this.state.routerPassword}
        editable = {this.state.editable}
        placeholder = "Введіть пароль роутера"
        placeholderTextColor = "black"
      />
      <View >
          <View style={{ flexDirection: 'column' }}>
            <View style={{ flexDirection: 'row' }}>
              <CheckBox
              
                value={this.state.visiblePassword}
                disabled = {!this.state.editable}
                onValueChange={() => {
                  this.setState({ 
                    visiblePassword : !this.state.visiblePassword
                  } 
                )}}
              />
              <Text style={{ marginTop: 5 }}> Показати пароль</Text>
            </View>
          </View>
      <Button
          style={styles.buttons}
          onPress={this.onPress}
          title="Відправити дані"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
          disabled = {!this.state.editable}
        />
      </View>
      
        <Text>
          Підключення
          <Text>{this.state.connection}</Text>
          <Text>{this.state.language}</Text>
          {/* <Text>{this.state}</Text> */}
        </Text>
      </View>
      </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3',
    
    // alignItems: 'center',
    // justifyContent: 'space-between',
  },
  buttons:{
    // flex:3,
    // backgroundColor: 'steelblue',
    margin:25,
    color:'green',
  },
  scan_block:{
    flex:1,
    // justifyContent: "flex-start",
    height: 50, 
    // backgroundColor: 'skyblue', 
    justifyContent:"center"
  },
  wifi_form:{
    flex:2
    // flexDirection: 'column',
    // justifyContent:'center'
  },
  textInput:{
    height: 40, 
    borderBottomColor: 'black', 
    borderBottomWidth: 2,
    margin:12,
    color:'green'
  },
  content:{
    flex:1,
    margin:'4%'
  }
  // button: {
  //   margin:12
  // }
});
