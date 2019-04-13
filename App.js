import React from 'react';
import { StyleSheet, Text, View, Button, AppRegistry, TextInput, CheckBox } from 'react-native';
import EasyBluetooth from 'easy-bluetooth-classic';
import Scan from "./components/Scan"
import { init, onStartScan, writeToDevice } from "./selector/selector"

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      device: [],
      devices: [],
      connection: "Не підключено",
      routerName: "",
      routerPassword: "",
      visiblePassword: false,
      editable: false,
    }

    this.onSend = this.onSend.bind(this)
    this.getDevice = this.getDevice.bind(this)
    this.enableEditing = this.enableEditing.bind(this)
    // this.onStartScan = this.onStartScan.bind(this)
  }

  componentWillMount() {
    init();
    this.onDataReadEvent = EasyBluetooth.addOnDataReadListener(this.onDataRead.bind(this));
  }
  componentWillUnmount() {
    // this.onDeviceFoundEvent.remove();
    // this.onStatusChangeEvent.remove();
    this.onDataReadEvent.remove();
    // this.onDeviceNameEvent.remove();
  }
  onSend() {
    writeToDevice("setWIFIData_"+this.state.routerName + "_"+this.state.routerPassword)
    this.setState({
      routerName: "",
      routerPassword:"",
      visiblePassword: false,
      editable:false
    })
  }
  getDevice(device) {
    console.log(device);
  }
  onDataRead(data) {
    console.log("onDataRead");
    var receivedData = JSON.parse(data)
    if(receivedData.name == "getWIFIData"){
      this.setState({
        routerName: receivedData.router,
        routerPassword: receivedData.password
      })
    }
    
    // if ("OK" == data) {
    //   console.log("Data is received");
    // }
    console.log(data);
  }
  enableEditing(){
    this.setState({
      editable: true
    })
  }
  render() {

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Scan getDevice={this.getDevice} 
                enableEditing = {this.enableEditing}/>
          <View style={styles.wifi_form}>
            <TextInput

              style={styles.textInput}
              onChangeText={(routerName) => this.setState({ routerName })}
              value={this.state.routerName}
              editable={this.state.editable}
              placeholder="Введіть ім'я роутера"
              placeholderTextColor="black"
            />
            <TextInput
              style={styles.textInput}
              onChangeText={(routerPassword) => this.setState({ routerPassword })}
              secureTextEntry={!this.state.visiblePassword}
              value={this.state.routerPassword}
              editable={this.state.editable}
              placeholder="Введіть пароль роутера"
              placeholderTextColor="black"
            />
            <View >
              <View style={{ flexDirection: 'column' }}>
                <View style={{ flexDirection: 'row' }}>
                  <CheckBox

                    value={this.state.visiblePassword}
                    disabled={!this.state.editable}
                    onValueChange={() => {
                      this.setState({
                        visiblePassword: !this.state.visiblePassword
                      }
                      )
                    }}
                  />
                  <Text style={{ marginTop: 5 }}> Показати пароль</Text>
                </View>
              </View>
              <Button
                style={styles.buttons}
                onPress={this.onSend}
                title="Відправити дані"
                color="#841584"
                accessibilityLabel="Learn more about this purple button"
                disabled={!this.state.editable}
              />
            </View>

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
  buttons: {
    // flex:3,
    // backgroundColor: 'steelblue',
    margin: 25,
    color: 'green',
  },
  scan_block: {
    flex: 1,
    // justifyContent: "flex-start",
    height: 50,
    // backgroundColor: 'skyblue', 
    justifyContent: "center"
  },
  wifi_form: {
    flex: 2
    // flexDirection: 'column',
    // justifyContent:'center'
  },
  textInput: {
    height: 40,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    margin: 12,
    color: 'green'
  },
  content: {
    flex: 1,
    margin: '4%'
  }
  // button: {
  //   margin:12
  // }
});
