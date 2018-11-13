import React, {Component} from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Animated,
    ListView,
    TouchableOpacity,
    Image,
    Alert,
    TextInput
} from 'react-native'
import { connect } from 'react-redux'
import { isIphoneX } from 'react-native-iphone-x-helper'
import FBSDK from 'react-native-fbsdk'
import { NavigationActions, StackActions } from "react-navigation"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { METRICS } from '../../config/metrics'
import styles from './Styles';


class EditInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            fullName: '',
            email: '',
            city: '',
            phone: '',
            brokerage: '',
            slogan: '',
            license: '',
            profilePicture: undefined
        }
    
    }

    componentDidMount(){    
        if(this.props.navigation.state.params){
            let userInfo = this.props.navigation.state.params.userInfo
            let firstName = userInfo.first_name
            let lastName = userInfo.last_name
            let fullName = userInfo.name
            let email = userInfo.email
            let city = userInfo.location.name
            let profilePicture = userInfo.picture.data
            this.setState({
                firstName,
                lastName,
                fullName,
                email,
                city,
                profilePicture
            })
        }
    }  
    

    _goToUploadImageScreen() {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'UploadImage',
                    params: {profile: this.state.profilePicture}
                })
            ]
        });
        setTimeout(() => {
            this.props.navigation.dispatch(resetAction); 
        }, 500)
    }

    render() {
        return (
           
            <View style={styles.container}>
                <KeyboardAwareScrollView   
                    contentContainerStyle={{flexGrow:1}}  
                    style={styles.content}   
                    ref="scroll"
                    showsVerticalScrollIndicator={false}
                    >
                    <View style={styles.textInput}>
                        <Text style={styles.label}>First Name</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                
                                this.setState({firstName: text})
                            }}
                            value={this.state.firstName}
                        />
                    </View>

                    <View style={{paddingTop: 16 * METRICS.scaleHeight}}/>

                    <View style={styles.textInput}>
                        <Text style={styles.label}>Last Name</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                
                                this.setState({lastName: text})
                            }}
                            value={this.state.lastName}
                        />
                    </View>

                    <View style={{paddingTop: 16 * METRICS.scaleHeight}}/>

                    <View style={styles.textInput}>
                        <Text style={styles.label}>Full Name</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            onChangeText={(text) => {                                
                                this.setState({fullName: text})
                            }}
                            value={this.state.fullName}
                        />
                    </View>

                    <View style={{paddingTop: 16 * METRICS.scaleHeight}}/>

                    <View style={styles.textInput}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            keyboardType={'email-address'}
                            onChangeText={(text) => {
                                
                                this.setState({fullName: text})
                            }}
                            value={this.state.fullName}
                        />
                    </View>

                    <View style={{paddingTop: 16 * METRICS.scaleHeight}}/>

                    <View style={styles.textInput}>
                        <Text style={styles.label}>City</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                
                                this.setState({city: text})
                            }}
                            value={this.state.city}
                        />
                    </View>

                    <View style={{paddingTop: 16 * METRICS.scaleHeight}}/>

                    <View style={styles.textInput}>
                        <Text style={styles.label}>Phone</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            keyboardType={'numeric'}
                            onChangeText={(text) => {
                                
                                this.setState({phone: text})
                            }}
                            value={this.state.phone}
                        />
                    </View>

                    <View style={{paddingTop: 16 * METRICS.scaleHeight}}/>

                    <View style={styles.textInput}>
                        <Text style={styles.label}>Brokerage</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                
                                this.setState({brokerage: text})
                            }}
                            value={this.state.brokerage}
                        />
                    </View>

                    <View style={{paddingTop: 16 * METRICS.scaleHeight}}/>

                    <View style={styles.textInput}>
                        <Text style={styles.label}>Slogan</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                
                                this.setState({slogan: text})
                            }}
                            value={this.state.slogan}
                        />
                    </View>

                    <View style={{paddingTop: 16 * METRICS.scaleHeight}}/>

                    <View style={styles.textInput}>
                        <Text style={styles.label}>License</Text>
                        <TextInput 
                            style={styles.input}
                            underlineColorAndroid="transparent"
                            autoCapitalize='none'
                            onChangeText={(text) => {
                                
                                this.setState({license: text})
                            }}
                            value={this.state.license}
                        />
                    </View>

                    <View style={{paddingTop: 20 * METRICS.scaleHeight, width: '100%'}}>
                        <TouchableOpacity style={styles.button} 
                            onPress={() => {  
                                this._goToUploadImageScreen()       
                            }}>
                            
                            <Text style={{fontSize: 17 * METRICS.scaleHeight, color:'#fff'}}>Submit</Text>
                            
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(EditInfo)