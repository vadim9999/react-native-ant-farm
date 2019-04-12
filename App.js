import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, TextInput, CheckBox } from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import Scan from "./components/Scan"
import { setListener, init, onStartScan } from "./selector/selector"

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
    this.getDevice = this.getDevice.bind(this)
    // this.onStartScan = this.onStartScan.bind(this)
  }

  
  
 

    
    
    
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
  getDevice(device) {
    console.log(device);
    
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

  

  
  render() {
    console.log(this.state);
    
    return (
      <View style={styles.container}>
      <View style={styles.content}>
      <Scan getDevice = {this.getDevice} />
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
