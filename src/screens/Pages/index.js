import React, {Component} from 'react';
import { 
    StyleSheet, 
    View, 
    Text, 
    Animated,
    ListView,
    TouchableOpacity,
    Image,
    Alert
} from 'react-native'
import { connect } from 'react-redux'
import { isIphoneX } from 'react-native-iphone-x-helper'
import FBSDK from 'react-native-fbsdk'
import { NavigationActions, StackActions } from "react-navigation"
import Icon from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'


import { METRICS } from '../../config/metrics'
import styles from './Styles';


class Pages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageInfo: undefined
        }
        this.ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2})
    }

    componentDidMount(){    
        if(this.props.navigation.state.params){
            let pageInfo = this.props.navigation.state.params.pageInfo
            console.log(pageInfo)
            this.setState({pageInfo})
        }

    }  
    _goToQuestionScreen(item) {
        let questionData = {
            label: "",
            questions: [
                "Are you a current Customer?"
            ],
            answers: [
                {
                    "key": "customer_yes",
                    "value": "Yes"
                },
                {
                    "key": "customer_no",
                    "value": "No"
                }
            ]
        }

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({
                    routeName: 'Home',
                    params: {
                        item: item,
                        questionData: questionData
                    }
                })
            ]
        });
        this.props.navigation.dispatch(resetAction)
    }

    renderRow(item) {
        return (
            <TouchableOpacity style={styles.item} onPress={() => {
                this._goToQuestionScreen(item)
            }}>
                <View style={styles.cover}>
                    <Image style={styles.coverSize} source={{uri: item.cover.source}} />
                </View>
                <View style={styles.pageNameView}>
                    <Text style={styles.pageName}>{item.name}</Text>
                </View>
                <View style={styles.leftIcon}>
                    <Ionicons style={{color:'rgba(0, 0, 0, 0.6)'}} name='ios-arrow-forward' size={20}/>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        return (
            <View style={styles.container}>    
                <View style={styles.content}>
                    <View style={styles.titleView}>
                        <Text style={styles.title}>Please choose which one of your facebook pages you'd like us post content to:</Text>
                    </View>                    
                    <View style={styles.listView} >
                    {
                        this.state.pageInfo &&
                        <ListView
                            enableEmptySections={true}
                            dataSource={this.ds.cloneWithRows(this.state.pageInfo.data)}
                            renderRow={(rowData) => {
                                return this.renderRow(rowData)
                            }}
                        />
                    }
                    </View>   
                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

export default connect(mapStateToProps)(Pages)