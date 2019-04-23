import React from 'react';
import { StyleSheet, Text, View, Button, Picker, ActivityIndicator, Alert } from 'react-native';


export default class NetworkPicker extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            network: "",
            // activity: true,
            networks: []

        }
    }
    getListOfNetworks(networks) {
        console.log("getListOfNetworks");
        console.log(networks);
        
        if (networks != undefined & networks.length >= 1) {
            if (networks.length >= 1 & this.state.network == ""){
                this.props.getNetwork(networks[0])
            }
                
            return (
                networks.map(network => {
                    if (network != undefined)
                        return <Picker.Item label={network } value={network} />
                    // else return <Picker.Item label={""} value={""} />
                    } 
                
                ))
        }
    }

    render() {  
        // console.log(this.state.enabled);
        // {/* enabled= {this.state.enabled} */}
        return (

            <Picker
                enabled= {this.props.enabled}
                selectedValue={this.state.network}
                style={{ height: 50, width: '100%' }}
                onValueChange={(itemValue, itemIndex) => {
                    console.log("Changed values");
                    this.setState({network: itemValue})
                    this.props.getNetwork(itemValue)
                }
                }>
                {this.getListOfNetworks(this.props.networks)}

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