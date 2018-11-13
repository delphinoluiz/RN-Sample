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
    TextInput,
} from 'react-native'
import { connect } from 'react-redux'
import { isIphoneX } from 'react-native-iphone-x-helper'
import { NavigationActions, StackActions } from "react-navigation"
import ActionSheet from 'react-native-actionsheet'

import ImagePicker from 'react-native-image-picker'

import { METRICS } from '../../config/metrics'
import styles from './Styles';


class UploadImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            profileData: undefined
        }
    }

    componentDidMount(){    
        if(this.props.navigation.state.params) {
            console.log(this.props.navigation.state.params.profile)
            let profileData =this.props.navigation.state.params.profile.url
            
            this.setState({profileData})
        }
    }  

    _openImagePicker(index) {
        let profile = this.state.profile 
        if(index == 1){
            var options = {
                storageOptions: {
                  skipBackup: true,
                  path:'images'
                },
                maxWidth: 200,
                maxHeight: 200
            }          
            ImagePicker.launchCamera(options, (response)  => {
                if(response.didCancel){
                }
                else if(response.error){
                }
                else {        
                    let imageData = 'data:image/jpeg;base64,' + response.data
                    this.setState({profileData: imageData})
                }
            });
        }else if(index == 2){
            var options = {
                storageOptions: {
                  skipBackup: true,
                  path:'images'
                },
                maxWidth: 200,
                maxHeight: 200,
            }
            ImagePicker.launchImageLibrary(options, (response)=>{
                if(response.didCancel){
                }
                else if(response.error){
                }
                else {                    
                    let imageData = 'data:image/jpeg;base64,' + response.data
                    this.setState({profileData: imageData})
                }
            });            
        }
    }

    render() {
        return (           
            <View style={styles.container}>
                <View style={styles.content}>
                    {
                        this.state.profileData ?
                        <Image style={{
                            width: 200,
                            height: 200
                        }} source={{uri: this.state.profileData}}/>
                        :
                        <Image style={{
                            width: 200,
                            height: 200
                        }} source={require('../../assets/img/avatar.png')} />
                    }
                    <View style={{paddingTop: 20 * METRICS.scaleHeight, width: '100%', justifyContent:'center', alignItems: 'center'}}>
                        <TouchableOpacity style={[styles.button, {width: 200}]} 
                            onPress={() => {  
                                this.ActionSheet.show()  
                            }}>
                            
                            <Text style={{fontSize: 17 * METRICS.scaleHeight, color:'#fff'}}>Select Photo</Text>
                            
                        </TouchableOpacity>
                    </View>
                </View>
                <ActionSheet
                    ref={o => this.ActionSheet = o}
                    title={'Select Photo'}
                    options={['Cancel', 'Select from camera...', 'Select from library...']}
                    cancelButtonIndex={0}
                    onPress={(idx) => {
                        this._openImagePicker(idx)
                    }}
                />

                <View style={{paddingTop: 250 * METRICS.scaleHeight, paddingHorizontal: 50 * METRICS.scaleWidth}}>
                        <TouchableOpacity style={styles.button} 
                            onPress={() => {  
                            }}>
                            
                            <Text style={{fontSize: 17 * METRICS.scaleHeight, color:'#fff'}}>Submit</Text>
                            
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(UploadImage)