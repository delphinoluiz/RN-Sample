import React, { Component } from 'react'
import { 
    Text, 
    View, 
    Animated, 
    TouchableHighlight, 
    TouchableOpacity 
} from 'react-native'


import styles from '../AnswerRow/Styles'

export default class AnswerRow extends Component {
    constructor() {
        super()
        this.state = {
            layout: undefined
        }
    }

    componentDidMount(){
    }


    render() {
        return (  
            this.props.selectable ?
            <TouchableOpacity 
                onPress={() => {
                    this.props.onPressRow(this.state.layout)
                }}
                style={styles.touch}
                disabled={this.props.disabled}
                >
                <View 
                    style={styles.textBody}
                    onLayout={({nativeEvent}) => {
                        this.setState({layout: nativeEvent.layout})
                    }}>
                    <Text style={styles.text}>{this.props.answer.value}</Text>
                </View>
            </TouchableOpacity>
            : 
            <View 
                style={styles.textBody}
                onLayout={({nativeEvent}) => {                
                    this.props._startTotalAnimate(nativeEvent.layout)
                }}>
                <Text style={styles.text}>{this.props.answer.value}</Text>
            </View>
            
        )
    }
}