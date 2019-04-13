import React from 'react';
import { StyleSheet, Text, View, Button, Picker, ActivityIndicator, Alert } from 'react-native';


export default class DevicePicker extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            device: "",
            activity: true,
            devices: []

        }
    }
    getListOfDevices(devices) {
        console.log("getListOfDevices");
        if (devices != undefined) {
            if (devices.length >= 1 & this.state.device == ""){
                this.props.getItem(devices[0].address)
            }
                
            return (
                devices.map(device => {
                    var pair = "";
                    if (device.uuids != undefined & device["uuids"].length > 0) {
                        pair = "Пара"
                    }
                    if (device != undefined & device.name != undefined)
                        return <Picker.Item label={device.name + " " + device.address + " " + pair} value={device.address} />
                    else if (device != undefined & device.address != undefined) {
                        return <Picker.Item label={"NoName" + " " + device.address} value={device.address} />
                    } else return <Picker.Item label={""} value={""} />
                }
                ))
        }

        // var devices = ["pi","samsung"];

    }

    render() {
        return (

            <Picker
                selectedValue={this.state.device}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue, itemIndex) => {
                    console.log("Changed values");
                    this.setState({device: itemValue})
                    this.props.getItem(itemValue)
                }
                }>
                {this.getListOfDevices(this.props.devices)}

            </Picker>


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
    picker_activity: {
        flexDirection: 'row'
    },
    button_block: {
        flexDirection: 'row',
        // justifyContent: 'center',
    },
    buttons: {
        // flex:3,
        backgroundColor: 'steelblue',
        width: '50%'
        // marginTop:'4%'
    },
    scan_block: {
        paddingTop: '8%',
        flex: 1,
        // justifyContent: "center",
        height: 50,
        // backgroundColor: 'skyblue', 
        justifyContent: "center"
    }
});